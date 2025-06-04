export interface DomainResult {
  extension: string;
  isAvailable: boolean;
}

export interface SocialResult {
  [platform: string]: boolean;
}

export interface NameResult {
  name: string;
  domains: DomainResult[];
  social: SocialResult;
  isSaved: boolean;
}

export interface GeneratorFormData {
  keywords: string;
  industry?: string;
  style: 'modern' | 'classic' | 'techy' | 'fun' | 'abstract';
  maxLength: number;
}