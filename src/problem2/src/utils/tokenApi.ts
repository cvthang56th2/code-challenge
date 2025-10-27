import type { Token, TokenPrice } from '../types/token';

const PRICE_API_URL = 'https://interview.switcheo.com/prices.json';
const TOKEN_ICON_BASE_URL = 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens';

// Popular tokens with their metadata
export const SUPPORTED_TOKENS: Omit<Token, 'price'>[] = [
  { symbol: 'SWTH', name: 'Switcheo Token' },
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin' },
  { symbol: 'USDC', name: 'USD Coin' },
  { symbol: 'USDT', name: 'Tether USD' },
  { symbol: 'DAI', name: 'Dai Stablecoin' },
  { symbol: 'BNB', name: 'Binance Coin' },
  { symbol: 'MATIC', name: 'Polygon' },
  { symbol: 'LINK', name: 'Chainlink' },
  { symbol: 'UNI', name: 'Uniswap' },
  { symbol: 'AAVE', name: 'Aave' },
  { symbol: 'SUSHI', name: 'SushiSwap' },
  { symbol: 'CRV', name: 'Curve DAO Token' },
  { symbol: 'COMP', name: 'Compound' },
  { symbol: 'YFI', name: 'yearn.finance' },
  { symbol: 'MKR', name: 'Maker' },
  { symbol: 'SNX', name: 'Synthetix' },
  { symbol: 'BAL', name: 'Balancer' },
  { symbol: '1INCH', name: '1inch' },
  { symbol: 'ZRX', name: '0x Protocol' },
];

let pricesCache: TokenPrice[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 60000; // 1 minute

export async function fetchTokenPrices(): Promise<TokenPrice[]> {
  const now = Date.now();
  
  // Return cached data if it's still fresh
  if (pricesCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return pricesCache;
  }

  try {
    const response = await fetch(PRICE_API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch token prices');
    }
    
    const prices: TokenPrice[] = await response.json();
    pricesCache = prices;
    cacheTimestamp = now;
    
    return prices;
  } catch (error) {
    console.error('Error fetching token prices:', error);
    throw new Error('Unable to fetch current token prices');
  }
}

export async function getTokensWithPrices(): Promise<Token[]> {
  try {
    const prices = await fetchTokenPrices();
    const priceMap = new Map<string, number>();
    
    // Get the latest price for each token
    prices.forEach(priceData => {
      const existingPrice = priceMap.get(priceData.currency);
      const currentPrice = priceData.price;
      
      if (!existingPrice || new Date(priceData.date) > new Date()) {
        priceMap.set(priceData.currency, currentPrice);
      }
    });
    
    // Filter tokens that have prices and add price data
    return SUPPORTED_TOKENS
      .filter(token => priceMap.has(token.symbol))
      .map(token => ({
        ...token,
        price: priceMap.get(token.symbol),
        iconUrl: `${TOKEN_ICON_BASE_URL}/${token.symbol}.svg`
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error getting tokens with prices:', error);
    // Return tokens without prices as fallback
    return SUPPORTED_TOKENS.map(token => ({
      ...token,
      iconUrl: `${TOKEN_ICON_BASE_URL}/${token.symbol}.svg`
    }));
  }
}

export function calculateExchangeRate(fromToken: Token, toToken: Token): number | null {
  if (!fromToken.price || !toToken.price) {
    return null;
  }
  
  return fromToken.price / toToken.price;
}

export function calculateToAmount(fromAmount: string, exchangeRate: number | null): string {
  if (!fromAmount || !exchangeRate || isNaN(Number(fromAmount))) {
    return '';
  }
  
  const result = Number(fromAmount) * exchangeRate;
  return result.toFixed(6).replace(/\.?0+$/, ''); // Remove trailing zeros
}

export function formatPrice(price: number | undefined): string {
  if (!price) return 'N/A';
  
  if (price < 0.01) {
    return `$${price.toFixed(6)}`;
  } else if (price < 1) {
    return `$${price.toFixed(4)}`;
  } else {
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
}