'use client';

import { useState } from 'react';
import { Code, Shield, Zap, Award, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import AnalysisResults from '@/app/components/AnalysisResults';

export default function DemoPage() {
  const [showAnalysis, setShowAnalysis] = useState(false);

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
      suggestions: 2
    },
    lintResults: [
      {
        line: 2,
        message: "Consider using array.reduce() for cleaner summation",
        severity: "suggestion"
      },
      {
        line: 8,
        message: "Missing input validation for order parameter",
        severity: "warning"
      }
    ],
    formattedCode: demoCode,
    improvements: [
      "Use array.reduce() for better readability",
      "Add input validation",
      "Consider adding error handling for edge cases"
    ],
    originalCode: demoCode,
    comments: [
      {
        type: "security",
        message: "Add validation for order.items to prevent null/undefined errors",
        icon: <Shield className="text-red-400" size={16} />
      },
      {
        type: "performance",
        message: "Consider caching total for repeated calculations",
        icon: <Zap className="text-yellow-400" size={16} />
      },
      {
        type: "quality",
        message: "Use const instead of let for variables that aren't reassigned",
        icon: <Code className="text-blue-400" size={16} />
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-8">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">
            Interactive Demo
          </h1>
          
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Sample Code
            </h2>
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-x-auto">
              <pre>{demoCode}</pre>
            </div>
            
            <button
              onClick={() => setShowAnalysis(!showAnalysis)}
              className="mt-6 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition duration-300"
            >
              {showAnalysis ? 'Hide Analysis' : 'Show AI Analysis'}
            </button>
          </div>

          {showAnalysis && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 text-indigo-600 mb-6">
                <Award size={24} />
                <h2 className="text-xl font-semibold">AI Analysis Results</h2>
              </div>
              <AnalysisResults {...demoAnalysis} />
            </div>
          )}

          <div className="mt-8 text-center">
            <Link href="/upload">
              <button className="px-8 py-4 bg-indigo-600 text-white font-medium rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300">
                Try with Your Own Code
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 