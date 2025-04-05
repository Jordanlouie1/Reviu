import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Paper } from '../types';

interface Props {
  papers: Paper[];
}

export default function TopReviewed({ papers }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Top Reviewed Papers</h2>
      
      <div className="space-y-4">
        {papers.map((paper) => (
          <div key={paper.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{paper.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{paper.abstract}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-sm font-medium">
                  {paper.reviews.length > 0
                    ? (paper.reviews.reduce((acc, rev) => acc + (rev.rating || 0), 0) / paper.reviews.length).toFixed(1)
                    : 'N/A'}
                </span>
              </div>
            </div>
            
            {paper.reviews.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Recent Reviews</span>
                </h4>
                {paper.reviews.slice(0, 2).map((review) => (
                  <div key={review.id} className="text-sm text-gray-600 bg-gray-50 rounded p-3">
                    {review.comment}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}