'use client';

import { useState, useEffect } from 'react';
import { Code, Shield, Zap, Award, ArrowLeft, Play, Sparkles, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import AnalysisResults from '@/app/components/AnalysisResults';

export default function DemoPage() {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);

  const demoCode = `function calculateTotal(items) {
  let total = 0;
  for(let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

function processOrder(order) {
  const total = calculateTotal(order.items);
  if(total > 1000) {
    return "Large order discount applied";
  }
  return "Standard shipping";
}`;

  const demoAnalysis = {
    stats: {
      complexity: "Medium",
      issues: 3,
      suggestions: 2,
      qualityScore: 75,
      lines: 12,
      todos: 0,
      functions: 2,
      metrics: {
        avgFunctionLength: 5,
        maxNesting: 2,
        duplication: "0%"
      }
    },
    lintResults: [
      {
        line: 2,
        column: 1,
        message: "Consider using array.reduce() for cleaner summation",
        severity: 0,
        type: "suggestion",
        ruleId: "prefer-array-reduce"
      },
      {
        line: 8,
        column: 1,
        message: "Missing input validation for order parameter",
        severity: 1,
        type: "warning",
        ruleId: "require-input-validation"
      }
    ],
    formattedCode: demoCode,
    improvements: [
      {
        line: 2,
        type: "readability",
        message: "Use array.reduce() for better readability"
      },
      {
        line: 8,
        type: "security",
        message: "Add input validation"
      },
      {
        line: 8,
        type: "error_handling",
        message: "Consider adding error handling for edge cases"
      }
    ],
    originalCode: demoCode,
    comments: {
      total: 0,
      documentation: 0,
      todos: 0,
      quality: {
        good: 0,
        needsImprovement: 0,
        missing: 2
      },
      suggestions: [
        {
          line: 1,
          message: "Add JSDoc documentation for calculateTotal function"
        },
        {
          line: 7,
          message: "Add JSDoc documentation for processOrder function"
        }
      ]
    }
  };

  const handleAnalyzeCode = () => {
    setIsAnalyzing(true);
    // Simulate analysis time
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowAnalysis(true);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(demoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-12">
        {/* Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center text-slate-600 hover:text-indigo-600 mb-8 group transition-all duration-200"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Back to Home</span>
        </Link>

        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles size={16} />
              Interactive Demo
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Experience AI-Powered 
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent block lg:inline lg:ml-3">
                Code Review
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See how our AI analyzes code quality, suggests improvements, and catches potential issues in real-time.
            </p>
          </div>

          {/* Demo Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Code Editor */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-slate-300 text-sm font-medium">demo.js</span>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy
                    </>
                  )}
                </button>
              </div>
              
              <div className="bg-slate-900 p-6">
                <pre className="text-slate-300 font-mono text-sm leading-relaxed overflow-x-auto">
                  <code>{demoCode}</code>
                </pre>
              </div>
            </div>

            {/* Analysis Controls */}
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Code className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Ready for Analysis
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Click the button below to see our AI analyze this JavaScript code and provide detailed insights.
                  </p>
                  
                  <button
                    onClick={handleAnalyzeCode}
                    disabled={isAnalyzing || showAnalysis}
                    className="w-full px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Analyzing Code...
                      </>
                    ) : showAnalysis ? (
                      <>
                        <Check size={20} />
                        Analysis Complete
                      </>
                    ) : (
                      <>
                        <Play size={20} />
                        Analyze Code
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Quick Stats Preview */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Code size={16} />
                    <span className="text-sm font-medium">Lines</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">12</div>
                </div>
                <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 text-purple-600 mb-1">
                    <Zap size={16} />
                    <span className="text-sm font-medium">Functions</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900">2</div>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          {showAnalysis && (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden animate-fade-in">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-6">
                <div className="flex items-center gap-3 text-white">
                  <Award size={28} />
                  <div>
                    <h2 className="text-2xl font-bold">AI Analysis Results</h2>
                    <p className="text-indigo-100">Comprehensive code quality assessment</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <AnalysisResults {...demoAnalysis} />
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">Ready to Try with Your Code?</h3>
              <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
                Upload your own files and get instant, intelligent feedback on code quality, 
                performance, and best practices.
              </p>
              <Link href="/upload">
                <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Upload Your Code
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}