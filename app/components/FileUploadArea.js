import { UploadCloud, FileCode, Code } from 'lucide-react';

export default function FileUploadArea({ 
  file, 
  isDragging, 
  onFileChange, 
  onDragOver, 
  onDragLeave, 
  onDrop 
}) {
  return (
    <div
      className={`border-2 border-dashed rounded-xl p-8 mb-6 text-center transition-colors ${
        isDragging
          ? 'border-indigo-500 bg-indigo-50'
          : file
            ? 'border-green-500 bg-green-50'
            : 'border-slate-300 hover:border-indigo-300'
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="flex flex-col items-center justify-center">
        {!file ? (
          <>
            <UploadCloud size={48} className="text-slate-400 mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              Drag &amp; Drop Your Code File
            </h3>
            <p className="text-slate-500 mb-4">or</p>
          </>
        ) : (
          <>
            <FileCode size={48} className="text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-slate-700 mb-1">
              File Selected
            </h3>
            <p className="text-green-600 font-medium mb-2">{file.name}</p>
          </>
        )}

        <label className="cursor-pointer bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2 font-medium">
          <Code size={18} />
          {file ? 'Choose Different File' : 'Select File'}
          <input
            type="file"
            className="hidden"
            onChange={onFileChange}
            accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.rb,.go,.php,.swift"
          />
        </label>
      </div>
    </div>
  );
} 