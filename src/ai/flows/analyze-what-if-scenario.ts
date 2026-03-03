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
      'Current sales figures and trends. Example: "Monthly sales: $100,000. Top categories: Produce ($30k), Dairy ($20k). Seasonal sales peaks in summer."'
    ),
  currentInventoryLevels: z
    .string()
    .describe(
      'Current inventory levels and related data. Example: "Total inventory value: $50,000. High stock: Canned goods. Low stock: Fresh produce. Average spoilage: 5%."'
    ),
  keyMetrics: z
    .string()
    .describe(
      'Current values of key business metrics. Example: "Profit margin: 15%. Customer satisfaction: 85% (based on survey). Inventory turnover: 12 times/year. Average customer spend: $45."'
    ),
  businessContext: z
    .string()
    .optional()
    .describe(
      'Any additional relevant business context or operational details that might influence the analysis.'
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
      'A detailed narrative analysis of the potential impact of the scenario on the grocery store business, explaining reasoning.'
    ),
  impactSummary: z.object({
    profitImpact: z
      .string()
      .describe(
        'Estimated change in profit (e.g., "significant increase", "slight decrease", "negligible change", "+5%", "-2%").'
      ),
    salesVolumeImpact: z
      .string()
      .describe(
        'Estimated change in sales volume (e.g., "potential increase in unit sales", "expected drop in overall volume", "shift in category sales").'
      ),
    inventoryTurnoverImpact: z
      .string()
      .describe(
        'Estimated change in inventory turnover (e.g., "faster turnover for new items", "slower turnover for existing stock", "no significant change").'
      ),
    customerSatisfactionImpact: z
      .string()
      .describe(
        'Estimated change in customer satisfaction (e.g., "likely to improve due to variety", "potential for negative feedback on price changes", "minimal impact").'
      ),
    riskFactors: z
      .array(z.string())
      .describe(
        'A list of potential risks or challenges associated with implementing this scenario.'
      ),
    opportunities: z
      .array(z.string())
      .describe(
        'A list of potential opportunities or benefits arising from this scenario.'
      ),
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
  model: 'googleai/gemini-1.5-flash',
  input: { schema: AnalyzeWhatIfScenarioInputSchema },
  output: { schema: AnalyzeWhatIfScenarioOutputSchema },
  prompt: `You are an expert business analyst specializing in grocery store operations. Your task is to analyze a hypothetical "what-if" business scenario for a grocery store owner.

Here is the current business data and context:
---
Current Sales Figures:
{{{currentSalesFigures}}}

Current Inventory Levels:
{{{currentInventoryLevels}}}

Key Business Metrics:
{{{keyMetrics}}}

Additional Business Context:
{{{businessContext}}}
---

Based on the above information, analyze the following "what-if" scenario:
Scenario: {{{scenarioDescription}}}

Provide a detailed analysis and then summarize the potential impact on key metrics, including profit, sales volume, inventory turnover, and customer satisfaction. Also, identify specific risk factors and opportunities associated with this scenario.

Ensure your response is structured as a JSON object matching the provided schema, with clear and concise estimations for each impact field.`,
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
        throw new Error('Failed to get output from the prompt.');
      }
      return output;
    } catch (error: any) {
      console.error('Error in analyzeWhatIfScenarioFlow:', error);
      return {
        scenarioAnalysis: `Analysis failed: ${error.message || 'The AI service is currently unavailable.'}. Please verify your API key and redeploy.`,
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
