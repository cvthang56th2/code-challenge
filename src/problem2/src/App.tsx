
import { CurrencySwapForm } from '@/components/CurrencySwapForm';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
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
    </div>
  )
}

export default App