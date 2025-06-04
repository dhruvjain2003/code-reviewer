import {
  AlertCircle,
  Copy,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  XCircle,
  Lightbulb,
  SplitSquareHorizontal,
  Download,
  History,
  Bookmark,
  BookmarkPlus,
  Trash2,
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState, useEffect } from 'react';

export default function AnalysisResults({
  stats,
  lintResults,
  formattedCode,
  improvements,
  originalCode,
  comments,
}) {
  const [isCodeExpanded, setIsCodeExpanded] = useState(false);
  const [isLintExpanded, setIsLintExpanded] = useState(false);
  const [isImprovementsExpanded, setIsImprovementsExpanded] = useState(false);
  const [isSnippetsExpanded, setIsSnippetsExpanded] = useState(false);
  const [viewMode, setViewMode] = useState('formatted');
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [snippets, setSnippets] = useState([]);
  const [isAddingSnippet, setIsAddingSnippet] = useState(false);
  const [newSnippetName, setNewSnippetName] = useState('');

  useEffect(() => {
    // Load analysis history from localStorage
    const savedHistory = localStorage.getItem('analysisHistory');
    if (savedHistory) {
      setAnalysisHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (stats && stats.qualityScore !== undefined) {
      // Add current analysis to history
      const newHistory = [
        {
          timestamp: new Date().toISOString(),
          qualityScore: stats.qualityScore,
          issues: lintResults.length,
          improvements: improvements.length,
          metrics: stats.metrics,
        },
        ...analysisHistory,
      ].slice(0, 5); // Keep only last 5 analyses

      setAnalysisHistory(newHistory);
      localStorage.setItem('analysisHistory', JSON.stringify(newHistory));
    }
  }, [stats, lintResults, improvements]);

  useEffect(() => {
    // Load snippets from localStorage
    const savedSnippets = localStorage.getItem('codeSnippets');
    if (savedSnippets) {
      setSnippets(JSON.parse(savedSnippets));
    }
  }, []);

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 2:
        return <XCircle size={20} className="text-red-500" />;
      case 1:
        return <AlertTriangle size={20} className="text-yellow-500" />;
      default:
        return <AlertCircle size={20} className="text-blue-500" />;
    }
  };

  const getSeverityText = (severity) => {
    switch (severity) {
      case 2:
        return 'Error';
      case 1:
        return 'Warning';
      default:
        return 'Info';
    }
  };

  const getSeverityStyles = (severity) => {
    switch (severity) {
      case 2:
        return 'bg-red-50 border-red-200';
      case 1:
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const handleExport = (format) => {
    const data = {
      stats,
      lintResults,
      improvements,
      formattedCode,
      originalCode,
      timestamp: new Date().toISOString(),
    };

    if (format === 'json') {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'code-analysis.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      // For PDF export, we'll use a simple HTML template
      const html = `
        <html>
          <head>
            <title>Code Analysis Report</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #1e293b; }
              .section { margin-bottom: 20px; }
              .metric { margin-bottom: 10px; }
              .issue { margin-bottom: 15px; padding: 10px; border: 1px solid #e2e8f0; }
            </style>
          </head>
          <body>
            <h1>Code Analysis Report</h1>
            <div class="section">
              <h2>Statistics</h2>
              <div class="metric">Total Lines: ${stats.lines}</div>
              <div class="metric">TODO Comments: ${stats.todos}</div>
              <div class="metric">Functions: ${stats.functions}</div>
              <div class="metric">Complexity Score: ${stats.complexity}</div>
            </div>
            <div class="section">
              <h2>Lint Issues</h2>
              ${lintResults
                .map(
                  (issue) => `
                <div class="issue">
                  <strong>Line ${issue.line}, Column ${issue.column}</strong><br>
                  ${issue.message}<br>
                  Severity: ${getSeverityText(issue.severity)}
                </div>
              `,
                )
                .join('')}
            </div>
            <div class="section">
              <h2>Improvements</h2>
              ${improvements
                .map(
                  (imp) => `
                <div class="issue">
                  <strong>Line ${imp.line}</strong><br>
                  ${imp.message}
                </div>
              `,
                )
                .join('')}
            </div>
          </body>
        </html>
      `;

      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    }
  };

  const handleAddSnippet = () => {
    if (!newSnippetName.trim()) return;

    const newSnippet = {
      id: Date.now(),
      name: newSnippetName,
      code: formattedCode,
      timestamp: new Date().toISOString(),
      metrics: stats.metrics,
      qualityScore: stats.qualityScore,
    };

    const updatedSnippets = [newSnippet, ...snippets];
    setSnippets(updatedSnippets);
    localStorage.setItem('codeSnippets', JSON.stringify(updatedSnippets));
    setNewSnippetName('');
    setIsAddingSnippet(false);
  };

  const handleDeleteSnippet = (snippetId) => {
    const updatedSnippets = snippets.filter((s) => s.id !== snippetId);
    setSnippets(updatedSnippets);
    localStorage.setItem('codeSnippets', JSON.stringify(updatedSnippets));
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => handleExport('json')}
          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2"
        >
          <Download size={16} />
          Export JSON
        </button>
        <button
          onClick={() => handleExport('pdf')}
          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-2"
        >
          <Download size={16} />
          Export PDF
        </button>
      </div>

      {snippets.length > 0 && (
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bookmark size={20} className="text-slate-600" />
              <h3 className="text-md sm:text-xl font-semibold text-slate-800">
                Code Snippets
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAddingSnippet(true)}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <BookmarkPlus size={16} />
                Save Current
              </button>
              <button
                onClick={() => setIsSnippetsExpanded(!isSnippetsExpanded)}
                className="text-slate-500 hover:text-slate-800 cursor-pointer transition-colors"
                title={
                  isSnippetsExpanded ? 'Collapse snippets' : 'Expand snippets'
                }
              >
                {isSnippetsExpanded ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
            </div>
          </div>

          {isAddingSnippet && (
            <div className="mb-4 p-4 bg-slate-50 rounded-lg">
              <input
                type="text"
                value={newSnippetName}
                onChange={(e) => setNewSnippetName(e.target.value)}
                placeholder="Enter snippet name"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setIsAddingSnippet(false)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSnippet}
                  className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isSnippetsExpanded ? 'max-h-[2000px]' : 'max-h-[200px]'
            }`}
          >
            <div className="space-y-4">
              {snippets.map((snippet) => (
                <div key={snippet.id} className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-slate-800">
                        {snippet.name}
                      </h4>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          snippet.qualityScore >= 80
                            ? 'bg-green-100 text-green-700'
                            : snippet.qualityScore >= 60
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                        }`}
                      >
                        Score: {snippet.qualityScore}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteSnippet(snippet.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">
                    {new Date(snippet.timestamp).toLocaleString()}
                  </p>
                  <div className="bg-slate-900 rounded-lg overflow-hidden">
                    <SyntaxHighlighter
                      language="javascript"
                      style={oneDark}
                      customStyle={{
                        margin: 0,
                        padding: '1rem',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                      }}
                      wrapLines={true}
                      wrapLongLines={true}
                    >
                      {snippet.code}
                    </SyntaxHighlighter>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {!isSnippetsExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>
      )}

      {!snippets.length && (
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bookmark size={20} className="text-slate-600" />
              <h3 className="text-lg font-semibold text-slate-800">
                Code Snippets
              </h3>
            </div>
            <button
              onClick={() => setIsAddingSnippet(true)}
              className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <BookmarkPlus size={16} />
              Save Current
            </button>
          </div>

          {isAddingSnippet && (
            <div className="p-4 bg-slate-50 rounded-lg">
              <input
                type="text"
                value={newSnippetName}
                onChange={(e) => setNewSnippetName(e.target.value)}
                placeholder="Enter snippet name"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setIsAddingSnippet(false)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSnippet}
                  className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          <div className="text-center py-8">
            <Bookmark size={48} className="text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600">
              Save your code snippets to reference them later
            </p>
          </div>
        </div>
      )}

      {analysisHistory.length > 0 && (
        <div className="bg-white rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <History size={18} className="text-slate-600 sm:w-5 sm:h-5" />
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
              Analysis History
            </h3>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {analysisHistory.map((analysis, index) => (
              <div
                key={analysis.timestamp}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-slate-50 rounded-lg gap-3 sm:gap-4"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      analysis.qualityScore >= 80
                        ? 'bg-green-100 text-green-700'
                        : analysis.qualityScore >= 60
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                    }`}
                  >
                    <span className="font-bold text-sm sm:text-base">
                      {analysis.qualityScore}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-slate-600 mb-1">
                      {new Date(analysis.timestamp).toLocaleString()}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                        {analysis.issues} issues
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                        {analysis.improvements} improvements
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 sm:hidden">
                        {analysis.metrics.duplication} duplication
                      </span>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:block text-sm text-slate-600 flex-shrink-0">
                  {analysis.metrics.duplication} duplication
                </div>

              </div>
            ))}
          </div>

          {analysisHistory.length > 5 && (
            <div className="mt-4 text-center">
              <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                Show More History
              </button>
            </div>
          )}
        </div>
      )}

      {stats && (
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md sm:text-xl font-semibold text-slate-800">
              Code Statistics
            </h3>
            {stats.qualityScore !== undefined && (
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium text-slate-600">
                  Quality Score
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    stats.qualityScore >= 80
                      ? 'bg-green-100 text-green-700'
                      : stats.qualityScore >= 60
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                  }`}
                >
                  {stats.qualityScore}/100
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">Total Lines</p>
              <p className="text-2xl font-bold text-slate-900">
                {stats.lines || 0}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">TODO Comments</p>
              <p className="text-2xl font-bold text-slate-900">
                {stats.todos || 0}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">Functions</p>
              <p className="text-2xl font-bold text-slate-900">
                {stats.functions || 0}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">Complexity Score</p>
              <p className="text-2xl font-bold text-slate-900">
                {stats.complexity || 'N/A'}
              </p>
            </div>
          </div>
          {stats.metrics && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-slate-600">
                  Average Function Length
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  {stats.metrics.avgFunctionLength || 0} lines
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-slate-600">Max Nesting Depth</p>
                <p className="text-lg font-semibold text-slate-900">
                  {stats.metrics.maxNesting || 0} levels
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-slate-600">Code Duplication</p>
                <p className="text-lg font-semibold text-slate-900">
                  {stats.metrics.duplication || '0%'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {comments && (
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Comments Analysis
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">Total Comments</p>
              <p className="text-2xl font-bold text-slate-900">
                {comments.total}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">Documentation</p>
              <p className="text-2xl font-bold text-slate-900">
                {comments.documentation}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">TODOs</p>
              <p className="text-2xl font-bold text-slate-900">
                {comments.todos}
              </p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-600">Documentation Quality</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                  {comments.quality.good} Good
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                  {comments.quality.needsImprovement} Needs Work
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">
                  {comments.quality.missing} Missing
                </span>
              </div>
            </div>
          </div>

          {comments.suggestions.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-slate-700 mb-3">
                Documentation Suggestions
              </h4>
              <div className="space-y-3">
                {comments.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg border bg-blue-50 border-blue-200"
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      <AlertCircle size={16} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-800">
                        {suggestion.message}
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        Line {suggestion.line}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {improvements && improvements.length > 0 && (
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200 relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">
              Suggested Improvements
            </h3>
            <button
              onClick={() => setIsImprovementsExpanded(!isImprovementsExpanded)}
              className="text-slate-500 hover:text-slate-800 cursor-pointer transition-colors"
              title={
                isImprovementsExpanded
                  ? 'Collapse improvements'
                  : 'Expand improvements'
              }
            >
              {isImprovementsExpanded ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isImprovementsExpanded ? 'max-h-[2000px]' : 'max-h-[200px]'
            }`}
          >
            <div className="space-y-4">
              {improvements.map((improvement, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg border bg-purple-50 border-purple-200"
                >
                  <div className="mt-0.5 flex-shrink-0">
                    <Lightbulb size={20} className="text-purple-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-slate-800">
                        Line {improvement.line}
                      </p>
                      <span className="text-sm px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                        {improvement.type
                          .replace(/_/g, ' ')
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    </div>
                    <p className="text-slate-600 break-words">
                      {improvement.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {!isImprovementsExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>
      )}

      {lintResults.length > 0 && (
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200 relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">
              Lint Results
            </h3>
            <button
              onClick={() => setIsLintExpanded(!isLintExpanded)}
              className="text-slate-500 hover:text-slate-800 cursor-pointer transition-colors"
              title={
                isLintExpanded ? 'Collapse lint results' : 'Expand lint results'
              }
            >
              {isLintExpanded ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isLintExpanded ? 'max-h-[2000px]' : 'max-h-[200px]'
            }`}
          >
            <div className="space-y-4">
              {lintResults.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 p-4 rounded-lg border ${getSeverityStyles(result.severity)}`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {getSeverityIcon(result.severity)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-slate-800">
                        Line {result.line}, Column {result.column}
                      </p>
                      <span
                        className={`text-sm px-2 py-0.5 rounded-full ${
                          result.severity === 2
                            ? 'bg-red-100 text-red-700'
                            : result.severity === 1
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {getSeverityText(result.severity)}
                      </span>
                    </div>
                    <p className="text-slate-600 break-words">
                      {result.message}
                    </p>
                    {result.ruleId && (
                      <p className="text-sm text-slate-500 mt-1">
                        Rule: {result.ruleId}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {!isLintExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>
      )}

      {typeof formattedCode === 'string' && formattedCode && (
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200 relative">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Code View</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setViewMode(
                    viewMode === 'formatted' ? 'compare' : 'formatted',
                  )
                }
                className="text-slate-500 hover:text-slate-800 cursor-pointer transition-colors"
                title={
                  viewMode === 'formatted'
                    ? 'Compare with original'
                    : 'Show formatted only'
                }
              >
                <SplitSquareHorizontal size={20} />
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(formattedCode)}
                className="text-slate-500 hover:text-slate-800 cursor-pointer transition-colors"
                title="Copy to clipboard"
              >
                <Copy size={20} />
              </button>
              <button
                onClick={() => setIsCodeExpanded(!isCodeExpanded)}
                className="text-slate-500 hover:text-slate-800 cursor-pointer transition-colors"
                title={isCodeExpanded ? 'Collapse code' : 'Expand code'}
              >
                {isCodeExpanded ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>
            </div>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isCodeExpanded ? 'max-h-[2000px]' : 'max-h-[200px]'
            }`}
          >
            <div className="overflow-x-auto">
              {viewMode === 'compare' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-slate-700 mb-2">
                      Original Code
                    </div>
                    <SyntaxHighlighter
                      language="javascript"
                      style={oneDark}
                      customStyle={{
                        borderRadius: '0.5rem',
                        padding: '1rem',
                        margin: 0,
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                      }}
                      wrapLines={true}
                      wrapLongLines={true}
                    >
                      {originalCode}
                    </SyntaxHighlighter>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-700 mb-2">
                      Formatted Code
                    </div>
                    <SyntaxHighlighter
                      language="javascript"
                      style={oneDark}
                      customStyle={{
                        borderRadius: '0.5rem',
                        padding: '1rem',
                        margin: 0,
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                      }}
                      wrapLines={true}
                      wrapLongLines={true}
                    >
                      {formattedCode}
                    </SyntaxHighlighter>
                  </div>
                </div>
              ) : (
                <SyntaxHighlighter
                  language="javascript"
                  style={oneDark}
                  customStyle={{
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    margin: 0,
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                  }}
                  wrapLines={true}
                  wrapLongLines={true}
                >
                  {formattedCode}
                </SyntaxHighlighter>
              )}
            </div>
          </div>
          {!isCodeExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          )}
        </div>
      )}
    </div>
  );
}
