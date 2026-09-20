import React from 'react';
import AppLayout from '@/components/AppLayout';
import DashboardMetrics from './components/DashboardMetrics';
import RecentPapersTable from './components/RecentPapersTable';
import CorpusActivityFeed from './components/CorpusActivityFeed';
import ChunkDistributionChart from './components/ChunkDistributionChart';
import DashboardQuickActions from './components/DashboardQuickActions';

export default function DashboardPage() {
  return (
    <AppLayout
      title="Research Dashboard"
      subtitle="Corpus overview — 12 papers indexed, last updated 2 min ago"
    >
      <div className="px-6 py-6 max-w-screen-2xl mx-auto space-y-6">
        {/* Quick actions */}
        <DashboardQuickActions />

        {/* KPI Bento Grid — 4 cards: 2+2 layout */}
        <DashboardMetrics />

        {/* Main content: Chart + Activity feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChunkDistributionChart />
          </div>
          <div className="lg:col-span-1">
            <CorpusActivityFeed />
          </div>
        </div>

        {/* Recent papers table */}
        <RecentPapersTable />
      </div>
    </AppLayout>
  );
}