'use client';

import React from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Bell, Lock, Eye } from 'lucide-react';

export default function SettingsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <div className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-6">
          <SidebarTrigger />
          <div className="h-4 w-[1px] bg-border" />
          <span className="text-sm font-medium text-muted-foreground">App Settings</span>
        </div>
        
        <div className="flex flex-col gap-6 p-6 lg:p-8 animate-in fade-in duration-500 max-w-3xl mx-auto">
          <header className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
              <Settings className="h-4 w-4" />
              Configuration
            </div>
            <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
              Preferences
            </h1>
            <p className="text-muted-foreground">
              Manage your store notifications and AI consultation settings.
            </p>
          </header>

          <div className="grid gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Bell className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg font-headline">Notifications</CardTitle>
                </div>
                <CardDescription>Stay updated on inventory and sales alerts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Low Stock Alerts</Label>
                    <p className="text-xs text-muted-foreground">Notify when items fall below 10% threshold.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-xs text-muted-foreground">Email a summary of weekly performance.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="h-5 w-5 text-secondary" />
                  <CardTitle className="text-lg font-headline">Privacy & Security</CardTitle>
                </div>
                <CardDescription>Control how your store data is processed.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>AI Data Training</Label>
                    <p className="text-xs text-muted-foreground">Use anonymized store data to improve models.</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Session Encryption</Label>
                    <p className="text-xs text-muted-foreground">Enforce end-to-end encryption for AI chat.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-accent bg-accent/5">
              <CardHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg font-headline">Interface</CardTitle>
                </div>
                <CardDescription>Customize your dashboard viewing experience.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Dark Mode</Label>
                    <p className="text-xs text-muted-foreground">Switch between light and dark themes.</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
