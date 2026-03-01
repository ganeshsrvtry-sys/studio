'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useBusinessData } from '@/context/BusinessContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  ArrowRight, 
  Heart, 
  Plus, 
  X, 
  ShoppingBag,
  Mail,
  ShieldCheck,
  Star
} from 'lucide-react';

export default function InvitePage() {
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.08),transparent_50%),radial-gradient(circle_at_bottom_left,hsl(var(--secondary)/0.08),transparent_50%)]">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-0 overflow-hidden rounded-[2rem] border shadow-2xl bg-card/50 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-1000">
        
        {/* Left Side: Aesthetic Branding */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-primary relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://picsum.photos/seed/shop/800/1200')] bg-cover bg-center mix-blend-overlay" />
          
          <div className="relative z-10">
            <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <h1 className="font-headline text-4xl font-bold text-white leading-tight">
              Elevate Your <br />
              <span className="text-secondary">Grocery Business</span>
            </h1>
            <p className="mt-4 text-white/80 text-lg max-w-xs font-medium">
              Join an exclusive community of smart shop owners powered by GenAI.
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4 text-white/90">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="text-sm">
                <p className="font-bold">Secure AI Analysis</p>
                <p className="opacity-70 text-xs">Your data remains yours, always.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white/90">
              <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <Star className="h-5 w-5" />
              </div>
              <div className="text-sm">
                <p className="font-bold">Premium Insights</p>
                <p className="opacity-70 text-xs">What-if scenarios for growth.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: The Invite / Onboarding */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="space-y-8">
            <header>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                <Mail className="h-3 w-3" />
                Invitation Accepted
              </div>
              <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground">
                Set Your Intention
              </h2>
              <p className="text-muted-foreground mt-2">
                Before entering the ShopSmart Dashboard, define the energy you want to bring to your business today.
              </p>
            </header>

            <div className="space-y-6">
              <form onSubmit={handleAddWord} className="space-y-3">
                <div className="flex gap-2">
                  <Input 
                    placeholder="e.g. Joy, Efficiency, Growth..." 
                    className="bg-background border-primary/20 focus-visible:ring-primary h-12 rounded-xl"
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                  />
                  <Button type="submit" variant="secondary" className="h-12 w-12 rounded-xl p-0 shrink-0">
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground italic px-1">
                  These words will help guide your AI business consultant's tone.
                </p>
              </form>

              <div className="flex flex-wrap gap-2 min-h-[60px] p-4 rounded-2xl bg-accent/30 border border-accent/50">
                {data.positiveWords && data.positiveWords.length > 0 ? (
                  data.positiveWords.map((word, idx) => (
                    <Badge 
                      key={idx} 
                      variant="secondary" 
                      className="px-3 py-1.5 text-xs bg-white text-primary border border-primary/10 flex items-center gap-2 hover:bg-primary/5 transition-colors cursor-default shadow-sm"
                    >
                      <Sparkles className="h-3 w-3 text-secondary" />
                      {word}
                      <button 
                        onClick={() => removePositiveWord(word)}
                        className="hover:text-destructive transition-colors ml-1"
                        aria-label={`Remove ${word}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground/60 italic flex items-center justify-center w-full">No intentions set yet...</p>
                )}
              </div>
            </div>

            <div className="pt-6">
              <Button asChild size="lg" className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all group">
                <Link href="/dashboard" className="flex items-center justify-center gap-3">
                  Enter ShopSmart AI
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <div className="flex items-center justify-center gap-6 mt-8 opacity-40">
                <div className="h-[1px] flex-1 bg-border" />
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold whitespace-nowrap">Authenticated Session</span>
                <div className="h-[1px] flex-1 bg-border" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
