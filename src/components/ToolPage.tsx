'use client';

import React, { useState } from 'react';
import FileUploader from './FileUploader';
import ConversionResult from './ConversionResult';
import { FileText, FileSpreadsheet, FileStack, FileCode } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  'pdf-to-word': <FileText className="w-12 h-12 text-red-600" />,
  'pdf-to-excel': <FileSpreadsheet className="w-12 h-12 text-red-600" />,
  'word-to-pdf': <FileStack className="w-12 h-12 text-red-600" />,
  'excel-to-pdf': <FileCode className="w-12 h-12 text-red-600" />,
};

interface ToolPageProps {
  title: string;
  description: string;
  tool: string;
  acceptedFiles: { [key: string]: string[] };
}

export default function ToolPage({ title, description, tool, acceptedFiles }: ToolPageProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ fileId: string; fileName: string } | null>(null);

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setProgress(10);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('tool', tool);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => (prev < 90 ? prev + 5 : prev));
      }, 500);

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError('Failed to connect to server');
    } finally {
      setIsUploading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setProgress(0);
    setError(null);
  };

  return (
    <div className="py-20 px-4 min-h-[600px] bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm mb-6">
            {iconMap[tool] || <FileText className="w-12 h-12 text-red-600" />}
          </div>
          <h1 className="text-4xl font-extrabold mb-4">{title}</h1>
          <p className="text-xl text-gray-600">{description}</p>
        </div>

        {!result ? (
          <FileUploader
            acceptedFiles={acceptedFiles}
            onUpload={handleUpload}
            isUploading={isUploading}
            progress={progress}
            error={error}
          />
        ) : (
          <ConversionResult
            fileName={result.fileName}
            downloadUrl={`/api/download/${result.fileId}?name=${encodeURIComponent(result.fileName)}`}
            onReset={reset}
          />
        )}
      </div>
    </div>
  );
}
