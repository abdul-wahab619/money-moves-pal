
import { supabase } from "@/integrations/supabase/client";

interface GeminiResponse {
  text: string;
}

export const getAiSuggestion = async (prompt: string): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('gemini-suggestions', {
      body: {
        prompt
      }
    });

    if (error) throw new Error(error.message);
    
    const response = data as GeminiResponse;
    return response.text;
  } catch (error) {
    console.error('Error getting AI suggestion:', error);
    return 'Unable to get AI suggestion at the moment.';
  }
}
