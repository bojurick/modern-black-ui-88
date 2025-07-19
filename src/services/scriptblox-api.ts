
type Script = {
  id: string;
  title: string;
  script?: string;
  game?: {
    imageUrl?: string;
    name?: string;
  };
  verified?: boolean;
  isPatched?: boolean;
  scriptType: 'free' | 'paid';
  key?: boolean;
  keyLink?: string;
  views: number;
  createdAt: string;
  updatedAt: string;
  slug?: string;
  description?: string;
};

type ScriptsResponse = {
  scripts: Script[];
  totalScripts: number;
};

const BASE_URL = "https://scriptblox-api-proxy.vercel.app";

interface FetchScriptsParams {
  q?: string;
  scriptType?: string;
  page?: number;
  limit?: number;
}

export const fetchScripts = async (params: FetchScriptsParams = {}): Promise<ScriptsResponse> => {
  try {
    const { q = '', scriptType = '', page = 1, limit = 9 } = params;
    
    const url = new URL(`${BASE_URL}/api/fetch`);
    url.searchParams.append("page", page.toString());
    if (q) url.searchParams.append("q", q);
    if (scriptType) url.searchParams.append("scriptType", scriptType);
    if (limit) url.searchParams.append("limit", limit.toString());
    
    const response = await fetch(url.toString());
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Too many requests. Please wait a moment and try again.");
      }
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Ensure the response structure matches our expected format
    return {
      scripts: data.result?.scripts || [],
      totalScripts: data.result?.totalScripts || data.result?.scripts?.length || 0
    };
  } catch (error) {
    console.error("Error fetching scripts:", error);
    throw error;
  }
};

export const searchScripts = async (query: string, mode?: string, page = 1): Promise<Script[]> => {
  try {
    const url = new URL(`${BASE_URL}/api/search`);
    url.searchParams.append("q", query);
    if (mode) url.searchParams.append("mode", mode);
    url.searchParams.append("page", page.toString());
    
    const response = await fetch(url.toString());
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error("Too many requests. Please wait a moment and try again.");
      }
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    if (!data.result || !data.result.scripts.length) {
      throw new Error("No search results found.");
    }
    
    return data.result.scripts;
  } catch (error) {
    console.error("Error searching scripts:", error);
    throw error;
  }
};

export type { Script, ScriptsResponse, FetchScriptsParams };
