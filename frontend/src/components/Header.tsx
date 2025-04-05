import React, { useState } from 'react';
import { Wallet, User as UserIcon } from 'lucide-react';

export default function Header() {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');

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

  return (
    <header className="bg-white shadow-md">
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
            
            <button className="p-2 rounded-full hover:bg-gray-100">
              <UserIcon className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}