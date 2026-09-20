import React from 'react';
import { CheckCircle, AlertCircle, Clock, Upload, Layers } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const ACTIVITY = [
  {
    id: 'act-1',
    type: 'completed',
    message: 'LLaMA 2 paper fully indexed',
    detail: '741 chunks · 77 pages',
    time: '2 min ago',
  },
  {
    id: 'act-2',
    type: 'processing',
    message: 'Stable Diffusion v3 processing',
    detail: 'Generating embeddings…',
    time: '5 min ago',
  },
  {
    id: 'act-3',
    type: 'completed',
    message: 'CLIP paper indexed',
    detail: '445 chunks · 34 pages',
    time: '18 min ago',
  },
  {
    id: 'act-4',
    type: 'failed',
    message: 'survey_ocr.pdf extraction failed',
    detail: 'Scanned PDF — OCR required',
    time: '34 min ago',
  },
  {
    id: 'act-5',
    type: 'uploaded',
    message: 'ViT paper uploaded',
    detail: 'Queued for processing',
    time: '1 hr ago',
  },
  {
    id: 'act-6',
    type: 'completed',
    message: 'GPT-4 Technical Report indexed',
    detail: '891 chunks · 100 pages',
    time: '2 hr ago',
  },
];

const TYPE_CONFIG = {
  completed: { icon: CheckCircle, color: 'text-success' },
  processing: { icon: Clock, color: 'text-warning' },
  failed: { icon: AlertCircle, color: 'text-danger' },
  uploaded: { icon: Upload, color: 'text-info' },
  indexed: { icon: Layers, color: 'text-primary' },
};

export default function CorpusActivityFeed() {
  return (
    <div className="bg-card border border-border rounded-xl p-5 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-foreground">Processing Activity</h2>
        <span className="text-2xs text-muted-foreground">Live</span>
      </div>
      <div className="space-y-3">
        {ACTIVITY.map((item) => {
          const config = TYPE_CONFIG[item.type as keyof typeof TYPE_CONFIG] ?? TYPE_CONFIG.uploaded;
          const Icon = config.icon;
          return (
            <div key={item.id} className="flex items-start gap-3">
              <Icon size={14} className={`mt-0.5 flex-shrink-0 ${config.color}`} />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-foreground truncate">{item.message}</p>
                <p className="text-2xs text-muted-foreground">{item.detail}</p>
              </div>
              <span className="text-2xs text-muted-foreground flex-shrink-0 whitespace-nowrap">{item.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}