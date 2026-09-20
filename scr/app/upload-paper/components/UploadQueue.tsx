'use client';

import React, { useState } from 'react';
import StatusBadge from '@/components/ui/StatusBadge';
import { FileText, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';

type PipelineStage = 'uploaded' | 'extracting' | 'chunking' | 'embedding' | 'indexing' | 'completed' | 'failed';

interface QueueEntry {
  id: string;
  filename: string;
  title: string;
  fileSize: string;
  stage: PipelineStage;
  progress: number;
  pages?: number;
  chunks?: number;
  sections?: string[];
  error?: string;
  startedAt: string;
}

// Backend integration point: GET /api/papers?status=processing,uploaded
const QUEUE: QueueEntry[] = [
  {
    id: 'q-001',
    filename: 'stable_diffusion_v3.pdf',
    title: 'Scaling Rectified Flow Transformers for High-Resolution Image Synthesis',
    fileSize: '4.2 MB',
    stage: 'embedding',
    progress: 68,
    pages: 28,
    chunks: 412,
    sections: ['Abstract', 'Introduction', 'Methodology', 'Results'],
    startedAt: '10:21:14',
  },
  {
    id: 'q-002',
    filename: 'mixtral_of_experts.pdf',
    title: 'Mixtral of Experts',
    fileSize: '1.1 MB',
    stage: 'chunking',
    progress: 42,
    pages: 14,
    chunks: 87,
    sections: ['Abstract', 'Introduction'],
    startedAt: '10:23:01',
  },
  {
    id: 'q-003',
    filename: 'survey_scanned.pdf',
    title: 'survey_scanned.pdf',
    fileSize: '12.8 MB',
    stage: 'failed',
    progress: 8,
    error: 'Scanned PDF detected — no extractable text layer. Please provide a text-based PDF or use OCR preprocessing.',
    startedAt: '10:19:44',
  },
];

const STAGE_ORDER: PipelineStage[] = ['uploaded', 'extracting', 'chunking', 'embedding', 'indexing', 'completed'];

function StageProgress({ current }: { current: PipelineStage }) {
  if (current === 'failed') return null;
  const idx = STAGE_ORDER.indexOf(current);
  return (
    <div className="flex items-center gap-1 mt-2">
      {STAGE_ORDER.map((s, i) => (
        <React.Fragment key={`sp-${s}`}>
          <div className={`
            h-1.5 rounded-full flex-1 transition-all duration-300
            ${i < idx ? 'bg-primary' : i === idx ? 'bg-primary/60' : 'bg-border'}
          `} />
        </React.Fragment>
      ))}
    </div>
  );
}

export default function UploadQueue() {
  const [expanded, setExpanded] = useState<string | null>('q-001');

  if (QUEUE.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">Processing Queue</h2>
        <span className="text-xs text-muted-foreground">{QUEUE.filter(q => q.stage !== 'completed').length} active</span>
      </div>
      <div className="divide-y divide-border">
        {QUEUE.map((entry) => (
          <div key={entry.id} className="p-4">
            <div
              className="flex items-start gap-3 cursor-pointer"
              onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
            >
              <div className={`
                p-2 rounded-lg flex-shrink-0 mt-0.5
                ${entry.stage === 'failed' ? 'bg-danger/10' : 'bg-primary/10'}
              `}>
                {entry.stage === 'failed'
                  ? <AlertTriangle size={14} className="text-danger" />
                  : <FileText size={14} className="text-primary" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-foreground truncate">{entry.title}</p>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <StatusBadge status={entry.stage as 'completed' | 'processing' | 'failed' | 'uploaded' | 'indexing' | 'extracting' | 'chunking' | 'embedding'} size="sm" />
                    {expanded === entry.id ? <ChevronUp size={12} className="text-muted-foreground" /> : <ChevronDown size={12} className="text-muted-foreground" />}
                  </div>
                </div>
                <p className="text-2xs text-muted-foreground mt-0.5">{entry.filename} · {entry.fileSize} · Started {entry.startedAt}</p>
                {entry.stage !== 'failed' && entry.stage !== 'completed' && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-2xs text-muted-foreground capitalize">{entry.stage}…</span>
                      <span className="text-2xs text-primary tabular-nums">{entry.progress}%</span>
                    </div>
                    <div className="h-1 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${entry.progress}%` }}
                      />
                    </div>
                  </div>
                )}
                {entry.stage !== 'failed' && <StageProgress current={entry.stage} />}
              </div>
            </div>

            {/* Expanded details */}
            {expanded === entry.id && (
              <div className="mt-4 ml-9 fade-in">
                {entry.error ? (
                  <div className="flex items-start gap-2 p-3 rounded-lg bg-danger/10 border border-danger/20">
                    <AlertTriangle size={13} className="text-danger flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-danger">{entry.error}</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-muted/40 rounded-lg p-3">
                      <p className="text-2xs text-muted-foreground uppercase tracking-wide mb-1">Pages</p>
                      <p className="text-sm font-semibold text-foreground tabular-nums">{entry.pages ?? '—'}</p>
                    </div>
                    <div className="bg-muted/40 rounded-lg p-3">
                      <p className="text-2xs text-muted-foreground uppercase tracking-wide mb-1">Chunks</p>
                      <p className="text-sm font-semibold text-foreground tabular-nums">{entry.chunks?.toLocaleString() ?? '—'}</p>
                    </div>
                    <div className="bg-muted/40 rounded-lg p-3">
                      <p className="text-2xs text-muted-foreground uppercase tracking-wide mb-1">Sections</p>
                      <p className="text-sm font-semibold text-foreground tabular-nums">{entry.sections?.length ?? '—'}</p>
                    </div>
                    {entry.sections && entry.sections.length > 0 && (
                      <div className="col-span-3">
                        <p className="text-2xs text-muted-foreground uppercase tracking-wide mb-1.5">Detected Sections</p>
                        <div className="flex flex-wrap gap-1.5">
                          {entry.sections.map((s) => (
                            <span key={`sec-${s}`} className="text-2xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}