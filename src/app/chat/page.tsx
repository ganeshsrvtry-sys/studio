'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Sparkles, User, ShoppingBag, Loader2 } from 'lucide-react';
import { askBusinessQuestions } from '@/ai/flows/ask-business-questions';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

function ChatContent() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your ShopSmart AI business consultant. How can I help you optimize your grocery store operations today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await askBusinessQuestions({ question: input });
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: result.answer
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error while processing your request. Please try again."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex-1 overflow-hidden p-6">
        <div className="max-w-4xl mx-auto h-full flex flex-col border rounded-xl bg-card shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-accent/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-headline font-semibold text-sm">Business Consultant AI</h2>
                <div className="flex items-center gap-1 text-[10px] text-primary">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  Online
                </div>
              </div>
            </div>
            <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
              Genkit Powered
            </div>
          </div>

          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-6 max-w-3xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''} animate-in slide-in-from-bottom-2 duration-300`}
                >
                  <Avatar className={`h-8 w-8 border ${message.role === 'assistant' ? 'bg-primary' : 'bg-accent'}`}>
                    <AvatarFallback className={message.role === 'assistant' ? 'text-primary-foreground' : 'text-primary'}>
                      {message.role === 'assistant' ? <ShoppingBag className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex flex-col gap-1 max-w-[80%] ${message.role === 'user' ? 'items-end' : ''}`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      message.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-none' 
                      : 'bg-accent/40 text-foreground rounded-tl-none border border-accent/20'
                    }`}>
                      {message.content}
                    </div>
                    <span className="text-[10px] text-muted-foreground px-1">
                      {message.role === 'assistant' ? 'ShopSmart AI' : 'You'}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3 animate-in fade-in duration-300">
                  <Avatar className="h-8 w-8 border bg-primary">
                    <AvatarFallback className="text-primary-foreground">
                      <ShoppingBag className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-accent/40 border border-accent/20">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-background">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="max-w-3xl mx-auto relative"
            >
              <Input
                placeholder="Ask about inventory, staffing, or sales trends..."
                className="pr-12 py-6 rounded-xl border-accent focus-visible:ring-primary shadow-sm"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon" 
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg shadow-md transition-transform active:scale-90"
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-[10px] text-center text-muted-foreground mt-2">
              Our AI consultant can help with pricing strategies, stock optimization, and customer engagement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <div className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-6">
          <SidebarTrigger />
          <div className="h-4 w-[1px] bg-border" />
          <span className="text-sm font-medium text-muted-foreground">AI Business Chat</span>
        </div>
        <ChatContent />
      </SidebarInset>
    </SidebarProvider>
  );
}
