'use client';

import React from 'react';
import { Download, CheckCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ConversionResultProps {
  fileName: string;
  downloadUrl: string;
  onReset: () => void;
}

export default function ConversionResult({ fileName, downloadUrl, onReset }: ConversionResultProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-2xl mx-auto bg-white border rounded-2xl p-8 shadow-lg text-center"
    >
      <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-6">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Conversion Successful!</h2>
      <p className="text-gray-600 mb-8">Your file is ready for download.</p>

      <div className="bg-gray-50 border rounded-xl p-4 mb-8 flex items-center justify-between text-left">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white border rounded shadow-sm">
             <Download className="w-5 h-5 text-gray-400" />
          </div>
          <span className="font-medium text-gray-900 truncate max-w-[200px] sm:max-w-md">
            {fileName}
          </span>
        </div>
        <a
          href={downloadUrl}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
          download
        >
          Download <Download className="w-4 h-4" />
        </a>
      </div>

      <button
        onClick={onReset}
        className="text-gray-500 hover:text-red-600 transition-colors flex items-center gap-2 mx-auto text-sm font-medium"
      >
        <RefreshCw className="w-4 h-4" /> Convert another file
      </button>
    </motion.div>
  );
}
