import axios from 'axios';

export interface TavilyResult {
  title: string;
  url: string;
  content: string;
  score: number;
  published_date?: string;
}

export interface TavilyResponse {
  answer?: string;
  query: string;
  response_time: number;
  results: TavilyResult[];
}

export async function searchTavily(query: string): Promise<TavilyResponse> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    throw new Error('TAVILY_API_KEY is not defined in environment variables');
  }

  try {
    const response = await axios.post<TavilyResponse>('https://api.tavily.com/search', {
      api_key: apiKey,
      query: query,
      search_depth: 'advanced',
      include_answer: true,
      topic: 'general'
    });

    return response.data;
  } catch (error: any) {
    console.error('Error fetching from Tavily API:', error?.response?.data || error.message);
    throw new Error('Failed to fetch from Tavily');
  }
}

export async function executeMultiSearch(queries: string[]): Promise<TavilyResult[]> {
  const promises = queries.map(q => searchTavily(q).catch(e => {
    console.error(`Tavily search failed for query: ${q}`, e);
    return null;
  }));
  
  const responses = await Promise.all(promises);
  const allResults: TavilyResult[] = [];
  
  responses.forEach(res => {
    if (res && res.results && Array.isArray(res.results)) {
      allResults.push(...res.results);
    }
  });

  // Deduplicate by URL
  const uniqueUrls = new Set<string>();
  const deduplicated: TavilyResult[] = [];
  
  for (const result of allResults) {
    if (!uniqueUrls.has(result.url)) {
      uniqueUrls.add(result.url);
      deduplicated.push(result);
    }
  }

  // Sort by score if available (descending)
  deduplicated.sort((a, b) => (b.score || 0) - (a.score || 0));

  return deduplicated;
}
