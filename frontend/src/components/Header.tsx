import React, { useState } from 'react';
import { Wallet, User as UserIcon } from 'lucide-react';

export default function Header() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [textInput, setTextInput] = useState('');

  const userData = {
    reviewerScore: 87,
    submissionScore: 92,
    adjustedRank: 15,
    referralCode: 'REF123XYZ'
  };

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAddress(accounts[0]);
        setConnected(true);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleSubmitInput = () => {
    console.log('Submitted input:', textInput);
    setTextInput('');
  };

  return (
    <header className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">PeerReview</h1>

          <div className="flex items-center space-x-4">
            {connected ? (
              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-4 py-2">
                <Wallet className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">
                  {`${address.slice(0, 6)}...${address.slice(-4)}`}
                </span>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="flex items-center space-x-2 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
              >
                <Wallet className="h-5 w-5" />
                <span>Connect Wallet</span>
              </button>
            )}

            <button onClick={toggleProfile} className="p-2 rounded-full hover:bg-gray-100">
              <UserIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Pane */}
      {isProfileOpen && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl border-l border-gray-200 p-6 z-50 transition-all">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Annonymous User</h2>
            <button onClick={toggleProfile} className="text-gray-500 hover:text-gray-800 text-xl">
              &times;
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-600">Reviewer Score</h3>
              <p className="text-lg font-medium">{userData.reviewerScore}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-600">Submission Score</h3>
              <p className="text-lg font-medium">{userData.submissionScore}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-600">Adjusted Rank</h3>
              <p className="text-lg font-medium">#{userData.adjustedRank}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-600">Referral Code</h3>
              <p className="text-lg font-medium">{userData.referralCode}</p>
            </div>

            {/* Input Field */}
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm text-gray-600 mb-1">Contract Address</h3>
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type something..."
              />
              <button
                onClick={handleSubmitInput}
                className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}