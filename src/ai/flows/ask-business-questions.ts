'use server';
/**
 * @fileOverview This file defines a Genkit flow for an AI chatbot that answers business-related questions for grocery store owners.
 *
 * - askBusinessQuestions - A function that handles asking business questions and getting AI-driven answers.
 * - AskBusinessQuestionsInput - The input type for the askBusinessQuestions function.
 * - AskBusinessQuestionsOutput - The return type for the askBusinessQuestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AskBusinessQuestionsInputSchema = z.object({
  question: z.string().describe('The business question asked by the grocery store owner.'),
});
export type AskBusinessQuestionsInput = z.infer<typeof AskBusinessQuestionsInputSchema>;

const AskBusinessQuestionsOutputSchema = z.object({
  answer: z.string().describe('The insightful answer provided by the AI business consultant.'),
});
export type AskBusinessQuestionsOutput = z.infer<typeof AskBusinessQuestionsOutputSchema>;

export async function askBusinessQuestions(input: AskBusinessQuestionsInput): Promise<AskBusinessQuestionsOutput> {
  return askBusinessQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'askBusinessQuestionsPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { schema: AskBusinessQuestionsInputSchema },
  output: { schema: AskBusinessQuestionsOutputSchema },
  prompt: `You are an experienced business consultant specializing in grocery store operations.
Your goal is to provide relevant, insightful, and actionable advice to a grocery store owner asking a business-related question.
Focus on practical solutions and industry best practices.

Question: {{{question}}}

Provide a comprehensive and helpful answer to the question.`,
});

const askBusinessQuestionsFlow = ai.defineFlow(
  {
    name: 'askBusinessQuestionsFlow',
    inputSchema: AskBusinessQuestionsInputSchema,
    outputSchema: AskBusinessQuestionsOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      if (!output) {
        throw new Error('AI failed to generate a response.');
      }
      return output;
    } catch (error) {
      console.error('Error in askBusinessQuestionsFlow:', error);
      throw new Error('The AI consultant is currently unavailable. Please check your API configuration.');
    }
  }
);
