'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StatusBadge from '@/components/ui/StatusBadge';
import { Eye, FileText, MessageSquareText, GitCompare, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

type PaperStatus = 'completed' | 'processing' | 'failed' | 'uploaded';

interface Paper {
  id: string;
  title: string;
  authors: string;
  year: number;
  journal: string;
  pages: number;
  chunks: number;
  status: PaperStatus;
  uploadDate: string;
  fileSize: string;
}

// Backend integration point: GET /api/papers
const PAPERS: Paper[] = [
  { id: 'paper-001', title: 'BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding', authors: 'Devlin, J. et al.', year: 2019, journal: 'NAACL', pages: 16, chunks: 412, status: 'completed', uploadDate: '2026-09-19', fileSize: '1.2 MB' },
  { id: 'paper-002', title: 'Attention Is All You Need', authors: 'Vaswani, A. et al.', year: 2017, journal: 'NeurIPS', pages: 15, chunks: 387, status: 'completed', uploadDate: '2026-09-18', fileSize: '0.9 MB' },
  { id: 'paper-003', title: 'Deep Residual Learning for Image Recognition', authors: 'He, K. et al.', year: 2016, journal: 'CVPR', pages: 12, chunks: 534, status: 'completed', uploadDate: '2026-09-18', fileSize: '1.8 MB' },
  { id: 'paper-004', title: 'GPT-4 Technical Report', authors: 'OpenAI', year: 2023, journal: 'arXiv', pages: 100, chunks: 891, status: 'completed', uploadDate: '2026-09-17', fileSize: '8.4 MB' },
  { id: 'paper-005', title: 'An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale', authors: 'Dosovitskiy, A. et al.', year: 2021, journal: 'ICLR', pages: 22, chunks: 298, status: 'completed', uploadDate: '2026-09-17', fileSize: '2.1 MB' },
  { id: 'paper-006', title: 'Learning Transferable Visual Models From Natural Language Supervision', authors: 'Radford, A. et al.', year: 2021, journal: 'ICML', pages: 34, chunks: 445, status: 'completed', uploadDate: '2026-09-16', fileSize: '3.6 MB' },
  { id: 'paper-007', title: 'High-Resolution Image Synthesis with Latent Diffusion Models', authors: 'Rombach, R. et al.', year: 2022, journal: 'CVPR', pages: 28, chunks: 623, status: 'processing', uploadDate: '2026-09-19', fileSize: '4.2 MB' },
  { id: 'paper-008', title: 'LLaMA 2: Open Foundation and Fine-Tuned Chat Models', authors: 'Touvron, H. et al.', year: 2023, journal: 'arXiv', pages: 77, chunks: 741, status: 'completed', uploadDate: '2026-09-15', fileSize: '6.1 MB' },
  { id: 'paper-009', title: 'Segment Anything', authors: 'Kirillov, A. et al.', year: 2023, journal: 'ICCV', pages: 19, chunks: 0, status: 'failed', uploadDate: '2026-09-14', fileSize: '2.7 MB' },
  { id: 'paper-010', title: 'Mixtral of Experts', authors: 'Jiang, A. et al.', year: 2024, journal: 'arXiv', pages: 14, chunks: 0, status: 'uploaded', uploadDate: '2026-09-19', fileSize: '1.1 MB' },
];

type SortKey = 'title' | 'year' | 'pages' | 'chunks' | 'uploadDate';

export default function RecentPapersTable() {
  const [sortKey, setSortKey] = useState<SortKey>('uploadDate');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const sorted = [...PAPERS].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    const cmp = typeof av === 'string' ? av.localeCompare(bv as string) : (av as number) - (bv as number);
    return sortDir === 'asc' ? cmp : -cmp;
  });

  const handleDelete = (id: string) => {
    setDeletingId(id);
    // Backend integration point: DELETE /api/papers/{id}
    setTimeout(() => setDeletingId(null), 600);
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronUp size={12} className="text-muted-foreground/40" />;
    return sortDir === 'asc'
      ? <ChevronUp size={12} className="text-primary" />
      : <ChevronDown size={12} className="text-primary" />;
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Research Library</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{PAPERS.length} papers · {PAPERS.filter(p => p.status === 'completed').length} indexed</p>
        </div>
        <Link
          href="/upload-paper"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-all duration-150"
        >
          Upload Paper
        </Link>
      </div>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {[
                { key: 'title' as SortKey, label: 'Title' },
                { key: null, label: 'Authors' },
                { key: 'year' as SortKey, label: 'Year' },
                { key: null, label: 'Journal' },
                { key: 'pages' as SortKey, label: 'Pages' },
                { key: 'chunks' as SortKey, label: 'Chunks' },
                { key: null, label: 'Status' },
                { key: 'uploadDate' as SortKey, label: 'Uploaded' },
                { key: null, label: 'Actions' },
              ].map((col, i) => (
                <th
                  key={`th-${i}`}
                  onClick={() => col.key && handleSort(col.key)}
                  className={`
                    px-4 py-3 text-left text-2xs font-500 uppercase tracking-wider text-muted-foreground whitespace-nowrap
                    ${col.key ? 'cursor-pointer hover:text-foreground select-none' : ''}
                  `}
                >
                  <span className="flex items-center gap-1">
                    {col.label}
                    {col.key && <SortIcon col={col.key} />}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((paper) => (
              <tr
                key={paper.id}
                className={`
                  border-b border-border/50 hover:bg-muted/30 transition-all duration-150
                  ${deletingId === paper.id ? 'opacity-0 max-h-0' : 'opacity-100'}
                `}
              >
                <td className="px-4 py-3 max-w-[280px]">
                  <p className="text-xs font-medium text-foreground truncate" title={paper.title}>
                    {paper.title}
                  </p>
                  <p className="text-2xs text-muted-foreground mt-0.5">{paper.fileSize}</p>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-xs text-muted-foreground">{paper.authors}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-xs text-foreground tabular-nums">{paper.year}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-xs text-muted-foreground">{paper.journal}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-xs text-foreground tabular-nums">{paper.pages}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`text-xs tabular-nums ${paper.chunks > 0 ? 'text-primary' : 'text-muted-foreground'}`}>
                    {paper.chunks > 0 ? paper.chunks.toLocaleString() : '—'}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <StatusBadge status={paper.status} size="sm" />
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-xs text-muted-foreground tabular-nums">{paper.uploadDate}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Show actions always for usability */}
                    <button title="View paper" className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-150">
                      <Eye size={13} />
                    </button>
                    <button title="Summarize paper" className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-150">
                      <FileText size={13} />
                    </button>
                    <Link href="/ask-research-paper-ai" title="Ask questions about this paper" className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-150 inline-flex">
                      <MessageSquareText size={13} />
                    </Link>
                    <button title="Add to comparison" className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-150">
                      <GitCompare size={13} />
                    </button>
                    <button
                      title="Delete this paper — this cannot be undone"
                      onClick={() => handleDelete(paper.id)}
                      className="p-1.5 rounded-md hover:bg-danger/10 text-muted-foreground hover:text-danger transition-all duration-150"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-5 py-3 border-t border-border">
        <p className="text-xs text-muted-foreground">Showing {PAPERS.length} of {PAPERS.length} papers</p>
        <div className="flex items-center gap-1">
          {[1].map((p) => (
            <button key={`page-${p}`} className="px-2.5 py-1 rounded text-xs font-medium bg-primary/10 text-primary">
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}