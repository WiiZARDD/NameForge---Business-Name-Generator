import type { DomainResult } from '../types';

// This is a simulated domain availability checker
// In a real application, this would call an API like Namecheap, GoDaddy, etc.
export const checkDomainAvailability = async (name: string): Promise<DomainResult[]> => {
  // For demo purposes, we're simulating API calls with random results
  // and artificial delay
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
  
  const commonTLDs = ['.com', '.io', '.co', '.app', '.ai'];
  
  return commonTLDs.map(extension => {
    // Simulate availability with some rules to make it realistic
    // More common TLDs and shorter names are less likely to be available
    let availabilityChance = 0;
    
    // Shorter names are less likely to be available
    if (name.length <= 5) {
      availabilityChance = 0.1; // 10% chance
    } else if (name.length <= 8) {
      availabilityChance = 0.3; // 30% chance
    } else {
      availabilityChance = 0.5; // 50% chance
    }
    
    // Common TLDs are less likely to be available
    if (extension === '.com') {
      availabilityChance *= 0.5; // Reduce chance by half for .com
    } else if (extension === '.io' || extension === '.co') {
      availabilityChance *= 0.7; // Reduce chance for other popular TLDs
    }
    
    // Names with common words are less likely to be available
    if (/tech|app|web|cloud|digital|crypto|meta|ai|data/.test(name.toLowerCase())) {
      availabilityChance *= 0.6;
    }
    
    // Deterministic randomness based on name + extension to ensure consistent results
    const hash = hashString(name + extension);
    const isAvailable = (hash % 100) / 100 < availabilityChance;
    
    return {
      extension,
      isAvailable
    };
  });
};

// Simple string hash function for deterministic "randomness"
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};