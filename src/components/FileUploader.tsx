'use client';

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FileUploaderProps {
  acceptedFiles: { [key: string]: string[] };
  onUpload: (file: File) => Promise<void>;
  isUploading: boolean;
  progress: number;
  error: string | null;
}

export default function FileUploader({
  acceptedFiles,
  onUpload,
  isUploading,
  progress,
  error
}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length > 0) {
      setFile(accepted[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFiles,
    multiple: false,
    disabled: isUploading
  });

  const handleConvert = () => {
    if (file) {
      onUpload(file);
    }
  };

  const clearFile = () => {
    setFile(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!file ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all
            ${isDragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400 hover:bg-gray-50'}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <div className="p-4 bg-red-100 rounded-full mb-4">
              <Upload className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {isDragActive ? 'Drop your file here' : 'Select a file to convert'}
            </h3>
            <p className="text-gray-500 mb-4">or drag and drop here</p>
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
              Choose File
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 rounded-lg">
                <File className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 truncate max-w-[200px] sm:max-w-md">
                  {file.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            {!isUploading && (
              <button onClick={clearFile} className="text-gray-400 hover:text-red-600">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
              {error}
            </div>
          )}

          {isUploading ? (
            <div className="space-y-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 font-medium">Converting...</span>
                <span className="text-red-600 font-bold">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <motion.div
                  className="bg-red-600 h-2.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-center text-gray-400">Please do not close this window</p>
            </div>
          ) : (
            <button
              onClick={handleConvert}
              className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2"
            >
              Convert Now
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}
