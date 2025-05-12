
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

interface GeminiRequest {
  prompt: string;
}

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not found' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const { prompt } = await req.json() as GeminiRequest;
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Construct the request to Gemini API
    const fullUrl = `${GEMINI_API_URL}?key=${apiKey}`;
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a helpful financial assistant for Gen Z. Provide concise, actionable financial advice for the following request: ${prompt}. Format your response in a friendly, engaging way, but keep it brief (under 250 characters).`
              }
            ]
          }
        ]
      })
    });

    // Get the response from Gemini API
    const geminiResponse = await response.json();
    
    if (response.status !== 200) {
      console.error('Gemini API error:', geminiResponse);
      return new Response(
        JSON.stringify({ error: 'Error from Gemini API', details: geminiResponse }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract the response text
    const text = geminiResponse.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';

    // Return the successful response
    return new Response(
      JSON.stringify({ text }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
