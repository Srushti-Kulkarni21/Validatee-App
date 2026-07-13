import { executeMultiSearch, TavilyResult } from './tavily';
import { generateSearchQueries, generateFinalReport } from './gemini';
import { ValidationResult } from '../app/mockData';

export async function runStartupResearch(
  idea: string,
  country: string,
  targetAudience: string,
  businessModel: string
): Promise<ValidationResult> {
  // 1. Generate Queries
  console.log('Generating queries for:', idea);
  const queries = await generateSearchQueries(idea, country, targetAudience, businessModel);
  console.log('Generated queries:', queries);

  if (!queries || queries.length === 0) {
    throw new Error('Failed to generate search queries.');
  }

  // 2. Execute Tavily Searches
  console.log('Executing multi-search via Tavily...');
  const searchResults = await executeMultiSearch(queries);
  console.log(`Found ${searchResults.length} unique results.`);

  // 3. Generate Final Report via Gemini
  console.log('Analyzing results via Gemini...');
  const report = await generateFinalReport(idea, country, targetAudience, businessModel, searchResults);

  // 4. Attach sources to report
  report.sources = searchResults.slice(0, 10).map(r => ({
    title: r.title,
    url: r.url,
    score: r.score
  }));

  return report;
}
