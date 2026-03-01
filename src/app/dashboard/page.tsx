'use client';

import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { useBusinessData } from '@/context/BusinessContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  RefreshCcw,
  Sparkles
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const chartData = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

function DashboardContent() {
  const { data } = useBusinessData();

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-8 animate-in fade-in duration-500">
      <header className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider">
          <Sparkles className="h-4 w-4" />
          Shop Insights
        </div>
        <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
          Store Performance Overview
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Track your grocery business health at a glance. Insights are based on your most recent sales and inventory data.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">$45,000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-primary flex items-center">
                <ArrowUpRight className="h-3 w-3" /> +12%
              </span> 
              from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Inventory Turnover</CardTitle>
            <RefreshCcw className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{data.inventoryTurnover}x</div>
            <p className="text-xs text-muted-foreground mt-1">
              Target: 18x/year
            </p>
            <Progress value={70} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Customer Satisf.</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{data.customerSatisfaction}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-primary flex items-center">
                <ArrowUpRight className="h-3 w-3" /> +3%
              </span> 
              this week
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Profit Margin</CardTitle>
            <TrendingUp className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{data.profitMargin}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <span className="text-destructive flex items-center">
                <ArrowDownRight className="h-3 w-3" /> -1%
              </span> 
              due to spoilage
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Sales Velocity</CardTitle>
            <CardDescription>Daily sales volume across all categories</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'hsl(var(--muted-foreground))'}} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '8px' 
                  }}
                />
                <Area type="monotone" dataKey="sales" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorSales)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 shadow-sm">
          <CardHeader>
            <CardTitle className="font-headline">Inventory Status</CardTitle>
            <CardDescription>Critical stock alerts & categories</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Fresh Produce</p>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="text-sm font-medium">85%</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Dairy & Eggs</p>
                  <Progress value={40} className="h-2" />
                </div>
                <div className="text-sm font-medium text-destructive">Low</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Frozen Foods</p>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="text-sm font-medium">65%</div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-accent/50 border border-accent">
              <div className="flex gap-2">
                <Sparkles className="h-5 w-5 text-primary shrink-0" />
                <p className="text-sm italic">
                  "AI Observation: Consider restocking Organic Milk soon. Demand is peaking on weekends."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        <div className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-6">
          <SidebarTrigger />
          <div className="h-4 w-[1px] bg-border" />
          <span className="text-sm font-medium text-muted-foreground">Dashboard Overview</span>
        </div>
        <DashboardContent />
      </SidebarInset>
    </SidebarProvider>
  );
}
