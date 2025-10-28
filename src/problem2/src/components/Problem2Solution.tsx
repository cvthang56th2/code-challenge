import { CurrencySwapForm } from "./problem2/CurrencySwapForm";

export const Problem2Solution = () => {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Crypto Currency Exchange
        </h1>
        <p className="text-muted-foreground">
          Swap your tokens instantly with the best rates available
        </p>
      </div>
      
      <CurrencySwapForm />
      
      <div className="text-center mt-8 space-y-2">
        <p className="text-sm text-muted-foreground">
          Powered by real-time market data
        </p>
        <p className="text-xs text-muted-foreground">
          This is a demo interface. No actual transactions are performed.
        </p>
      </div>
    </div>
  );
};