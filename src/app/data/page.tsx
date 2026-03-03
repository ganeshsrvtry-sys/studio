'use client';

import React, { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useBusinessData } from '@/context/BusinessContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Database, Save, FileText, BarChart3, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function DataInputContent() {
  const { data, updateData } = useBusinessData();
  const { toast } = useToast();
  const [formData, setFormData] = useState(data);

  const handleSave = () => {
    updateData(formData);
    toast({
      title: "Data Saved Successfully",
      description: "Your business metrics and reports have been updated.",
    });
  };

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
          <Database className="h-4 w-4" />
          Data Center
        </div>
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
          Manage Business Data
        </h1>
        <p className="text-muted-foreground">
          Update your sales and inventory details here. This data powers the AI's analysis and predictions.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <CardTitle className="font-headline">Sales Figures</CardTitle>
            </div>
            <CardDescription>Detail your recent sales performance and trends.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sales">Monthly Sales & Trends Narrative</Label>
                <Textarea 
                  id="sales" 
                  className="min-h-[150px] leading-relaxed border-accent"
                  placeholder="e.g., Monthly sales reached $45k with growth in organic..."
                  value={formData.salesFigures}
                  onChange={(e) => setFormData({...formData, salesFigures: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-secondary" />
              <CardTitle className="font-headline">Inventory Levels</CardTitle>
            </div>
            <CardDescription>Stock status, spoilage, and replenishment rates.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inventory">Inventory Narrative</Label>
                <Textarea 
                  id="inventory" 
                  className="min-h-[150px] leading-relaxed border-accent"
                  placeholder="e.g., Inventory valued at $28k. High turnover in perishables..."
                  value={formData.inventoryLevels}
                  onChange={(e) => setFormData({...formData, inventoryLevels: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-accent bg-accent/10">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle className="font-headline">Key Metrics (KPIs)</CardTitle>
          </div>
          <CardDescription>Precise values for dashboard widgets.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label>Profit Margin (%)</Label>
              <Input 
                value={formData.profitMargin} 
                onChange={(e) => setFormData({...formData, profitMargin: e.target.value})}
                className="border-accent bg-background"
                suppressHydrationWarning
              />
            </div>
            <div className="space-y-2">
              <Label>Customer Satisfaction (%)</Label>
              <Input 
                value={formData.customerSatisfaction} 
                onChange={(e) => setFormData({...formData, customerSatisfaction: e.target.value})}
                className="border-accent bg-background"
                suppressHydrationWarning
              />
            </div>
            <div className="space-y-2">
              <Label>Inventory Turnover (x/yr)</Label>
              <Input 
                value={formData.inventoryTurnover} 
                onChange={(e) => setFormData({...formData, inventoryTurnover: e.target.value})}
                className="border-accent bg-background"
                suppressHydrationWarning
              />
            </div>
            <div className="space-y-2">
              <Label>Avg. Spend ($)</Label>
              <Input 
                value={formData.averageCustomerSpend} 
                onChange={(e) => setFormData({...formData, averageCustomerSpend: e.target.value})}
                className="border-accent bg-background"
                suppressHydrationWarning
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4 mt-4">
        <Button variant="outline" className="px-8 border-primary text-primary hover:bg-primary/5" suppressHydrationWarning>
          Discard Changes
        </Button>
        <Button onClick={handleSave} className="px-8 shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2" suppressHydrationWarning>
          <Save className="h-4 w-4" />
          Save Business Profile
        </Button>
      </div>

      <div className="bg-primary/5 rounded-xl p-6 border border-primary/20 mt-8">
        <div className="flex items-start gap-4">
          <div className="bg-primary rounded-full p-2">
            <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-bold font-headline mb-1">Data Quality Status: High</h3>
            <p className="text-sm text-muted-foreground">
              Your business profile is 90% complete. Providing more specific details about your seasonal peaks 
              will improve AI 'What-If' predictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DataPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <div className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-6">
          <SidebarTrigger />
          <div className="h-4 w-[1px] bg-border" />
          <span className="text-sm font-medium text-muted-foreground">Data Management</span>
        </div>
        <DataInputContent />
      </SidebarInset>
    </SidebarProvider>
  );
}
