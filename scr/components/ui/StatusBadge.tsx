import React from 'react';

type StatusType = 'completed' | 'processing' | 'failed' | 'uploaded' | 'indexing' | 'extracting' | 'chunking' | 'embedding';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'md';
}

const STATUS_CONFIG: Record<StatusType, { label: string; className: string }> = {
  completed: { label: 'Completed', className: 'status-completed' },
  processing: { label: 'Processing', className: 'status-processing' },
  failed: { label: 'Failed', className: 'status-failed' },
  uploaded: { label: 'Uploaded', className: 'status-uploaded' },
  indexing: { label: 'Indexing', className: 'status-indexing' },
  extracting: { label: 'Extracting', className: 'status-processing' },
  chunking: { label: 'Chunking', className: 'status-processing' },
  embedding: { label: 'Embedding', className: 'status-processing' },
};

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.uploaded;
  return (
    <span
      className={`
        inline-flex items-center gap-1 font-medium rounded-full
        ${size === 'sm' ? 'px-1.5 py-0.5 text-2xs' : 'px-2 py-0.5 text-xs'}
        ${config.className}
      `}
    >
      {(status === 'processing' || status === 'extracting' || status === 'chunking' || status === 'embedding' || status === 'indexing') && (
        <span className="w-1.5 h-1.5 rounded-full bg-current pulse-dot" />
      )}
      {config.label}
    </span>
  );
}