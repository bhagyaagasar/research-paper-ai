'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

// Backend integration point: GET /api/papers → map to chunk counts
const CHUNK_DATA = [
  { id: 'cd-1', paper: 'BERT: Pre-training...', chunks: 412, pages: 16 },
  { id: 'cd-2', paper: 'Attention Is All...', chunks: 387, pages: 15 },
  { id: 'cd-3', paper: 'ResNet: Deep Residual...', chunks: 534, pages: 12 },
  { id: 'cd-4', paper: 'GPT-4 Technical Report', chunks: 891, pages: 100 },
  { id: 'cd-5', paper: 'ViT: Image Worth 16x16', chunks: 298, pages: 22 },
  { id: 'cd-6', paper: 'CLIP: Learning Transfer...', chunks: 445, pages: 34 },
  { id: 'cd-7', paper: 'Stable Diffusion v2', chunks: 623, pages: 28 },
  { id: 'cd-8', paper: 'LLaMA 2: Open Found...', chunks: 741, pages: 77 },
];

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: { paper: string; pages: number } }> }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-xl text-xs">
      <p className="font-medium text-foreground mb-1 max-w-[180px] truncate">{payload[0].payload.paper}</p>
      <p className="text-primary">{payload[0].value.toLocaleString()} chunks</p>
      <p className="text-muted-foreground">{payload[0].payload.pages} pages</p>
    </div>
  );
};

export default function ChunkDistributionChart() {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Chunk Distribution by Paper</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Indexed text segments available for semantic search</p>
        </div>
        <span className="text-2xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
          4,831 total
        </span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={CHUNK_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="paper"
            tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: string) => v.split(':')[0].substring(0, 10) + '…'}
          />
          <YAxis
            tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(110,231,183,0.05)' }} />
          <Bar dataKey="chunks" radius={[4, 4, 0, 0]}>
            {CHUNK_DATA.map((entry, index) => (
              <Cell
                key={`cell-${entry.id}`}
                fill={index === 3 ? 'var(--accent)' : 'var(--primary)'}
                fillOpacity={index === 3 ? 0.9 : 0.7}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}