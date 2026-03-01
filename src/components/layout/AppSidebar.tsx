'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, MessageSquare, Database, TrendingUp, ShoppingBag, Settings, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';

const navItems = [
  { name: 'Welcome', href: '/welcome', icon: Sparkles },
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Business Chat', href: '/chat', icon: MessageSquare },
  { name: 'Data Management', href: '/data', icon: Database },
  { name: 'What-If Analysis', href: '/what-if', icon: TrendingUp },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="flex items-center px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <span className="font-headline text-lg font-bold tracking-tight group-data-[collapsible=icon]:hidden">
            ShopSmart <span className="text-primary">AI</span>
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.name}
                    className={cn(
                      "hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href && "bg-accent text-accent-foreground font-semibold"
                    )}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings" className="hover:bg-accent">
              <Link href="/settings">
                <Settings className="h-5 w-5" />
                <span className="font-medium group-data-[collapsible=icon]:hidden">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
