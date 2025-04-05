import React from 'react';
import Header from './components/Header';
import PendingReviews from './components/PendingReviews';
import TopReviewed from './components/TopReviewed';
import PaperSubmission from './components/PaperSubmission';
import { mockPapers, topReviewedPapers, mockUser } from './data/mockData';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <PendingReviews papers={mockPapers} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TopReviewed papers={topReviewedPapers} />
            <PaperSubmission user={mockUser} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;