import type { GeneratorFormData } from '../types';

// Prefixes and suffixes for different name styles
const prefixes = {
  modern: ['nova', 'neo', 'pulse', 'flux', 'peak', 'echo', 'arc', 'orbit', 'wave', 'zoom'],
  classic: ['royal', 'crown', 'heritage', 'legacy', 'prime', 'elite', 'noble', 'grand', 'monarch', 'capital'],
  techy: ['tech', 'byte', 'algo', 'data', 'cyber', 'pixel', 'net', 'web', 'code', 'sync'],
  fun: ['zesty', 'quirky', 'funky', 'jolly', 'dizzy', 'zippy', 'bouncy', 'happy', 'sunny', 'jazzy'],
  abstract: ['aura', 'eon', 'zeta', 'axiom', 'nova', 'nebula', 'quanta', 'vertex', 'zen', 'echo']
};

const suffixes = {
  modern: ['ify', 'io', 'ly', 'ably', 'now', 'up', 'hub', 'lab', 'ai', 'ness'],
  classic: ['co', 'inc', 'group', 'global', 'int', 'partners', 'trust', 'craft', 'works', 'guild'],
  techy: ['ify', 'io', 'ly', 'tech', 'bit', 'byte', 'ware', 'app', 'cloud', 'labs'],
  fun: ['pop', 'jam', 'buzz', 'boom', 'zone', 'spot', 'vibe', 'blast', 'dash', 'twist'],
  abstract: ['ium', 'ara', 'eos', 'yze', 'ovo', 'ism', 'ix', 'ius', 'eon', 'ium']
};

// Function to generate random names
export const generateNames = (formData: GeneratorFormData): string[] => {
  const { keywords, industry, style, maxLength } = formData;
  
  // Parse keywords into an array
  const keywordList = keywords
    .toLowerCase()
    .split(/[\s,]+/)
    .filter(k => k.length >= 3)
    .map(k => k.trim());
  
  // If no valid keywords, use some defaults
  if (keywordList.length === 0) {
    keywordList.push('brand', 'good', 'pro');
  }
  
  // Add industry to keywords if provided
  if (industry && industry.trim()) {
    keywordList.push(industry.toLowerCase().trim());
  }
  
  const results: string[] = [];
  const usedNames = new Set<string>();
  
  // Generate 20 unique names
  while (results.length < 12) {
    let name = '';
    
    // Different name generation strategies
    const strategy = Math.floor(Math.random() * 5);
    
    switch (strategy) {
      case 0: // Prefix + keyword
        {
          const prefix = prefixes[style][Math.floor(Math.random() * prefixes[style].length)];
          const keyword = keywordList[Math.floor(Math.random() * keywordList.length)];
          name = prefix + keyword;
        }
        break;
      
      case 1: // Keyword + suffix
        {
          const keyword = keywordList[Math.floor(Math.random() * keywordList.length)];
          const suffix = suffixes[style][Math.floor(Math.random() * suffixes[style].length)];
          name = keyword + suffix;
        }
        break;
      
      case 2: // Combined keywords
        {
          const keyword1 = keywordList[Math.floor(Math.random() * keywordList.length)];
          const keyword2 = keywordList[Math.floor(Math.random() * keywordList.length)];
          if (keyword1 !== keyword2) {
            name = keyword1.substring(0, Math.min(keyword1.length, 5)) + 
                   keyword2.substring(0, Math.min(keyword2.length, 5));
          } else {
            name = keyword1 + suffixes[style][Math.floor(Math.random() * suffixes[style].length)];
          }
        }
        break;
      
      case 3: // Modified keyword
        {
          const keyword = keywordList[Math.floor(Math.random() * keywordList.length)];
          // Replace vowels or add letter
          if (Math.random() > 0.5 && keyword.length > 3) {
            const vowels = ['a', 'e', 'i', 'o', 'u'];
            const replacements = ['a', 'e', 'i', 'o', 'u', 'y'];
            let modified = keyword;
            
            // Find a vowel to replace
            for (let i = 0; i < modified.length; i++) {
              if (vowels.includes(modified[i]) && Math.random() > 0.5) {
                const replacement = replacements[Math.floor(Math.random() * replacements.length)];
                modified = modified.substring(0, i) + replacement + modified.substring(i + 1);
                break;
              }
            }
            
            name = modified;
          } else {
            // Add a letter
            const extraLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
            const position = Math.floor(Math.random() * (keyword.length + 1));
            name = keyword.substring(0, position) + extraLetter + keyword.substring(position);
          }
        }
        break;
      
      case 4: // Prefix + suffix
        {
          const prefix = prefixes[style][Math.floor(Math.random() * prefixes[style].length)];
          const suffix = suffixes[style][Math.floor(Math.random() * suffixes[style].length)];
          name = prefix + suffix;
        }
        break;
    }
    
    // Ensure the name meets length requirements and is unique
    if (name.length <= maxLength && !usedNames.has(name.toLowerCase())) {
      // Capitalize first letter
      name = name.charAt(0).toUpperCase() + name.slice(1);
      results.push(name);
      usedNames.add(name.toLowerCase());
    }
  }
  
  return results;
};