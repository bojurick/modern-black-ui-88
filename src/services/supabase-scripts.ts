
import { supabase } from '@/integrations/supabase/client';

export type Script = {
  id: string;
  title: string;
  script?: string;
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

export type ScriptsResponse = {
  scripts: Script[];
  totalScripts: number;
};

export interface FetchScriptsParams {
  q?: string;
  scriptType?: string;
  page?: number;
  limit?: number;
}

export const fetchScripts = async (params: FetchScriptsParams = {}): Promise<ScriptsResponse> => {
  try {
    const { q = '', scriptType = '', page = 1, limit = 9 } = params;
    const offset = (page - 1) * limit;
    
    let query = supabase
      .from('scripts')
      .select('*', { count: 'exact' });

    // Add search filter if query provided
    if (q.trim()) {
      query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%`);
    }

    // Add script type filter
    if (scriptType && scriptType !== 'all') {
      query = query.eq('script_type', scriptType);
    }

    // Add pagination and ordering
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      throw new Error(`Database Error: ${error.message}`);
    }

    // Transform database format to expected API format
    const transformedScripts: Script[] = (data || []).map(script => ({
      id: script.id,
      title: script.title,
      script: script.script,
      verified: script.verified || false,
      isPatched: script.is_patched || false,
      scriptType: script.script_type as 'free' | 'paid',
      key: script.key_required || false,
      keyLink: script.key_link,
      views: script.views || 0,
      createdAt: script.created_at,
      updatedAt: script.updated_at,
      slug: script.slug,
      description: script.description
    }));

    return {
      scripts: transformedScripts,
      totalScripts: count || 0
    };
  } catch (error) {
    console.error("Error fetching scripts:", error);
    throw error;
  }
};

export const searchScripts = async (query: string, mode?: string, page = 1): Promise<Script[]> => {
  try {
    const limit = 9;
    const offset = (page - 1) * limit;
    
    let supabaseQuery = supabase
      .from('scripts')
      .select('*');

    // Add search filter
    if (query.trim()) {
      supabaseQuery = supabaseQuery.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
    }

    // Add pagination and ordering
    supabaseQuery = supabaseQuery
      .order('views', { ascending: false })
      .range(offset, offset + limit - 1);

    const { data, error } = await supabaseQuery;

    if (error) {
      throw new Error(`Database Error: ${error.message}`);
    }

    if (!data || data.length === 0) {
      throw new Error("No search results found.");
    }

    // Transform database format to expected API format
    const transformedScripts: Script[] = data.map(script => ({
      id: script.id,
      title: script.title,
      script: script.script,
      verified: script.verified || false,
      isPatched: script.is_patched || false,
      scriptType: script.script_type as 'free' | 'paid',
      key: script.key_required || false,
      keyLink: script.key_link,
      views: script.views || 0,
      createdAt: script.created_at,
      updatedAt: script.updated_at,
      slug: script.slug,
      description: script.description
    }));

    return transformedScripts;
  } catch (error) {
    console.error("Error searching scripts:", error);
    throw error;
  }
};
