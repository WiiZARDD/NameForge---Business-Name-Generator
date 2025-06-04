import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img
              src="https://i.imgur.com/Yp4ShCs.png"
              alt="NameCraft Logo"
              className="ml-2 h-14 w-auto"
            />
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-primary-600 transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-gray-600 hover:text-primary-600 transition-colors">
              About
            </a>
          </nav>
          
          <div>
            <button className="btn btn-primary">
              Sign Up Free
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;