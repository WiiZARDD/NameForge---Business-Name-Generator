import type { SocialResult } from '../types';

// This is a simulated social media username availability checker
// In a real application, this would call various social media APIs
export const checkSocialAvailability = async (name: string): Promise<SocialResult> => {
  // For demo purposes, we're simulating API calls with random results
  // and artificial delay
  await new Promise(resolve => setTimeout(resolve, 700 + Math.random() * 1200));
  
  const platforms = ['Instagram', 'Twitter', 'Facebook', 'TikTok'];
  
  const result: SocialResult = {};
  
  platforms.forEach(platform => {
    // Simulate availability with some rules to make it realistic
    let availabilityChance = 0;
    
    // Shorter names are less likely to be available
    if (name.length <= 5) {
      availabilityChance = 0.1; // 10% chance
    } else if (name.length <= 8) {
      availabilityChance = 0.3; // 30% chance
    } else {
      availabilityChance = 0.6; // 60% chance
    }
    
    // Instagram and TikTok usernames are harder to get
    if (platform === 'Instagram' || platform === 'TikTok') {
      availabilityChance *= 0.7;
    }
    
    // Names with common words are less likely to be available
    if (/tech|app|web|cloud|digital|crypto|meta|ai|data/.test(name.toLowerCase())) {
      availabilityChance *= 0.5;
    }
    
    // Deterministic randomness based on name + platform to ensure consistent results
    const hash = hashString(name + platform);
    const isAvailable = (hash % 100) / 100 < availabilityChance;
    
    result[platform] = isAvailable;
  });
  
  return result;
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