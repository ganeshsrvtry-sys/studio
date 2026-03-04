import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Genkit initialization with Gemini 1.5 Flash.
 * Hardcoded fallback for the provided API key to ensure reliability.
 */
const apiKey = process.env.GOOGLE_GENAI_API_KEY || 'AIzaSyDPhJ79alANLf5iNAYvceqOdPTfGOt6Iok';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: apiKey,
    }),
  ],
  model: 'googleai/gemini-1.5-flash',
});
