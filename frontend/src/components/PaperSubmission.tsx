import React, { useState } from 'react';
import { Upload, File, Check } from 'lucide-react';
import { User } from '../types';

interface Props {
  user: User;
}

export default function PaperSubmission({ user }: Props) {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle paper submission
    console.log('Paper submitted:', { title, abstract, tags: tags.split(',').map(t => t.trim()), file });
    setTitle('');
    setAbstract('');
    setTags('');
    setFile(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Submit a Paper</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Abstract
          </label>
          <textarea
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 h-32 resize-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="e.g., blockchain, technology, research"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Paper
          </label>
          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              id="paper-upload"
              accept=".pdf,.md,.txt"
            />
            <label
              htmlFor="paper-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              {file ? (
                <Check className="h-8 w-8 text-green-500 mb-2" />
              ) : (
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
              )}
              <span className="text-sm text-gray-600">
                {file ? file.name : "Click to upload or drag and drop"}
              </span>
              {!file && (
                <span className="text-xs text-gray-500 mt-1">
                  PDF, Markdown, or Text files
                </span>
              )}
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
        >
          Submit Paper
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Your Submissions</h3>
        <div className="space-y-3">
          {user.submissions.map((paper) => (
            <div
              key={paper.id}
              className="flex items-center space-x-3 border rounded-lg p-3"
            >
              <File className="h-5 w-5 text-gray-400" />
              <div className="flex-1">
                <h4 className="font-medium">{paper.title}</h4>
                <p className="text-sm text-gray-600">
                  Submitted on {new Date(paper.dateSubmitted).toLocaleDateString()}
                </p>
              </div>
              <span className={`text-sm px-2 py-1 rounded ${
                paper.status === 'approved'
                  ? 'bg-green-100 text-green-800'
                  : paper.status === 'reviewed'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {paper.status.charAt(0).toUpperCase() + paper.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}