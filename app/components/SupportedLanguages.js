export default function SupportedLanguages() {
  const getSupportedLanguages = () => [
    { ext: '.js', name: 'JavaScript' },
    { ext: '.jsx', name: 'React' },
    { ext: '.ts', name: 'TypeScript' },
    { ext: '.tsx', name: 'React TypeScript' },
    // { ext: '.py', name: 'Python' },
    // { ext: '.java', name: 'Java' },
    // { ext: '.cpp', name: 'C++' },
    // { ext: '.c', name: 'C' },
    // { ext: '.rb', name: 'Ruby' },
    // { ext: '.go', name: 'Go' },
    // { ext: '.php', name: 'PHP' },
    // { ext: '.swift', name: 'Swift' },
  ];

  return (
    <div className="mt-8 border-t border-slate-200 pt-6">
      <h3 className="text-sm font-medium text-slate-700 mb-3">
        Supported Languages
      </h3>
      <div className="flex flex-wrap gap-2">
        {getSupportedLanguages().map((lang) => (
          <span
            key={lang.ext}
            className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full"
          >
            {lang.name}
          </span>
        ))}
      </div>
    </div>
  );
} 