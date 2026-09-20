'use client';

import React, { useState } from 'react';
import { FileText, ChevronDown, Tag, Users, Calendar, BookOpen, Hash, Link2 } from 'lucide-react';

// Backend integration point: GET /api/papers/{id} → metadata extracted from PDF
const SAMPLE_METADATA = {
  id: 'prev-001',
  title: 'Attention Is All You Need',
  authors: ['Ashish Vaswani', 'Noam Shazeer', 'Niki Parmar', 'Jakob Uszkoreit', 'Llion Jones', 'Aidan N. Gomez', 'Łukasz Kaiser', 'Illia Polosukhin'],
  year: 2017,
  journal: 'Advances in Neural Information Processing Systems (NeurIPS)',
  doi: '10.48550/arXiv.1706.03762',
  pages: 15,
  abstract: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.',
  keywords: ['transformer', 'attention mechanism', 'sequence transduction', 'self-attention', 'multi-head attention'],
  sections: ['Abstract', 'Introduction', 'Background', 'Model Architecture', 'Training', 'Results', 'Conclusion'],
};

export default function MetadataPreview() {
  const [paperSelectorOpen, setPaperSelectorOpen] = useState(false);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden h-fit sticky top-6">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">Extracted Metadata</h2>
        <button
          onClick={() => setPaperSelectorOpen((o) => !o)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
        >
          Preview
          <ChevronDown size={12} className={`transition-transform duration-150 ${paperSelectorOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="p-5 space-y-4">
        {/* Paper icon */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/40">
          <div className="p-2 rounded-lg bg-primary/10">
            <FileText size={16} className="text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium text-foreground truncate">{SAMPLE_METADATA.title}</p>
            <p className="text-2xs text-muted-foreground">attention_is_all_you_need.pdf</p>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="text-2xs font-500 text-muted-foreground uppercase tracking-wide flex items-center gap-1 mb-1.5">
            <BookOpen size={10} /> Title
          </label>
          <p className="text-xs text-foreground font-medium leading-relaxed">{SAMPLE_METADATA.title}</p>
        </div>

        {/* Authors */}
        <div>
          <label className="text-2xs font-500 text-muted-foreground uppercase tracking-wide flex items-center gap-1 mb-1.5">
            <Users size={10} /> Authors
          </label>
          <div className="flex flex-wrap gap-1">
            {SAMPLE_METADATA.authors.slice(0, 4).map((author) => (
              <span key={`auth-${author}`} className="text-2xs px-2 py-0.5 rounded-full bg-muted text-foreground">
                {author}
              </span>
            ))}
            {SAMPLE_METADATA.authors.length > 4 && (
              <span className="text-2xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                +{SAMPLE_METADATA.authors.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Year + Journal */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-2xs font-500 text-muted-foreground uppercase tracking-wide flex items-center gap-1 mb-1.5">
              <Calendar size={10} /> Year
            </label>
            <p className="text-xs text-foreground tabular-nums">{SAMPLE_METADATA.year}</p>
          </div>
          <div>
            <label className="text-2xs font-500 text-muted-foreground uppercase tracking-wide flex items-center gap-1 mb-1.5">
              <BookOpen size={10} /> Pages
            </label>
            <p className="text-xs text-foreground tabular-nums">{SAMPLE_METADATA.pages}</p>
          </div>
        </div>

        {/* Journal */}
        <div>
          <label className="text-2xs font-500 text-muted-foreground uppercase tracking-wide flex items-center gap-1 mb-1.5">
            <Hash size={10} /> Journal / Venue
          </label>
          <p className="text-xs text-foreground">{SAMPLE_METADATA.journal}</p>
        </div>

        {/* DOI */}
        <div>
          <label className="text-2xs font-500 text-muted-foreground uppercase tracking-wide flex items-center gap-1 mb-1.5">
            <Link2 size={10} /> DOI
          </label>
          <p className="text-xs text-primary font-mono truncate">{SAMPLE_METADATA.doi}</p>
        </div>

        {/* Abstract */}
        <div>
          <label className="text-2xs font-500 text-muted-foreground uppercase tracking-wide flex items-center gap-1 mb-1.5">
            <FileText size={10} /> Abstract
          </label>
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-4">
            {SAMPLE_METADATA.abstract}
          </p>
        </div>

        {/* Keywords */}
        <div>
          <label className="text-2xs font-500 text-muted-foreground uppercase tracking-wide flex items-center gap-1 mb-1.5">
            <Tag size={10} /> Keywords
          </label>
          <div className="flex flex-wrap gap-1">
            {SAMPLE_METADATA.keywords.map((kw) => (
              <span key={`kw-${kw}`} className="text-2xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Sections detected */}
        <div>
          <label className="text-2xs font-500 text-muted-foreground uppercase tracking-wide flex items-center gap-1 mb-1.5">
            <Scissors size={10} /> Detected Sections
          </label>
          <div className="flex flex-wrap gap-1">
            {SAMPLE_METADATA.sections.map((s) => (
              <span key={`ms-${s}`} className="text-2xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Scissors(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <line x1="20" y1="4" x2="8.12" y2="15.88" />
      <line x1="14.47" y1="14.48" x2="20" y2="20" />
      <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
  );
}