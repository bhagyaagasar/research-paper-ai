'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import {
  LayoutDashboard,
  Upload,
  MessageSquareText,
  BookOpen,
  GitCompare,
  Search,
  Lightbulb,
  Settings,
  ChevronLeft,
  ChevronRight,
  FileText,
  StickyNote,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  group: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'nav-dashboard', label: 'Dashboard', href: '/', icon: LayoutDashboard, group: 'main' },
  { id: 'nav-papers', label: 'My Papers', href: '/my-papers', icon: BookOpen, badge: 12, group: 'main' },
  { id: 'nav-upload', label: 'Upload Paper', href: '/upload-paper', icon: Upload, group: 'main' },
  { id: 'nav-ask', label: 'Ask ResearchPaperAI', href: '/ask-research-paper-ai', icon: MessageSquareText, group: 'ai' },
  { id: 'nav-summary', label: 'Paper Summary', href: '/paper-summary', icon: FileText, group: 'ai' },
  { id: 'nav-compare', label: 'Paper Comparison', href: '/paper-comparison', icon: GitCompare, group: 'ai' },
  { id: 'nav-search', label: 'Semantic Search', href: '/semantic-search', icon: Search, group: 'ai' },
  { id: 'nav-insights', label: 'Research Insights', href: '/research-insights', icon: Lightbulb, badge: 3, group: 'ai' },
  { id: 'nav-notes', label: 'Research Notes', href: '/research-notes', icon: StickyNote, group: 'tools' },
  { id: 'nav-settings', label: 'Settings', href: '/settings', icon: Settings, group: 'tools' },
];

const GROUP_LABELS: Record<string, string> = {
  main: 'Library',
  ai: 'AI Analysis',
  tools: 'Tools',
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const groups = ['main', 'ai', 'tools'];

  return (
    <aside
      className="relative flex flex-col h-screen bg-card border-r border-border transition-all duration-300 ease-in-out flex-shrink-0"
      style={{ width: collapsed ? '64px' : '240px' }}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-3 border-b border-border flex-shrink-0 overflow-hidden">
        <div className="flex items-center gap-2 min-w-0">
          <AppLogo size={32} />
          {!collapsed && (
            <span className="font-semibold text-sm text-foreground whitespace-nowrap truncate">
              ResearchPaperAI
            </span>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 scrollbar-thin">
        {groups.map((group) => {
          const items = NAV_ITEMS.filter((i) => i.group === group);
          return (
            <div key={`group-${group}`} className="mb-4">
              {!collapsed && (
                <p className="px-3 mb-1 text-2xs font-500 uppercase tracking-widest text-muted-foreground">
                  {GROUP_LABELS[group]}
                </p>
              )}
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={`
                      group relative flex items-center gap-3 mx-2 px-2 py-2 rounded-md text-sm font-medium
                      transition-all duration-150 mb-0.5
                      ${isActive
                        ? 'bg-primary/10 text-primary' :'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      }
                    `}
                  >
                    <Icon size={18} className="flex-shrink-0" />
                    {!collapsed && (
                      <span className="truncate flex-1">{item.label}</span>
                    )}
                    {!collapsed && item.badge !== undefined && (
                      <span className="ml-auto text-2xs font-600 px-1.5 py-0.5 rounded-full bg-accent/20 text-accent tabular-nums">
                        {item.badge}
                      </span>
                    )}
                    {collapsed && item.badge !== undefined && (
                      <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-accent" />
                    )}
                    {/* Tooltip for collapsed */}
                    {collapsed && (
                      <span className="pointer-events-none absolute left-full ml-2 z-50 px-2 py-1 rounded bg-secondary text-foreground text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 border border-border shadow-lg">
                        {item.label}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-border p-2 flex-shrink-0">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="flex items-center justify-center w-full py-2 px-2 rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-150"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : (
            <span className="flex items-center gap-2 text-xs">
              <ChevronLeft size={16} />
              <span>Collapse</span>
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}