'use client';

import { useState } from 'react';
import { UploadCloud, Terminal, AlertCircle, CheckCircle } from 'lucide-react';
import FileUploadArea from '../components/FileUploadArea';
import AnalysisResults from '../components/AnalysisResults';
import SupportedLanguages from '../components/SupportedLanguages';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [isDragging, setIsDragging] = useState(false);
  const [lintResults, setLintResults] = useState([]);
  const [formattedCode, setFormattedCode] = useState('');
  const [originalCode, setOriginalCode] = useState('');
  const [stats, setStats] = useState(null);
  const [improvements, setImprovements] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setMessage('');
      setStatus('idle');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      setMessage('');
      setStatus('idle');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setMessage('Analyzing your code...');
    setLintResults([]);
    setFormattedCode('');
    setOriginalCode('');
    setStats(null);
    setImprovements([]);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Received analysis data:', {
        lintCount: data.lint?.length || 0,
        improvementsCount: data.improvements?.length || 0,
        hasStats: !!data.stats,
        hasFormattedCode: !!data.formattedCode,
      });

      setMessage(data.message || 'Code analysis complete!');
      setStatus('success');
      setLintResults(Array.isArray(data.lint) ? data.lint : []);
      setFormattedCode(data.formattedCode || '');
      setOriginalCode(data.originalCode || '');
      setStats(data.stats || {});

      if (Array.isArray(data.improvements)) {
        console.log('Setting improvements:', data.improvements);
        setImprovements(data.improvements);
      } else {
        console.warn('Improvements data is not an array:', data.improvements);
        setImprovements([]);
      }
    } catch (err) {
      console.error('Error during analysis:', err);
      setMessage('Analysis failed. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-1 sm:mb-4">
            Upload Your{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Code
            </span>
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            Our AI will analyze your code for bugs, security issues, and
            performance improvements in seconds.
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8">
          <FileUploadArea
            file={file}
            isDragging={isDragging}
            onFileChange={handleFileChange}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />

          {file && (
            <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Terminal size={20} className="text-indigo-600" />
                <div>
                  <h3 className="font-medium text-slate-800">File Details</h3>
                  <p className="text-sm text-slate-600">
                    {file.name} ({(file.size / 1024).toFixed(1)} KB)
                  </p>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={status === 'loading' || !file}
            className={`w-full cursor-pointer py-4 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors ${
              !file
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                : status === 'loading'
                  ? 'bg-indigo-400 text-white cursor-wait'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {status === 'loading' ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing...
              </>
            ) : (
              <>
                {status === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <UploadCloud size={20} />
                )}
                {status === 'success'
                  ? 'Analysis Complete'
                  : 'Start Code Analysis'}
              </>
            )}
          </button>

          {message && (
            <div
              className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
                status === 'error'
                  ? 'bg-red-50 text-red-700 border border-red-200'
                  : status === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
              }`}
            >
              {status === 'error' ? (
                <AlertCircle size={18} />
              ) : status === 'success' ? (
                <CheckCircle size={18} />
              ) : (
                <UploadCloud size={18} />
              )}
              {message}
            </div>
          )}

          {status === 'success' && (
            <AnalysisResults
              stats={stats}
              lintResults={lintResults}
              formattedCode={formattedCode}
              originalCode={originalCode}
              improvements={improvements}
            />
          )}

          <SupportedLanguages />
        </div>
      </div>
    </div>
  );
}
