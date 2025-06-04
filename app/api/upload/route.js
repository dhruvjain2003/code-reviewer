import { ESLint } from 'eslint';
import * as prettier from 'prettier';
import path from 'path';

// Create ESLint instance with flat config
const eslint = new ESLint({
  overrideConfigFile: path.resolve('eslint.config.js')
});

const analyzeCodeImprovements = (text) => {
  const improvements = [];
  
  // Check for long functions (more than 20 lines)
  const functionRegex = /function\s+\w+\s*\([^)]*\)\s*{([^}]*)}/g;
  let match;
  while ((match = functionRegex.exec(text)) !== null) {
    const functionBody = match[1];
    const lines = functionBody.split('\n').length;
    if (lines > 20) {
      improvements.push({
        type: 'function_length',
        severity: 'warning',
        message: `Function is ${lines} lines long. Consider breaking it into smaller functions for better maintainability.`,
        line: text.substring(0, match.index).split('\n').length,
      });
    }
  }

  // Check for complex conditions
  const complexConditionRegex = /if\s*\([^)]{100,}\)/g;
  while ((match = complexConditionRegex.exec(text)) !== null) {
    improvements.push({
      type: 'complex_condition',
      severity: 'warning',
      message: 'Complex condition detected. Consider breaking it into smaller, more readable conditions.',
      line: text.substring(0, match.index).split('\n').length,
    });
  }

  // Check for nested loops
  const nestedLoopRegex = /for\s*\([^)]*\)\s*{[^}]*for\s*\([^)]*\)/g;
  while ((match = nestedLoopRegex.exec(text)) !== null) {
    improvements.push({
      type: 'nested_loops',
      severity: 'warning',
      message: 'Nested loops detected. Consider using array methods like map, filter, or reduce for better performance.',
      line: text.substring(0, match.index).split('\n').length,
    });
  }

  // Check for repeated code patterns
  const repeatedCodeRegex = /([^{}]{50,})\1/g;
  while ((match = repeatedCodeRegex.exec(text)) !== null) {
    improvements.push({
      type: 'repeated_code',
      severity: 'warning',
      message: 'Repeated code pattern detected. Consider extracting it into a reusable function.',
      line: text.substring(0, match.index).split('\n').length,
    });
  }

  const paramCountRegex = /function\s+\w+\s*\(([^)]*)\)/g;
  while ((match = paramCountRegex.exec(text)) !== null) {
    const paramCount = match[1].split(',').filter(p => p.trim() !== '').length;
    if (paramCount > 4) {
      improvements.push({
        type: 'too_many_parameters',
        severity: 'warning',
        message: `Function has ${paramCount} parameters. Consider passing an object or refactoring.`,
        line: text.substring(0, match.index).split('\n').length,
      });
    }
  }

  const promiseRegex = /=\s*[^=\n]*\([^)]*\)\s*;/g;
  while ((match = promiseRegex.exec(text)) !== null) {
    if (!/await|\.then|\.catch/.test(match[0])) {
      improvements.push({
        type: 'unhandled_promise',
        severity: 'warning',
        message: 'Possible unhandled promise. Use await or .then/.catch to handle it.',
        line: text.substring(0, match.index).split('\n').length,
      });
    }
  }

  const totalLines = text.split('\n').length;
  if (totalLines > 300) {
    improvements.push({
      type: 'large_file',
      severity: 'warning',
      message: `File is ${totalLines} lines long. Consider splitting into multiple modules.`,
      line: 1,
    });
  }

  // Add more specific checks for common issues
  // Check for large components (more than 100 lines)
  const componentRegex = /(const|function)\s+\w+\s*=\s*(?:\([^)]*\)\s*=>|function\s*\([^)]*\))\s*{([^}]*)}/g;
  while ((match = componentRegex.exec(text)) !== null) {
    const componentBody = match[2];
    const lines = componentBody.split('\n').length;
    if (lines > 100) {
      improvements.push({
        type: 'large_component',
        severity: 'warning',
        message: `Component is ${lines} lines long. Consider breaking it into smaller components for better maintainability.`,
        line: text.substring(0, match.index).split('\n').length,
      });
    }
  }

  // Check for deeply nested JSX (more than 3 levels)
  const jsxNestingRegex = /<[^>]*>[^<]*<[^>]*>[^<]*<[^>]*>[^<]*<[^>]*>/g;
  while ((match = jsxNestingRegex.exec(text)) !== null) {
    improvements.push({
      type: 'deep_nesting',
      severity: 'warning',
      message: 'Deeply nested JSX detected. Consider breaking it into smaller components for better readability.',
      line: text.substring(0, match.index).split('\n').length,
    });
  }

  // Check for inline styles
  const inlineStyleRegex = /style\s*=\s*{[^}]*}/g;
  while ((match = inlineStyleRegex.exec(text)) !== null) {
    improvements.push({
      type: 'inline_styles',
      severity: 'info',
      message: 'Inline styles detected. Consider using CSS classes or styled-components for better maintainability.',
      line: text.substring(0, match.index).split('\n').length,
    });
  }

  console.log('Found improvements:', improvements);
  return improvements;
};

const calculateMetrics = (text) => {
  const metrics = {
    functions: 0,
    complexity: 0,
    avgFunctionLength: 0,
    maxNesting: 0,
    duplication: '0%'
  };

  // Count functions
  const functionRegex = /function\s+\w+\s*\([^)]*\)\s*{([^}]*)}/g;
  let match;
  let totalFunctionLength = 0;
  let functionCount = 0;
  
  while ((match = functionRegex.exec(text)) !== null) {
    functionCount++;
    const functionBody = match[1];
    const lines = functionBody.split('\n').length;
    totalFunctionLength += lines;
  }
  
  metrics.functions = functionCount;
  metrics.avgFunctionLength = functionCount > 0 ? Math.round(totalFunctionLength / functionCount) : 0;

  // Calculate complexity (simple version based on control structures)
  const controlStructures = (text.match(/if|else|for|while|switch|case|catch/g) || []).length;
  metrics.complexity = controlStructures;

  // Calculate max nesting (simple version)
  let currentNesting = 0;
  let maxNesting = 0;
  for (let char of text) {
    if (char === '{') {
      currentNesting++;
      maxNesting = Math.max(maxNesting, currentNesting);
    } else if (char === '}') {
      currentNesting--;
    }
  }
  metrics.maxNesting = maxNesting;

  // Simple duplication detection (very basic)
  const lines = text.split('\n');
  const uniqueLines = new Set(lines);
  const duplication = ((lines.length - uniqueLines.size) / lines.length * 100).toFixed(1);
  metrics.duplication = `${duplication}%`;

  return metrics;
};

const calculateQualityScore = (metrics, lintResults, improvements) => {
  let score = 100;
  
  // Deduct points for lint issues
  const lintDeductions = {
    2: 5, // Error
    1: 2, // Warning
    0: 1  // Info
  };
  
  lintResults.forEach(result => {
    score -= lintDeductions[result.severity] || 0;
  });

  // Deduct points for improvements
  score -= improvements.length * 2;

  // Deduct points for complexity
  if (metrics.complexity > 20) {
    score -= (metrics.complexity - 20) * 0.5;
  }

  // Deduct points for long functions
  if (metrics.avgFunctionLength > 20) {
    score -= (metrics.avgFunctionLength - 20) * 0.5;
  }

  // Deduct points for deep nesting
  if (metrics.maxNesting > 3) {
    score -= (metrics.maxNesting - 3) * 2;
  }

  // Deduct points for code duplication
  const duplicationPercent = parseFloat(metrics.duplication);
  if (duplicationPercent > 10) {
    score -= (duplicationPercent - 10) * 0.5;
  }

  // Ensure score stays within 0-100
  return Math.max(0, Math.min(100, Math.round(score)));
};

const analyzeComments = (text) => {
  const comments = {
    total: 0,
    documentation: 0,
    todos: 0,
    quality: {
      good: 0,
      needsImprovement: 0,
      missing: 0
    },
    suggestions: []
  };

  // Match different types of comments
  const singleLineComments = text.match(/\/\/[^\n]*/g) || [];
  const multiLineComments = text.match(/\/\*[\s\S]*?\*\//g) || [];
  const jsDocComments = text.match(/\/\*\*[\s\S]*?\*\//g) || [];

  // Count total comments
  comments.total = singleLineComments.length + multiLineComments.length;
  comments.documentation = jsDocComments.length;
  comments.todos = (text.match(/TODO|FIXME|XXX|HACK/g) || []).length;

  // Analyze function documentation
  const functionRegex = /function\s+(\w+)\s*\([^)]*\)/g;
  let match;
  while ((match = functionRegex.exec(text)) !== null) {
    const functionName = match[1];
    const functionStart = match.index;
    const hasDoc = jsDocComments.some(doc => {
      const docEnd = text.indexOf(doc) + doc.length;
      return docEnd < functionStart && docEnd > functionStart - 100;
    });

    if (!hasDoc) {
      comments.quality.missing++;
      comments.suggestions.push({
        type: 'missing_doc',
        message: `Function '${functionName}' is missing documentation`,
        line: text.substring(0, functionStart).split('\n').length
      });
    } else {
      comments.quality.good++;
    }
  }

  // Analyze comment quality
  const qualityRegex = /\/\/\s*(?:TODO|FIXME|XXX|HACK|NOTE|BUG)/g;
  while ((match = qualityRegex.exec(text)) !== null) {
    comments.quality.needsImprovement++;
    comments.suggestions.push({
      type: 'improve_comment',
      message: 'Consider improving this comment with more details',
      line: text.substring(0, match.index).split('\n').length
    });
  }

  return comments;
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return new Response(JSON.stringify({ message: 'No file uploaded' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const text = await file.text();
    console.log('Analyzing file:', file.name);
    
    const lines = text.split('\n').length;
    const todoCount = (text.match(/TODO/g) || []).length;
    const formatted = await prettier.format(text, { parser: 'babel' });
    const results = await eslint.lintText(text);
    const fixedCode = ESLint.outputFixes(results);
    
    const lintMessages = results[0]?.messages || [];
    const improvements = analyzeCodeImprovements(text);
    const metrics = calculateMetrics(text);
    const qualityScore = calculateQualityScore(metrics, lintMessages, improvements);
    const comments = analyzeComments(text);
    
    console.log('Analysis complete. Found:', {
      lines,
      todos: todoCount,
      lintIssues: lintMessages.length,
      improvements: improvements.length,
      metrics,
      qualityScore,
      comments
    });

    const response = {
      message: `Code analysis complete! 📊`,
      stats: { 
        lines, 
        todos: todoCount,
        functions: metrics.functions,
        complexity: metrics.complexity,
        qualityScore,
        metrics: {
          avgFunctionLength: metrics.avgFunctionLength,
          maxNesting: metrics.maxNesting,
          duplication: metrics.duplication
        }
      },
      lint: lintMessages.map((m) => ({
        line: m.line,
        column: m.column,
        message: m.message,
        ruleId: m.ruleId,
        severity: m.severity,
      })),
      improvements: improvements,
      formattedCode: formatted,
      originalCode: text,
      comments: comments
    };

    console.log('Sending response with improvements:', response.improvements.length);

    return new Response(
      JSON.stringify(response),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err) {
    console.error('Error in analysis:', err);
    return new Response(
      JSON.stringify({ error: 'Error analyzing code' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
