import React from 'react';
import Link from 'next/link';
import { Upload, MessageSquareText, GitCompare, Search } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const ACTIONS = [
  { id: 'qa-upload', label: 'Upload Paper', href: '/upload-paper', icon: Upload, description: 'Add PDFs to your corpus' },
  { id: 'qa-ask', label: 'Ask AI', href: '/ask-research-paper-ai', icon: MessageSquareText, description: 'Query your papers' },
  { id: 'qa-compare', label: 'Compare Papers', href: '/paper-comparison', icon: GitCompare, description: 'Side-by-side analysis' },
  { id: 'qa-search', label: 'Semantic Search', href: '/semantic-search', icon: Search, description: 'Find passages by meaning' },
];

export default function DashboardQuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {ACTIONS?.map((action) => {
        const Icon = action?.icon;
        return (
          <Link
            key={action?.id}
            href={action?.href}
            className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border card-hover group"
          >
            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors duration-150">
              <Icon size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{action?.label}</p>
              <p className="text-2xs text-muted-foreground truncate">{action?.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}