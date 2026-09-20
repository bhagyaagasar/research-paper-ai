import React from 'react';
import { Upload, FileSearch, Scissors, Cpu, Database, CheckCircle2 } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const STAGES = [
  { id: 'ps-1', icon: Upload, label: 'Uploaded', desc: 'File received' },
  { id: 'ps-2', icon: FileSearch, label: 'Extracting', desc: 'Text + metadata' },
  { id: 'ps-3', icon: Scissors, label: 'Chunking', desc: 'Section-aware splits' },
  { id: 'ps-4', icon: Cpu, label: 'Embedding', desc: 'Sentence Transformers' },
  { id: 'ps-5', icon: Database, label: 'Indexing', desc: 'FAISS vector store' },
  { id: 'ps-6', icon: CheckCircle2, label: 'Completed', desc: 'Ready to query' },
];

export default function PipelineGuide() {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-sm font-semibold text-foreground">Processing Pipeline</h2>
        <span className="text-2xs text-muted-foreground">— Each uploaded PDF passes through 6 automated stages</span>
      </div>
      <div className="flex items-start gap-0 overflow-x-auto scrollbar-thin pb-1">
        {STAGES?.map((stage, index) => {
          const Icon = stage?.icon;
          return (
            <div key={stage?.id} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center gap-2 min-w-[90px] text-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
                  ${index === 5
                    ? 'bg-primary/10 border-primary text-primary' :'bg-muted border-border text-muted-foreground'}
                `}>
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">{stage?.label}</p>
                  <p className="text-2xs text-muted-foreground">{stage?.desc}</p>
                </div>
              </div>
              {index < STAGES?.length - 1 && (
                <div className="flex-shrink-0 w-8 h-px bg-border mx-1 mb-5" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}