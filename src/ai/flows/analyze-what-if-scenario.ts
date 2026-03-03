'use server';
/**
 * @fileOverview This file implements a Genkit flow for analyzing hypothetical 'what-if' business scenarios for a grocery store.
 *
 * - analyzeWhatIfScenario - A function that takes a scenario description and current business data to analyze its potential impact.
 * - AnalyzeWhatIfScenarioInput - The input type for the analyzeWhatIfScenario function.
 * - AnalyzeWhatIfScenarioOutput - The return type for the analyzeWhatIfScenario function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const AnalyzeWhatIfScenarioInputSchema = z.object({
  scenarioDescription: z
    .string()
    .describe(
      'A detailed description of the hypothetical business change, e.g., "What if we increased the price of organic produce by 10%?"'
    ),
  currentSalesFigures: z
    .string()
    .describe(
      'Current sales figures and trends.'
    ),
  currentInventoryLevels: z
    .string()
    .describe(
      'Current inventory levels and related data.'
    ),
  keyMetrics: z
    .string()
    .describe(
      'Current values of key business metrics.'
    ),
  businessContext: z
    .string()
    .optional()
    .describe(
      'Any additional relevant business context.'
    ),
});
export type AnalyzeWhatIfScenarioInput = z.infer<
  typeof AnalyzeWhatIfScenarioInputSchema
>;

// Output Schema
const AnalyzeWhatIfScenarioOutputSchema = z.object({
  scenarioAnalysis: z
    .string()
    .describe(
      'A detailed narrative analysis of the potential impact.'
    ),
  impactSummary: z.object({
    profitImpact: z.string(),
    salesVolumeImpact: z.string(),
    inventoryTurnoverImpact: z.string(),
    customerSatisfactionImpact: z.string(),
    riskFactors: z.array(z.string()),
    opportunities: z.array(z.string()),
  }),
});
export type AnalyzeWhatIfScenarioOutput = z.infer<
  typeof AnalyzeWhatIfScenarioOutputSchema
>;

export async function analyzeWhatIfScenario(
  input: AnalyzeWhatIfScenarioInput
): Promise<AnalyzeWhatIfScenarioOutput> {
  return analyzeWhatIfScenarioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeWhatIfScenarioPrompt',
  input: { schema: AnalyzeWhatIfScenarioInputSchema },
  output: { schema: AnalyzeWhatIfScenarioOutputSchema },
  prompt: `You are an expert business analyst specializing in grocery store operations. Your task is to analyze a hypothetical "what-if" business scenario.

Current Data:
Sales: {{{currentSalesFigures}}}
Inventory: {{{currentInventoryLevels}}}
Metrics: {{{keyMetrics}}}

Analyze this scenario: {{{scenarioDescription}}}

Provide a detailed analysis and summary of the impact.`,
});

const analyzeWhatIfScenarioFlow = ai.defineFlow(
  {
    name: 'analyzeWhatIfScenarioFlow',
    inputSchema: AnalyzeWhatIfScenarioInputSchema,
    outputSchema: AnalyzeWhatIfScenarioOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      if (!output) {
        throw new Error('Failed to get output from the AI.');
      }
      return output;
    } catch (error: any) {
      console.error('Error in analyzeWhatIfScenarioFlow:', error);
      return {
        scenarioAnalysis: `Analysis failed. Please check your API key and redeploy. Error: ${error.message || 'Unknown error'}`,
        impactSummary: {
          profitImpact: "Error",
          salesVolumeImpact: "Error",
          inventoryTurnoverImpact: "Error",
          customerSatisfactionImpact: "Error",
          riskFactors: ["AI connection failed"],
          opportunities: ["Check environment variables"],
        }
      };
    }
  }
);
