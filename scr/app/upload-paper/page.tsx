import React from 'react';
import AppLayout from '@/components/AppLayout';
import UploadZone from './components/UploadZone';
import UploadQueue from './components/UploadQueue';
import MetadataPreview from './components/MetadataPreview';
import PipelineGuide from './components/PipelineGuide';

export default function UploadPaperPage() {
  return (
    <AppLayout
      title="Upload Research Papers"
      subtitle="Add PDFs to your corpus — text extraction, chunking, and embedding happen automatically"
    >
      <div className="px-6 py-6 max-w-screen-2xl mx-auto space-y-6">
        {/* Pipeline overview */}
        <PipelineGuide />

        {/* Upload zone + metadata preview */}
        <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <UploadZone />
            <UploadQueue />
          </div>
          <div className="xl:col-span-1">
            <MetadataPreview />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}