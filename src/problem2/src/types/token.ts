export interface Token {
  symbol: string;
  name: string;
  price?: number;
  iconUrl?: string;
}

export interface TokenPrice {
  currency: string;
  date: string;
  price: number;
}

export interface SwapFormData {
  fromToken: Token | null;
  toToken: Token | null;
  fromAmount: string;
  toAmount: string;
}

export interface SwapState {
  isLoading: boolean;
  error: string | null;
  exchangeRate: number | null;
}