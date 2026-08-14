import { GoogleGenAI } from '@google/genai';
import { TavilyResult } from './tavily';
import { ValidationResult, Competitor } from '../app/mockData';

// Generate multiple search queries based on the idea
export async function generateSearchQueries(
  idea: string,
  country?: string,
  targetAudience?: string,
  businessModel?: string
): Promise<string[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not defined in environment variables');
  
  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
You are an expert startup analyst.
A user has submitted the following startup idea: "${idea}"
Country Context: ${country || 'Global'}
Target Audience: ${targetAudience || 'General'}
Business Model: ${businessModel || 'General'}

Your task is to generate exactly 4 optimized search queries that will be used to search the web for deep market research.
The queries should focus on finding:
1. Top direct competitors in the specified country.
2. Market size and trends for this specific industry.
3. Common pain points or customer complaints in this niche.
4. Recent news or funding in this sector.

Return the result as a JSON array of 4 strings.
Example: ["Top food delivery startups India", "FoodTech market report India 2024", "Food delivery customer pain points India", "Recent funding for restaurant marketplace India"]
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) return [];
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Error generating search queries:', error);
    // Fallback queries if Gemini fails
    return [
      `${idea} top competitors ${country || ''}`,
      `${idea} market size ${country || ''}`,
      `${idea} startups ${country || ''}`,
      `${idea} trends ${country || ''}`
    ];
  }
}

// Generate the final ValidationResult report
export async function generateFinalReport(
  idea: string,
  country: string,
  targetAudience: string,
  businessModel: string,
  searchResults: TavilyResult[]
): Promise<ValidationResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY is not defined in environment variables');
  
  const ai = new GoogleGenAI({ apiKey });

  // Limit search results to avoid context window explosion (e.g., top 15 results)
  const topResults = searchResults.slice(0, 15).map(r => ({
    title: r.title,
    url: r.url,
    content: r.content.substring(0, 800) // Truncate content to avoid huge prompts
  }));

  const prompt = `
You are an expert startup analyst creating a Startup Intelligence Report.
Analyze the provided web search results and generate a structured JSON report.
NEVER invent companies that are not supported by the search results or your general knowledge of the space.
Prioritize competitors from the selected country (${country || 'Global'}).

Startup Idea: "${idea}"
Target Audience: ${targetAudience || 'General'}
Business Model: ${businessModel || 'General'}
Country: ${country || 'Global'}

Here are the aggregated web search results:
${JSON.stringify(topResults, null, 2)}

Based on these results and your knowledge, generate a JSON object matching this TypeScript interface exactly:
{
  "idea": string, // The startup idea name/summary
  "oppScore": number, // Opportunity Score (0-100)
  "marketSize": string, // e.g. "$10.6B"
  "marketGrowth": string, // e.g. "TAM Growth 25% CAGR to 2035"
  "competition": "Low" | "Medium" | "High",
  "competitionDetails": string, // Short description of competition level
  "revPotential": string, // e.g. "$55M+"
  "revDetails": string, // e.g. "Year 3 Projections"
  "aiInsight": string, // Executive summary / AI insight paragraph. MUST MENTION SOURCES OR TRENDS.
  "competitors": [
    {
      "name": string,
      "marketShare": string, // e.g. "30%" or "Unknown"
      "strength": string,
      "weakness": string
    }
  ],
  "swot": {
    "strengths": string[], // list of 3-4 strings
    "weaknesses": string[],
    "opportunities": string[],
    "threats": string[]
  },
  "hasCompetitors": boolean // true if competitors array is not empty
}
`;

 try {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    }
  });

  const text = response.text;
  if (!text) throw new Error("Empty response from Gemini");

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    const result = JSON.parse(cleaned) as ValidationResult;
    return result;
  } catch (e) {
    console.error("Gemini returned invalid JSON:");
    console.error(cleaned);
    throw e;
  }

} catch (error: any) {
  console.error('Error generating final report:', error); 
  throw new Error(`Failed to generate final report: ${error?.message || error}`);
}
