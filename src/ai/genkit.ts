import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

/**
 * Genkit initialization with Gemini 1.5 Flash.
 * Explicitly passing the provided API key for reliable connectivity.
 */
const apiKey = process.env.GOOGLE_GENAI_API_KEY || 'AIzaSyDPhJ79alANLf5iNAYvceqOdPTfGOt6Iok';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: apiKey,
    }),
  ],
  model: googleAI.model('gemini-1.5-flash'),
});
