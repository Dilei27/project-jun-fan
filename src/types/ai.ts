import type { SearchResult } from '@/lib/search';

export interface AIResponse {
  text: string;
  sources: SearchResult[];
}

export interface AIQuestion {
  question: string;
}

export interface AIAnswer {
  answer: AIResponse;
}
