'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useBusinessData } from '@/context/BusinessContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  ArrowRight, 
  Plus, 
  X, 
  ShoppingBag,
  ShieldCheck,
  Star,
  Zap,
  ChevronRight,
  Loader2
} from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function WelcomePortalPage() {
  const { data, addPositiveWord, removePositiveWord } = useBusinessData();
  const [newWord, setNewWord] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const heroImage = PlaceHolderImages.find(img => img.id === 'invite-hero');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWord.trim()) {
      addPositiveWord(newWord.trim());
      setNewWord('');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-0 md:p-6 lg:p-12 overflow-hidden selection:bg-primary/30">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-6xl h-full md:min-h-[700px] md:h-auto grid lg:grid-cols-2 gap-0 overflow-hidden rounded-none md:rounded-[2.5rem] border shadow-2xl bg-card/40 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-1000">
        
        {/* Left Side: Aesthetic Hero & Branding */}
        <div className="hidden lg:flex flex-col justify-between p-16 relative overflow-hidden bg-primary group">
          <div className="absolute inset-0 opacity-40 group-hover:scale-105 transition-transform [transition-duration:10s] ease-out">
            {heroImage && (
              <Image 
                src={heroImage.imageUrl} 
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
                suppressHydrationWarning
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
          </div>
          
          <div className="relative z-10">
            <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center mb-8 border border-white/30 shadow-xl">
              <ShoppingBag className="h-7 w-7 text-white" />
            </div>
            <h1 className="font-headline text-5xl font-bold text-white leading-[1.1] tracking-tight">
              Welcome to <br />
              <span className="text-secondary italic">ShopSmart AI</span>
            </h1>
            <p className="mt-6 text-white/80 text-lg max-w-sm font-medium leading-relaxed">
              Unlock GenAI insights designed specifically for modern grocery store operations.
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-4 text-white/90">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="text-sm">
                <p className="font-bold text-white">Secure Intelligence</p>
                <p className="opacity-70 text-xs">Proprietary data protection active.</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center gap-4 text-white/90">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <Star className="h-5 w-5" />
              </div>
              <div className="text-sm">
                <p className="font-bold text-white">Session Priority</p>
                <p className="opacity-70 text-xs">Real-time predictive store modeling.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: The Entry Portal */}
        <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center bg-card">
          <div className="max-w-md mx-auto w-full space-y-10">
            <header className="space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                <Zap className="h-3 w-3" />
                Store Manager Session
              </div>
              <h2 className="font-headline text-4xl font-bold tracking-tight text-foreground">
                Set Your Intentions
              </h2>
              <p className="text-muted-foreground text-sm">
                Before accessing the main dashboard, define today's operational goals to prime your AI consultant.
              </p>
            </header>

            <div className="space-y-8">
              {/* Intentions Input */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Focus Words</span>
                  <span className="text-[10px] text-primary font-medium">Session Setup</span>
                </div>
                {isMounted ? (
                  <form onSubmit={handleAddWord} className="relative group">
                    <Input 
                      placeholder="e.g. Efficiency, Profit, Quality..." 
                      className="bg-accent/20 border-accent/40 focus-visible:ring-primary h-14 pl-5 pr-14 rounded-2xl transition-all group-hover:border-primary/50"
                      value={newWord}
                      onChange={(e) => setNewWord(e.target.value)}
                      suppressHydrationWarning
                    />
                    <Button 
                      type="submit" 
                      variant="ghost" 
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl hover:bg-primary hover:text-white transition-all"
                      suppressHydrationWarning
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </form>
                ) : (
                  <div className="h-14 w-full bg-accent/20 rounded-2xl animate-pulse" />
                )}
              </div>

              {/* Tags Container */}
              <div className="min-h-[120px] p-5 rounded-[1.5rem] bg-accent/30 border border-accent/50 flex flex-wrap gap-2 items-start content-start transition-all hover:shadow-inner">
                {!isMounted ? (
                  <div className="w-full h-full flex items-center justify-center gap-2 opacity-40">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-[10px] font-medium uppercase tracking-widest">Initializing...</span>
                  </div>
                ) : data.positiveWords && data.positiveWords.length > 0 ? (
                  data.positiveWords.map((word, idx) => (
                    <Badge 
                      key={`${word}-${idx}`} 
                      variant="secondary" 
                      className="px-4 py-2 text-xs bg-card text-primary border border-primary/10 flex items-center gap-2 animate-in zoom-in-50 duration-300 shadow-sm"
                    >
                      <Sparkles className="h-3 w-3 text-secondary" />
                      {word}
                      <button 
                        onClick={() => removePositiveWord(word)}
                        className="hover:text-destructive transition-colors ml-1 p-0.5 rounded-full hover:bg-destructive/10"
                        aria-label={`Remove ${word}`}
                        suppressHydrationWarning
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center opacity-40 text-center gap-2">
                    <p className="text-xs italic font-medium">No intentions specified yet...</p>
                    <p className="text-[10px]">What is your priority today?</p>
                  </div>
                )}
              </div>

              {/* Enter Button */}
              <div className="space-y-4 pt-4">
                {isMounted ? (
                  <Button asChild size="lg" className="w-full h-16 rounded-[1.25rem] text-lg font-bold shadow-2xl shadow-primary/30 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all group overflow-hidden relative" suppressHydrationWarning>
                    <Link href="/dashboard" className="flex items-center justify-center gap-3">
                      <span className="relative z-10 flex items-center gap-2">
                        Enter Dashboard
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </Link>
                  </Button>
                ) : (
                  <div className="h-16 w-full bg-primary/20 rounded-[1.25rem] animate-pulse" />
                )}
                
                <div className="flex items-center justify-between text-[10px] text-muted-foreground/60 font-bold uppercase tracking-widest px-1 pt-4">
                  <div className="flex items-center gap-1.5">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    Secure Access
                  </div>
                  <div className="flex items-center gap-1.5">
                    v2.1.0-AI
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
