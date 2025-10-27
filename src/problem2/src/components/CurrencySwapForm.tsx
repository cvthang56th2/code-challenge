import { useState, useEffect, useCallback } from 'react';
import { ArrowDownUp, Loader2, AlertCircle, TrendingUp } from 'lucide-react';
import type { Token, SwapFormData, SwapState } from '@/types/token';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TokenSelector } from '@/components/TokenSelector';
import { 
  getTokensWithPrices, 
  calculateExchangeRate, 
  calculateToAmount,
  formatPrice 
} from '@/utils/tokenApi';
import { cn } from '@/lib/utils';

export function CurrencySwapForm() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [formData, setFormData] = useState<SwapFormData>({
    fromToken: null,
    toToken: null,
    fromAmount: '',
    toAmount: ''
  });
  const [swapState, setSwapState] = useState<SwapState>({
    isLoading: false,
    error: null,
    exchangeRate: null
  });
  const [isLoadingTokens, setIsLoadingTokens] = useState(true);
  const [isSwapping, setIsSwapping] = useState(false);

  // Load tokens on component mount
  useEffect(() => {
    const loadTokens = async () => {
      try {
        setIsLoadingTokens(true);
        const tokensWithPrices = await getTokensWithPrices();
        setTokens(tokensWithPrices);
      } catch (error) {
        console.error('Failed to load tokens:', error);
        setSwapState(prev => ({ 
          ...prev, 
          error: 'Failed to load token data. Please refresh the page.' 
        }));
      } finally {
        setIsLoadingTokens(false);
      }
    };

    loadTokens();
  }, []);

  // Calculate exchange rate and to amount when tokens or from amount change
  const updateExchangeRate = useCallback(() => {
    if (formData.fromToken && formData.toToken) {
      const rate = calculateExchangeRate(formData.fromToken, formData.toToken);
      setSwapState(prev => ({ ...prev, exchangeRate: rate }));
      
      if (rate && formData.fromAmount) {
        const toAmount = calculateToAmount(formData.fromAmount, rate);
        setFormData(prev => ({ ...prev, toAmount }));
      } else {
        setFormData(prev => ({ ...prev, toAmount: '' }));
      }
    } else {
      setSwapState(prev => ({ ...prev, exchangeRate: null }));
      setFormData(prev => ({ ...prev, toAmount: '' }));
    }
  }, [formData.fromToken, formData.toToken, formData.fromAmount]);

  useEffect(() => {
    updateExchangeRate();
  }, [updateExchangeRate]);

  const handleFromAmountChange = (value: string) => {
    // Allow only numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFormData(prev => ({ ...prev, fromAmount: value }));
      setSwapState(prev => ({ ...prev, error: null }));
    }
  };

  const handleTokenSwap = () => {
    if (formData.fromToken && formData.toToken) {
      setFormData(prev => ({
        ...prev,
        fromToken: prev.toToken,
        toToken: prev.fromToken,
        fromAmount: prev.toAmount,
        toAmount: prev.fromAmount
      }));
    }
  };

  const validateForm = (): string | null => {
    if (!formData.fromToken) {
      return 'Please select a token to send';
    }
    if (!formData.toToken) {
      return 'Please select a token to receive';
    }
    if (!formData.fromAmount || Number(formData.fromAmount) <= 0) {
      return 'Please enter a valid amount to send';
    }
    if (!swapState.exchangeRate) {
      return 'Exchange rate unavailable for selected tokens';
    }
    return null;
  };

  const handleSwap = async () => {
    const validationError = validateForm();
    if (validationError) {
      setSwapState(prev => ({ ...prev, error: validationError }));
      return;
    }

    setIsSwapping(true);
    setSwapState(prev => ({ ...prev, error: null }));

    try {
      // Simulate API call with loading delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      alert(`Swap successful!\n${formData.fromAmount} ${formData.fromToken?.symbol} → ${formData.toAmount} ${formData.toToken?.symbol}`);
      
      // Reset form
      setFormData({
        fromToken: null,
        toToken: null,
        fromAmount: '',
        toAmount: ''
      });
    } catch {
      setSwapState(prev => ({ 
        ...prev, 
        error: 'Swap failed. Please try again.' 
      }));
    } finally {
      setIsSwapping(false);
    }
  };

  if (isLoadingTokens) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Loading tokens...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Currency Swap
        </CardTitle>
        <CardDescription>
          Exchange tokens at the best available rates
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* From Token Section */}
        <div className="space-y-4">
          <TokenSelector
            tokens={tokens}
            selectedToken={formData.fromToken}
            onTokenSelect={(token) => setFormData(prev => ({ ...prev, fromToken: token }))}
            label="From"
            placeholder="Select token to send"
          />
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Amount
            </label>
            <Input
              type="text"
              placeholder="0.00"
              value={formData.fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              className="text-lg font-semibold"
              error={!!(swapState.error && formData.fromAmount === '')}
            />
            <p className={cn(
              "text-xs text-muted-foreground mt-1",
              formData.fromToken && formData.fromAmount ? '' : 'invisible'
            )}>
              ≈ ${(Number(formData.fromAmount) * (formData.fromToken?.price || 0)).toFixed(2)} USD
            </p>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full border-2 hover:rotate-180 transition-transform duration-300"
            onClick={handleTokenSwap}
            disabled={!formData.fromToken || !formData.toToken}
          >
            <ArrowDownUp className="h-4 w-4" />
          </Button>
        </div>

        {/* To Token Section */}
        <div className="space-y-4">
          <TokenSelector
            tokens={tokens}
            selectedToken={formData.toToken}
            onTokenSelect={(token) => setFormData(prev => ({ ...prev, toToken: token }))}
            label="To"
            placeholder="Select token to receive"
          />
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Amount
            </label>
            <Input
              type="text"
              placeholder="0.00"
              value={formData.toAmount}
              readOnly
              className="text-lg font-semibold bg-muted/50"
            />
            <p className={cn(
              "text-xs text-muted-foreground mt-1",
              formData.toToken && formData.toAmount ? '' : 'invisible'
            )}>
              ≈ ${(Number(formData.toAmount) * (formData.toToken?.price || 0)).toFixed(2)} USD
            </p>
          </div>
        </div>

        {/* Exchange Rate */}
        {swapState.exchangeRate && formData.fromToken && formData.toToken && (
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="font-medium">Exchange Rate:</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              1 {formData.fromToken.symbol} = {swapState.exchangeRate.toFixed(6)} {formData.toToken.symbol}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatPrice(formData.fromToken.price)} → {formatPrice(formData.toToken.price)}
            </p>
          </div>
        )}

        {/* Error Message */}
        {swapState.error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm font-medium">{swapState.error}</span>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <Button 
          onClick={handleSwap}
          disabled={isSwapping || !!validateForm()}
          className="w-full h-12 text-lg font-semibold bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
        >
          {isSwapping ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Swapping...
            </>
          ) : (
            'Confirm Swap'
          )}
        </Button>

        {/* Additional Info */}
        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>Prices are fetched in real-time from market data</p>
          <p>Network fees may apply to the actual transaction</p>
        </div>
      </CardContent>
    </Card>
  );
}