import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Genkit initialization with Gemini 1.5 Flash.
 * Explicitly passing the API key to ensure reliability in production environments.
 */
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY || 'AIzaSyDPhJ79alANLf5iNAYvceqOdPTfGOt6Iok',
    }),
  ],
  model: 'googleai/gemini-1.5-flash',
});
