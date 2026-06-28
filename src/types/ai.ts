export interface AIResponse {
  text: string;
  link?: { href: string; label: string };
}

export interface AIQuestion {
  question: string;
}

export interface AIAnswer {
  answer: AIResponse;
}
