import React from 'react';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`shimmer rounded-md ${className}`} />
  );
}

export function TableRowSkeleton({ cols }: { cols: number }) {
  return (
    <tr className="border-b border-border">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={`skel-col-${i}`} className="px-4 py-3">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="w-9 h-9 rounded-lg" />
        <Skeleton className="w-14 h-4" />
      </div>
      <Skeleton className="w-20 h-7 mb-1" />
      <Skeleton className="w-32 h-3 mt-2" />
    </div>
  );
}