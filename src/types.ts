export interface Universe {
  name: string;
  philosophy: string;
  approach: string;
  code: string;
  language: string;
  chaosRating: number;
  tradeoffs: string;
}

export interface QuantumResponse {
  universes: Universe[];
  recommendation: string;
}
