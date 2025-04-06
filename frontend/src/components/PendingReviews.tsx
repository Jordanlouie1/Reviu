import React, { useState } from 'react';
import { FileText, X } from 'lucide-react';
import { Paper } from '../types';
import { useWeb3 } from "./eth_utils/Web3Context";

export default function PendingReviews({ }) {
  const { papers } = useWeb3();
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [review, setReview] = useState('');

  const handleSubmitReview = () => {
    // Handle review submission
    console.log('Review submitted:', { paperId: selectedPaper?.id, review });
    setSelectedPaper(null);
    setReview('');
  };
  

  const handleDonwloadPaper = () => {
    if (!selectedPaper) return;
  
    // Construct the file path or URL
    const pdfUrl = `/user-papers/${selectedPaper.id}.pdf`; // adjust this path to your setup
  
    // Open the PDF in a new tab
    window.open(pdfUrl, '_blank');
  
    // Optionally log and reset
    console.log('Review submitted:', { paperId: selectedPaper.id, review });
    setSelectedPaper(null);
    setReview('');
  };





  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Pending Reviews</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {papers.map((paper) => (
          <div
            key={paper.id}
            onClick={() => setSelectedPaper(paper)}
            className="border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors"
          >
            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <h3 className="font-medium">{paper.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{paper.abstract}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {paper.tags}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPaper && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex">
            <div className="flex-1 p-6 overflow-auto border-r">
              <h2 className="text-xl font-semibold mb-4">{selectedPaper.title}</h2>
              <p className="text-gray-600 mb-4">{selectedPaper.abstract}</p>
              <div className="prose">{selectedPaper.content}</div>
            </div>
            
            <div className="w-96 p-6 flex flex-col">
              <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleDonwloadPaper}
                className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
              >
                Download Paper
              </button>
                <h3 className="text-lg font-medium">Write Review</h3>
                <button
                  onClick={() => setSelectedPaper(null)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Enter your review..."
                className="flex-1 border rounded-lg p-3 resize-none mb-4"
              />
              
              <button
                onClick={handleSubmitReview}
                className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}