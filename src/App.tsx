import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Header from './components/Header';
import NameGenerator from './components/NameGenerator';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Your Perfect Brand Name
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Generate unique brand names, instantly check domain availability, and verify social media handles
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md inline-block text-left">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    This is a demo application. Domain and social media checks are simulated.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <NameGenerator />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;