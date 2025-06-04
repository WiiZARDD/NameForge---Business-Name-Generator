import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  RefreshCw, 
  Save, 
  Globe, 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Facebook,
  TrendingUp,
  Download,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import GeneratorForm from './GeneratorForm';
import NameCard from './NameCard';
import { generateNames } from '../utils/nameGenerator';
import { checkDomainAvailability } from '../utils/domainChecker';
import { checkSocialAvailability } from '../utils/socialChecker';
import type { NameResult } from '../types';

const NameGenerator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<NameResult[]>([]);
  const [savedNames, setSavedNames] = useState<NameResult[]>([]);
  const [filterAvailableOnly, setFilterAvailableOnly] = useState(false);
  
  const handleGenerate = async (formData: any) => {
    setIsLoading(true);
    
    try {
      // Generate name ideas
      const names = generateNames(formData);
      
      // Check availability for each name
      const resultsWithAvailability = await Promise.all(
        names.map(async (name) => {
          const domainResults = await checkDomainAvailability(name);
          const socialResults = await checkSocialAvailability(name);
          
          return {
            name,
            domains: domainResults,
            social: socialResults,
            isSaved: false
          };
        })
      );
      
      setResults(resultsWithAvailability);
    } catch (error) {
      console.error('Error generating names:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleSaved = (nameResult: NameResult) => {
    if (nameResult.isSaved) {
      // Remove from saved
      setSavedNames(prev => prev.filter(saved => saved.name !== nameResult.name));
      
      // Update in results
      setResults(prev => 
        prev.map(result => 
          result.name === nameResult.name 
            ? { ...result, isSaved: false } 
            : result
        )
      );
    } else {
      // Add to saved
      const savedNameResult = { ...nameResult, isSaved: true };
      setSavedNames(prev => [...prev, savedNameResult]);
      
      // Update in results
      setResults(prev => 
        prev.map(result => 
          result.name === nameResult.name 
            ? { ...result, isSaved: true } 
            : result
        )
      );
    }
  };
  
  const downloadSaved = () => {
    const dataStr = JSON.stringify(savedNames, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = 'saved-brand-names.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  const displayedResults = filterAvailableOnly
    ? results.filter(result => {
        const hasDomainAvailable = result.domains.some(d => d.isAvailable);
        const hasSocialAvailable = Object.values(result.social).some(s => s);
        return hasDomainAvailable && hasSocialAvailable;
      })
    : results;
  
  return (
    <div className="space-y-8">
      <GeneratorForm onSubmit={handleGenerate} isLoading={isLoading} />
      
      {results.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Name Ideas ({displayedResults.length})
            </h2>
            
            <div className="flex items-center space-x-4">
              <button 
                className="btn btn-secondary flex items-center"
                onClick={() => setFilterAvailableOnly(!filterAvailableOnly)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {filterAvailableOnly ? 'Show All' : 'Available Only'}
              </button>
              
              {savedNames.length > 0 && (
                <button 
                  className="btn btn-secondary flex items-center"
                  onClick={downloadSaved}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Saved ({savedNames.length})
                </button>
              )}
            </div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {displayedResults.map((result, index) => (
              <NameCard 
                key={result.name} 
                result={result} 
                onToggleSave={() => toggleSaved(result)}
                delay={index * 0.05}
              />
            ))}
          </motion.div>
        </div>
      )}
      
      {results.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
            <Zap className="h-10 w-10 text-primary-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Ready to find your perfect brand name?</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            Fill out the form above and click "Generate Names" to get started. 
            We'll check domain and social media availability for you.
          </p>
        </div>
      )}
    </div>
  );
};

export default NameGenerator;