'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBusinessData } from '@/context/BusinessContext';
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
  Store
} from 'lucide-react';

export default function WelcomePage() {
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.05),transparent_40%),radial-gradient(circle_at_bottom_left,hsl(var(--secondary)/0.05),transparent_40%)]">
      <div className="w-full max-w-2xl animate-in fade-in zoom-in-95 duration-700">
        <Card className="border-none shadow-2xl bg-card/80 backdrop-blur-xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-secondary to-primary" />
          
          <CardHeader className="pt-12 pb-6 text-center">
            <div className="mx-auto h-20 w-20 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20 rotate-3 mb-6">
              <ShoppingBag className="h-10 w-10 text-primary-foreground" />
            </div>
            <CardTitle className="font-headline text-4xl font-bold tracking-tight text-foreground lg:text-5xl mb-2">
              ShopSmart <span className="text-primary">AI</span>
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
              Empowering local grocery owners with intelligent insights and community-driven growth.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8 pb-12 space-y-8">
            {/* Positive Intentions Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary uppercase tracking-widest">
                <Heart className="h-4 w-4" />
                Start with Intention
              </div>
              <form onSubmit={handleAddWord} className="flex gap-2">
                <Input 
                  placeholder="What energy are you bringing today? (e.g. Joy, Focus)" 
                  className="bg-background/50 border-primary/20 focus-visible:ring-primary h-12"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                />
                <Button type="submit" variant="secondary" className="h-12 px-6">
                  <Plus className="h-5 w-5" />
                </Button>
              </form>

              <div className="flex flex-wrap gap-2 min-h-[40px]">
                {data.positiveWords && data.positiveWords.length > 0 ? (
                  data.positiveWords.map((word, idx) => (
                    <Badge 
                      key={idx} 
                      variant="secondary" 
                      className="px-3 py-1.5 text-xs bg-primary/10 text-primary border-none flex items-center gap-2 hover:bg-primary/20 transition-colors cursor-default"
                    >
                      <Sparkles className="h-3 w-3" />
                      {word}
                      <button 
                        onClick={() => removePositiveWord(word)}
                        className="hover:text-destructive transition-colors"
                        aria-label={`Remove ${word}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground italic opacity-60">Add some positive words to shape your AI's guidance...</p>
                )}
              </div>
            </div>

            <div className="pt-4">
              <Button asChild size="lg" className="w-full h-14 rounded-xl text-lg font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all group">
                <Link href="/dashboard" className="flex items-center justify-center gap-3">
                  <Store className="h-5 w-5" />
                  Enter My Store Dashboard
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-[0.2em] opacity-50 font-semibold">
                © {new Date().getFullYear()} ShopSmart AI Technology
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
