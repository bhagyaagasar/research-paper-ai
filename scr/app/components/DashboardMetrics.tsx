import React from 'react';
import MetricCard from '@/components/ui/MetricCard';
import { BookOpen, Layers, MessageSquareText, CheckCircle } from 'lucide-react';

export default function DashboardMetrics() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      <MetricCard
        label="Papers Uploaded"
        value="14"
        subValue="2 added this week"
        icon={BookOpen}
        trend="up"
        trendValue="+2 this week"
        variant="default"
      />
      <MetricCard
        label="Papers Processed"
        value="12"
        subValue="2 still processing"
        icon={CheckCircle}
        trend="neutral"
        trendValue="85.7% success"
        variant="warning"
      />
      <MetricCard
        label="Indexed Chunks"
        value="4,831"
        subValue="Across 12 papers"
        icon={Layers}
        trend="up"
        trendValue="+612 today"
        variant="success"
      />
      <MetricCard
        label="Questions Asked"
        value="247"
        subValue="Avg 3.2 per session"
        icon={MessageSquareText}
        trend="up"
        trendValue="+18 today"
        variant="default"
      />
    </div>
  );
}