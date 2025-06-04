'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Code,
  GitBranch,
  Search,
  Zap,
  CheckCircle,
  ArrowRight,
  Users,
  Shield,
  FileCode,
  Award,
} from 'lucide-react';
import AnalysisResults from '@/app/components/AnalysisResults';

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100">
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
          isScrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <Link href="/upload">
          <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl shadow-xl hover:bg-indigo-700 transition duration-300 flex items-center gap-2">
            Try Free <ArrowRight size={16} />
          </button>
        </Link>
      </div>

      <main className="container mx-auto px-4 pt-20 pb-24 md:pt-32 lg:pt-40">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 rounded-full mb-6 animate-pulse">
            <span className="text-sm font-medium text-indigo-800">
              New! GitHub PR Integration
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            AI-Powered Code
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              {' '}
              Review
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
            Get instant, intelligent feedback on your code. Catch bugs, optimize
            performance, and learn best practices — all in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/upload">
              <button className="px-8 py-4 bg-indigo-600 text-white font-medium rounded-xl shadow-lg cursor-pointer hover:bg-indigo-700 transition duration-300 flex items-center justify-center gap-2">
                <Code size={20} />
                Upload Code
              </button>
            </Link>
            <Link href="/demo">
              <button className="px-8 py-4 bg-white text-indigo-600 border border-indigo-200 font-medium cursor-pointer rounded-xl shadow-md hover:bg-indigo-50 transition duration-300">
                See Demo
              </button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 mt-12">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Shield size={16} className="text-slate-400" />
              <span>Enterprise-grade security</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <Users size={16} className="text-slate-400" />
              <span>10,000+ active developers</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <FileCode size={16} className="text-slate-400" />
              <span>500K+ reviews completed</span>
            </div>
          </div>
        </div>
      </main>

      <section
        id="features"
        className="scroll-mt-24 container mx-auto px-4 py-16"
      >
        <h2 className="text-3xl font-bold text-center mb-4 text-slate-800">
          Everything You Need
        </h2>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12">
          Our AI-powered platform provides comprehensive code analysis across
          multiple languages and frameworks
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-transparent hover:border-indigo-100">
            <div className="bg-blue-100 p-3 rounded-xl inline-block mb-4">
              <Search className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              Smart Analysis
            </h3>
            <p className="text-slate-600 mb-4">
              Our AI analyzes your code's structure, logic, and patterns to
              identify issues human reviewers might miss.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle size={16} className="text-blue-600" /> Detect
                logical errors
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle size={16} className="text-blue-600" /> Identify
                security vulnerabilities
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle size={16} className="text-blue-600" /> Suggest
                performance optimizations
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-transparent hover:border-indigo-100">
            <div className="bg-green-100 p-3 rounded-xl inline-block mb-4">
              <Zap className="text-green-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              10+ Languages
            </h3>
            <p className="text-slate-600 mb-4">
              Support for JavaScript, Python, Java, Go, Ruby, PHP, and more.
              We've got your tech stack covered.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle size={16} className="text-green-600" /> Frontend
                frameworks (React, Vue, Angular)
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle size={16} className="text-green-600" /> Backend
                frameworks (Node, Django, Rails)
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle size={16} className="text-green-600" /> Database
                queries (SQL, NoSQL)
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-transparent hover:border-indigo-100">
            <div className="bg-purple-100 p-3 rounded-xl inline-block mb-4">
              <GitBranch className="text-purple-600" size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">
              GitHub Integration
            </h3>
            <p className="text-slate-600 mb-4">
              Connect your GitHub repos for automatic PR reviews and continuous
              code quality monitoring.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle size={16} className="text-purple-600" /> Automatic
                PR comments
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle size={16} className="text-purple-600" /> CI/CD
                pipeline integration
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle size={16} className="text-purple-600" /> Team
                collaboration tools
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 scroll-mt-4 container mx-auto px-4 py-16 mb-24" id="about">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              See it in Action
            </h2>
            <p className="text-slate-400">
              Our AI provides specific, actionable feedback to improve your code
              quality and security
            </p>
          </div>
          <div className="max-w-4xl mx-auto bg-slate-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-6 py-4 bg-slate-700">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-slate-400 text-sm">example.js</span>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Code block */}
              <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-slate-700 p-4 md:p-6 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre className="whitespace-pre-wrap">{`
function fetchUserData(id) {
  return fetch('/api/users/' + id)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data.success == true) {
        return data.user;
      }
    })
    .catch(error => {
      console.log('Error fetching user:', error);
    });
}`}</pre>
              </div>

              {/* Review Panel */}
              <div className="w-full md:w-1/2 p-4 md:p-6 bg-slate-900 text-sm text-slate-300">
                <div className="flex items-center gap-2 text-red-400 mb-4">
                  <Shield size={16} />
                  <span className="font-semibold">Security Issue</span>
                </div>
                <p className="mb-4 text-slate-400 text-sm">
                  Direct string concatenation in API URLs can lead to injection
                  vulnerabilities. Use template literals or URL constructor.
                </p>

                <div className="flex items-center gap-2 text-yellow-400 mb-4 mt-6">
                  <Zap size={16} />
                  <span className="font-semibold">Performance Improvement</span>
                </div>
                <p className="mb-4 text-slate-400 text-sm">
                  Missing error handling for failed API responses. Always
                  validate response.ok before parsing.
                </p>

                <div className="flex items-center gap-2 text-blue-400 mb-4 mt-6">
                  <Code size={16} />
                  <span className="font-semibold">Code Quality</span>
                </div>
                <p className="mb-4 text-slate-400 text-sm">
                  Use strict equality (===) instead of loose equality (==) when
                  comparing boolean values.
                </p>

                <div className="mt-6 p-3 bg-indigo-900/30 rounded-lg border border-indigo-800">
                  <h4 className="text-indigo-400 font-semibold mb-2 flex items-center gap-2">
                    <Award size={16} /> AI Suggestion
                  </h4>
                  <p className="text-slate-400 text-xs">
                    Convert to async/await pattern for better readability and
                    error handling.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {analysisResults && (
        <AnalysisResults
          stats={analysisResults.stats}
          lintResults={analysisResults.lintResults}
          formattedCode={analysisResults.formattedCode}
          improvements={analysisResults.improvements}
          originalCode={analysisResults.originalCode}
          comments={analysisResults.comments}
        />
      )}
    </div>
  );
}
