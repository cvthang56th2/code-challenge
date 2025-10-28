import { useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import type { Token } from '@/types/token';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatPrice } from '@/utils/tokenApi';

interface TokenSelectorProps {
  tokens: Token[];
  selectedToken: Token | null;
  onTokenSelect: (token: Token) => void;
  label: string;
  placeholder?: string;
}

export function TokenSelector({
  tokens,
  selectedToken,
  onTokenSelect,
  label,
  placeholder = "Select a token"
}: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTokens = tokens.filter(token =>
    token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTokenSelect = (token: Token) => {
    onTokenSelect(token);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
      </label>
      
      <Button
        type="button"
        variant="outline"
        className="w-full justify-between h-12 text-left font-normal"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedToken ? (
          <div className="flex items-center gap-3">
            <img
              src={selectedToken.iconUrl}
              alt={selectedToken.name}
              className="w-6 h-6 rounded-full"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="flex flex-col items-start">
              <span className="font-medium">{selectedToken.symbol}</span>
              <span className="text-xs text-muted-foreground">
                {formatPrice(selectedToken.price)}
              </span>
            </div>
          </div>
        ) : (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-md shadow-md max-h-80 overflow-hidden">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search tokens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>
          
          <div className="max-h-60 overflow-auto">
            {filteredTokens.length > 0 ? (
              filteredTokens.map((token) => (
                <button
                  key={token.symbol}
                  type="button"
                  className="w-full flex items-center gap-3 p-3 hover:bg-accent hover:text-accent-foreground text-left transition-colors"
                  onClick={() => handleTokenSelect(token)}
                >
                  <img
                    src={token.iconUrl}
                    alt={token.name}
                    className="w-8 h-8 rounded-full shrink-0"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="%23E5E7EB"/><text x="16" y="20" text-anchor="middle" fill="%236B7280" font-size="12">${token.symbol.charAt(0)}</text></svg>`;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{token.symbol}</div>
                    <div className="text-sm text-muted-foreground truncate">{token.name}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-medium">{formatPrice(token.price)}</div>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No tokens found
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}