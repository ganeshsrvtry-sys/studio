'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { BusinessProvider, useBusinessData } from '@/context/BusinessContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  ArrowRight, 
  Heart, 
  Plus, 
  X, 
  ShoppingBag, 
  Zap, 
  Smile, 
  ShieldCheck 
} from 'lucide-react';

function WelcomeContent() {
  const { data, addPositiveWord, removePositiveWord } = useBusinessData();
  const [newWord, setNewWord] = useState('');

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWord.trim()) {
      addPositiveWord(newWord.trim());
      setNewWord('');
    }
  };

  return (
    <div className="flex flex-col gap-12 p-6 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center gap-6 py-12">
        <div className="h-20 w-20 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20 rotate-3">
          <ShoppingBag className="h-10 w-10 text-primary-foreground" />
        </div>
        <div className="space-y-4 max-w-3xl">
          <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground lg:text-6xl">
            Welcome to <span className="text-primary">ShopSmart AI</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Your intelligent partner in grocery store management. Optimize inventory, 
            boost sales, and nurture your community with data-driven insights.
          </p>
        </div>
        <div className="flex gap-4 mt-4">
          <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
            <Link href="/dashboard">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-8 border-primary text-primary hover:bg-primary/5 hover:scale-105 transition-transform" asChild>
             <Link href="/chat">Ask AI Anything</Link>
          </Button>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-none bg-accent/20 shadow-none">
          <CardContent className="pt-6 flex flex-col items-center text-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Zap className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold font-headline text-lg">Predictive Sales</h3>
              <p className="text-sm text-muted-foreground">Anticipate demand surges before they happen.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none bg-accent/20 shadow-none">
          <CardContent className="pt-6 flex flex-col items-center text-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold font-headline text-lg">Inventory Guard</h3>
              <p className="text-sm text-muted-foreground">Reduce spoilage with smart shelf-life monitoring.</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none bg-accent/20 shadow-none">
          <CardContent className="pt-6 flex flex-col items-center text-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Smile className="h-6 w-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold font-headline text-lg">Customer Delight</h3>
              <p className="text-sm text-muted-foreground">Tailor your offerings to what your neighbors love.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Positive Words Section */}
      <Card className="border-primary/20 bg-primary/5 shadow-xl overflow-hidden mt-8">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg text-primary-foreground">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="font-headline text-2xl">Positive Intentions</CardTitle>
              <CardDescription>
                What values or vibes are driving your business today? Our AI uses these to shape its advice.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleAddWord} className="flex gap-3">
            <Input 
              placeholder="Enter a positive word (e.g., Gratitude, Freshness, Energy)..." 
              className="bg-background border-primary/20 focus-visible:ring-primary py-6"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
            />
            <Button type="submit" className="h-auto px-6">
              <Plus className="h-5 w-5 mr-2" /> Add
            </Button>
          </form>

          <div className="flex flex-wrap gap-2 pt-2">
            {data.positiveWords && data.positiveWords.length > 0 ? (
              data.positiveWords.map((word, idx) => (
                <Badge 
                  key={idx} 
                  variant="secondary" 
                  className="px-4 py-2 text-sm bg-background border border-primary/10 flex items-center gap-2 hover:border-primary/30 transition-colors"
                >
                  <Sparkles className="h-3 w-3 text-primary" />
                  {word}
                  <button 
                    onClick={() => removePositiveWord(word)}
                    className="hover:text-destructive transition-colors ml-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground italic">No positive words added yet. Start your day with a smile!</p>
            )}
          </div>
        </CardContent>
      </Card>

      <footer className="text-center text-muted-foreground text-sm py-8 border-t border-border/50">
        <p>© {new Date().getFullYear()} ShopSmart AI. Empowering local businesses with intelligence.</p>
      </footer>
    </div>
  );
}

export default function WelcomePage() {
  return (
    <BusinessProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-background">
          <div className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-6">
            <SidebarTrigger />
            <div className="h-4 w-[1px] bg-border" />
            <span className="text-sm font-medium text-muted-foreground italic">"Small steps, big impact."</span>
          </div>
          <WelcomeContent />
        </SidebarInset>
      </SidebarProvider>
    </BusinessProvider>
  );
}
