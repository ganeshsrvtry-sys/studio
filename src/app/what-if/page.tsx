'use client';

import React, { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useBusinessData } from '@/context/BusinessContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  TrendingUp, 
  Sparkles, 
  Play, 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle,
  Loader2,
  ChevronRight
} from 'lucide-react';
import { analyzeWhatIfScenario, type AnalyzeWhatIfScenarioOutput } from '@/ai/flows/analyze-what-if-scenario';

const suggestedScenarios = [
  "What if we increased our organic produce inventory by 30%?",
  "What if we implemented a loyalty program for frequent shoppers?",
  "What if we reduced prices on staple dairy items by 10% during weekdays?",
  "What if we extended our closing hours by 2 hours every night?"
];

function WhatIfContent() {
  const { data } = useBusinessData();
  const [scenario, setScenario] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeWhatIfScenarioOutput | null>(null);

  const handleSimulate = async (customScenario?: string) => {
    const finalScenario = customScenario || scenario;
    if (!finalScenario.trim() || isLoading) return;

    setIsLoading(true);
    setScenario(finalScenario);
    
    try {
      const output = await analyzeWhatIfScenario({
        scenarioDescription: finalScenario,
        currentSalesFigures: data.salesFigures,
        currentInventoryLevels: data.inventoryLevels,
        keyMetrics: `Profit: ${data.profitMargin}, Satisfaction: ${data.customerSatisfaction}, Turnover: ${data.inventoryTurnover}`,
      });
      setResult(output);
    } catch (error) {
      console.error("Simulation failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
          <TrendingUp className="h-4 w-4" />
          Scenario Simulator
        </div>
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
          What-If Business Analysis
        </h1>
        <p className="text-muted-foreground">
          Test your business hypotheses before implementing them. Our AI predicts the impact on your key store metrics.
        </p>
      </header>

      <Card className="border-primary/20 bg-primary/5 shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <h3 className="font-bold font-headline flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Input Hypothesis
              </h3>
              <div className="flex flex-col md:flex-row gap-3">
                <Input 
                  placeholder="e.g. What if we added a new bakery section?" 
                  className="flex-1 py-6 bg-background border-primary/30 focus-visible:ring-primary shadow-sm"
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  disabled={isLoading}
                />
                <Button 
                  onClick={() => handleSimulate()} 
                  className="px-8 h-auto shadow-primary/20 shadow-lg active:scale-95 transition-all"
                  disabled={isLoading || !scenario.trim()}
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Play className="h-5 w-5 mr-2" />}
                  Simulate
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Suggested Scenarios:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedScenarios.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSimulate(s)}
                    disabled={isLoading}
                    className="text-xs px-3 py-2 rounded-full bg-background border border-accent hover:border-primary hover:text-primary transition-all text-left max-w-full"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 animate-pulse">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          <p className="font-headline text-lg font-medium text-primary">Simulating Impact...</p>
          <p className="text-sm text-muted-foreground">Our AI is processing your store data and market trends.</p>
        </div>
      )}

      {result && !isLoading && (
        <div className="grid gap-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-card shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Profit Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-primary font-headline">{result.impactSummary.profitImpact}</div>
              </CardContent>
            </Card>
            <Card className="bg-card shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Sales Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-primary font-headline">{result.impactSummary.salesVolumeImpact}</div>
              </CardContent>
            </Card>
            <Card className="bg-card shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Turnover Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-primary font-headline">{result.impactSummary.inventoryTurnoverImpact}</div>
              </CardContent>
            </Card>
            <Card className="bg-card shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Cust. Happiness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-primary font-headline">{result.impactSummary.customerSatisfactionImpact}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Detailed AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-wrap">
                  {result.scenarioAnalysis}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-destructive/20 bg-destructive/5 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-headline text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    Key Risks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {result.impactSummary.riskFactors.map((risk, i) => (
                    <div key={i} className="flex gap-2 text-sm items-start">
                      <ChevronRight className="h-4 w-4 shrink-0 mt-0.5" />
                      {risk}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-headline text-primary">
                    <CheckCircle className="h-4 w-4" />
                    Opportunities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {result.impactSummary.opportunities.map((op, i) => (
                    <div key={i} className="flex gap-2 text-sm items-start">
                      <ChevronRight className="h-4 w-4 shrink-0 mt-0.5" />
                      {op}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-center py-4">
            <Button variant="ghost" className="text-primary hover:bg-primary/5" onClick={() => setResult(null)}>
              Reset Analysis
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WhatIfPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <div className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-6">
          <SidebarTrigger />
          <div className="h-4 w-[1px] bg-border" />
          <span className="text-sm font-medium text-muted-foreground">What-If Simulator</span>
        </div>
        <WhatIfContent />
      </SidebarInset>
    </Sidebar>
  );
}
