'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface QueuedFile {
  id: string;
  file: File;
  status: 'queued' | 'uploading' | 'error';
  error?: string;
}

interface UploadZoneProps {
  onFilesQueued?: (files: QueuedFile[]) => void;
}

const ACCEPTED_TYPES = ['application/pdf'];
const MAX_FILE_SIZE_MB = 50;

export default function UploadZone({ onFilesQueued }: UploadZoneProps) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<QueuedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) return 'Only PDF files are accepted';
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) return `File exceeds ${MAX_FILE_SIZE_MB}MB limit`;
    return null;
  };

  const addFiles = useCallback((incoming: FileList | File[]) => {
    const arr = Array.from(incoming);
    const newFiles: QueuedFile[] = arr.map((file, i) => {
      const error = validateFile(file);
      return {
        id: `qf-${Date.now()}-${i}`,
        file,
        status: error ? 'error' : 'queued',
        error: error ?? undefined,
      };
    });
    setFiles((prev) => [...prev, ...newFiles]);
    const valid = newFiles.filter((f) => f.status === 'queued');
    if (valid.length > 0) {
      toast.success(`${valid.length} PDF${valid.length > 1 ? 's' : ''} added to upload queue`);
    }
    onFilesQueued?.(newFiles);
  }, [onFilesQueued]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleUpload = async () => {
    const valid = files.filter((f) => f.status === 'queued');
    if (valid.length === 0) return;
    setUploading(true);
    // Backend integration point: POST /api/papers/upload — multipart/form-data with each PDF
    await new Promise((r) => setTimeout(r, 1800));
    setUploading(false);
    toast.success(`${valid.length} paper${valid.length > 1 ? 's' : ''} submitted for processing`);
    setFiles([]);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-foreground">Add Papers</h2>
        <span className="text-2xs text-muted-foreground">PDF only · Max {MAX_FILE_SIZE_MB}MB per file</span>
      </div>

      {/* Drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setDragging(false)}
        onClick={() => inputRef.current?.click()}
        className={`
          upload-drop-zone relative flex flex-col items-center justify-center gap-3 py-12 px-6
          border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200
          ${dragging
            ? 'border-primary bg-primary/5 pipeline-glow' :'border-border hover:border-primary/50 hover:bg-muted/30'}
        `}
      >
        <div className={`p-4 rounded-full transition-all duration-200 ${dragging ? 'bg-primary/20' : 'bg-muted'}`}>
          <Upload size={24} className={dragging ? 'text-primary' : 'text-muted-foreground'} />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            {dragging ? 'Drop PDFs here' : 'Drag & drop research papers'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            or <span className="text-primary underline underline-offset-2">browse files</span> · Multiple files supported
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,application/pdf"
          className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((f) => (
            <div
              key={f.id}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg border text-xs
                ${f.status === 'error' ? 'border-danger/30 bg-danger/5' : 'border-border bg-muted/30'}
              `}
            >
              {f.status === 'error'
                ? <AlertCircle size={14} className="text-danger flex-shrink-0" />
                : <FileText size={14} className="text-primary flex-shrink-0" />
              }
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{f.file.name}</p>
                {f.error
                  ? <p className="text-danger">{f.error}</p>
                  : <p className="text-muted-foreground">{(f.file.size / 1024 / 1024).toFixed(2)} MB · PDF</p>
                }
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); removeFile(f.id); }}
                className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-all duration-150 flex-shrink-0"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      {files.filter((f) => f.status === 'queued').length > 0 && (
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 active:scale-95"
        >
          {uploading ? (
            <>
              <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Processing…
            </>
          ) : (
            <>
              <Upload size={15} />
              Upload {files.filter((f) => f.status === 'queued').length} Paper{files.filter((f) => f.status === 'queued').length > 1 ? 's' : ''}
            </>
          )}
        </button>
      )}
    </div>
  );
}