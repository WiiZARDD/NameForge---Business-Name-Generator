import React from 'react';
import { motion } from 'framer-motion';
import { Globe, CheckCircle, XCircle, Save, Bookmark, Instagram, Twitter, Facebook } from 'lucide-react';
import type { NameResult } from '../types';

interface NameCardProps {
  result: NameResult;
  onToggleSave: () => void;
  delay: number;
}

const NameCard: React.FC<NameCardProps> = ({ result, onToggleSave, delay }) => {
  const { name, domains, social, isSaved } = result;
  
  // Calculate availability percentages
  const domainAvailableCount = domains.filter(d => d.isAvailable).length;
  const domainPercentage = Math.round((domainAvailableCount / domains.length) * 100);
  
  const socialAvailableCount = Object.values(social).filter(Boolean).length;
  const socialPercentage = Math.round((socialAvailableCount / Object.keys(social).length) * 100);
  
  // Overall availability score (weighted)
  const overallScore = Math.round((domainPercentage * 0.6) + (socialPercentage * 0.4));
  
  return (
    <motion.div 
      className="card hover:border-primary-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
    >
      <div className="p-5 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900">
            {name}
          </h3>
          <button 
            className="text-gray-400 hover:text-primary-500 transition-colors"
            onClick={onToggleSave}
          >
            {isSaved ? (
              <Bookmark className="h-5 w-5 fill-primary-500 text-primary-500" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </button>
        </div>
        
        <div className="mt-2 flex items-center">
          <div 
            className="h-2 bg-gray-200 rounded-full flex-grow"
            title={`Overall availability: ${overallScore}%`}
          >
            <div 
              className={`h-2 rounded-full ${
                overallScore > 70 
                  ? 'bg-success-500' 
                  : overallScore > 40 
                    ? 'bg-warning-500' 
                    : 'bg-error-500'
              }`}
              style={{ width: `${overallScore}%` }}
            ></div>
          </div>
          <span className="ml-2 text-sm font-medium text-gray-600">
            {overallScore}%
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
            <Globe className="h-4 w-4 mr-1" />
            Domain Availability
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {domains.map(domain => (
              <div 
                key={domain.extension} 
                className={`text-sm py-1 px-2 rounded flex items-center ${
                  domain.isAvailable 
                    ? 'bg-success-50 text-success-700' 
                    : 'bg-gray-50 text-gray-500'
                }`}
              >
                {domain.isAvailable ? (
                  <CheckCircle className="h-3.5 w-3.5 mr-1 text-success-500" />
                ) : (
                  <XCircle className="h-3.5 w-3.5 mr-1 text-gray-400" />
                )}
                {name}{domain.extension}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Social Media Availability
          </h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(social).map(([platform, isAvailable]) => (
              <div
                key={platform}
                className={`badge ${
                  isAvailable
                    ? 'badge-success'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {getSocialIcon(platform)}
                <span className="ml-1">{platform}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Helper function to get social media icons
function getSocialIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case 'instagram':
      return <Instagram className="h-3 w-3" />;
    case 'twitter':
      return <Twitter className="h-3 w-3" />;
    case 'facebook':
      return <Facebook className="h-3 w-3" />;
    default:
      return null;
  }
}

export default NameCard;