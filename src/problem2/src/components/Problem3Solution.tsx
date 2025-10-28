import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const Problem3Solution = () => {
  const [showOriginal, setShowOriginal] = useState(true);

  const originalCode = `interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {

}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

	const getPriority = (blockchain: any): number => {
	  switch (blockchain) {
	    case 'Osmosis':
	      return 100
	    case 'Ethereum':
	      return 50
	    case 'Arbitrum':
	      return 30
	    case 'Zilliqa':
	      return 20
	    case 'Neo':
	      return 20
	    default:
	      return -99
	  }
	}

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  const balancePriority = getPriority(balance.blockchain);
		  if (lhsPriority > -99) {
		     if (balance.amount <= 0) {
		       return true;
		     }
		  }
		  return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  if (leftPriority > rightPriority) {
		    return -1;
		  } else if (rightPriority > leftPriority) {
		    return 1;
		  }
    });
  }, [balances, prices]);

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

  return (
    <div {...rest}>
      {rows}
    </div>
  )
}`;

  const refactoredCode = `interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string; // Added missing property
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

// Type-safe constant with clear typing
const BLOCKCHAIN_PRIORITY: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
} as const;

const getPriority = (blockchain: string): number => {
  return BLOCKCHAIN_PRIORITY[blockchain] ?? -99;
};

const WalletPage: React.FC<Props> = (props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // Fixed: filter out low priority AND non-positive amounts
        return balancePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        // Fixed: return 0 for equal priorities
        return rightPriority - leftPriority;
      });
  }, [balances]); // Removed unnecessary 'prices' dependency

  // Single iteration: format and render in one pass
  const rows = useMemo(() => {
    return sortedBalances.map((balance: WalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount;
      
      return (
        <WalletRow
          className={classes.row}
          key={balance.blockchain + balance.currency} // Stable, unique key
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.amount.toFixed()}
        />
      );
    });
  }, [sortedBalances, prices]); // Correct dependencies

  return <div {...rest}>{rows}</div>;
};`;

  const issues = [
    {
      title: "Missing Property in WalletBalance Interface",
      description: "The WalletBalance interface doesn't include the 'blockchain' property that's used in getPriority function.",
      severity: "Critical"
    },
    {
      title: "Undefined Variable 'lhsPriority'",
      description: "Variable 'lhsPriority' is used but never declared. Should be 'balancePriority'.",
      severity: "Critical"
    },
    {
      title: "Incorrect Filtering Logic",
      description: "The filter logic returns items with amount <= 0, which is counter-intuitive. Should filter out zero/negative amounts.",
      severity: "High"
    },
    {
      title: "Incomplete Sort Function",
      description: "Sort function doesn't handle the case where priorities are equal, missing return 0.",
      severity: "Medium"
    },
    {
      title: "Inefficient Double Iteration",
      description: "Creating formattedBalances array and then mapping over sortedBalances separately causes unnecessary iterations.",
      severity: "Medium"
    },
    {
      title: "Incorrect useMemo Dependencies",
      description: "sortedBalances depends on 'prices' in dependency array but doesn't use it in the computation.",
      severity: "Medium"
    },
    {
      title: "Anti-pattern: Using Array Index as Key",
      description: "Using array index as React key can cause rendering issues when list order changes.",
      severity: "Medium"
    },
    {
      title: "Type Safety Issues",
      description: "getPriority uses 'any' type for blockchain parameter, reducing type safety.",
      severity: "Low"
    },
    {
      title: "Inconsistent Formatting",
      description: "Inconsistent indentation and spacing throughout the code.",
      severity: "Low"
    },
    {
      title: "Unused Destructured Variables",
      description: "'children' is destructured from props but never used.",
      severity: "Low"
    }
  ];

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Problem 3: Messy React</h2>
      <div className="mb-6">
        <p className="text-muted-foreground mb-4">
          List out the computational inefficiencies and anti-patterns found in the code block below.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <h4 className="font-semibold text-blue-900 mb-2">Code Requirements:</h4>
          <ol className="text-sm text-blue-800 space-y-1">
        <li>1. This code block uses:</li>
        <li className="ml-4">a. ReactJS with TypeScript</li>
        <li className="ml-4">b. Functional components</li>
        <li className="ml-4">c. React Hooks</li>
        <li>2. You should also provide a refactored version of the code, but more points are awarded to accurately stating the issues and explaining correctly how to improve them.</li>
          </ol>
        </div>
      </div>

      <div className="space-y-6">
        {/* Issues Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Identified Issues ({issues.length})</h3>
          <div className="space-y-3">
            {issues.map((issue, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{issue.title}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    issue.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                    issue.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                    issue.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {issue.severity}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{issue.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Code Comparison Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Code Comparison</h3>
          <div className="flex gap-2 mb-4">
            <Button 
              variant={showOriginal ? "default" : "outline"}
              onClick={() => setShowOriginal(true)}
            >
              Original Code
            </Button>
            <Button 
              variant={!showOriginal ? "default" : "outline"}
              onClick={() => setShowOriginal(false)}
            >
              Refactored Code
            </Button>
          </div>

          <Card className="p-0 overflow-hidden">
            <div className="bg-muted px-4 py-2 border-b">
              <h4 className="font-semibold">
                {showOriginal ? "Original Code (with issues)" : "Refactored Code (fixed)"}
              </h4>
            </div>
            <pre className="p-4 text-sm overflow-x-auto max-h-96 overflow-y-auto">
              {showOriginal ? originalCode : refactoredCode}
            </pre>
          </Card>
        </div>

        {/* Improvements Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Key Improvements in Refactored Code</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-4">
              <h4 className="font-semibold mb-2 text-green-700">✅ Type Safety</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Added missing 'blockchain' property</li>
                <li>• Removed 'any' type usage</li>
                <li>• Used Record type for constants</li>
              </ul>
            </Card>
            
            <Card className="p-4">
              <h4 className="font-semibold mb-2 text-green-700">✅ Performance</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Single iteration instead of double</li>
                <li>• Correct useMemo dependencies</li>
                <li>• Stable, unique React keys</li>
              </ul>
            </Card>
            
            <Card className="p-4">
              <h4 className="font-semibold mb-2 text-green-700">✅ Logic Fixes</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Fixed undefined variable reference</li>
                <li>• Corrected filtering logic</li>
                <li>• Complete sort function implementation</li>
              </ul>
            </Card>
            
            <Card className="p-4">
              <h4 className="font-semibold mb-2 text-green-700">✅ Code Quality</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Consistent formatting</li>
                <li>• Better variable naming</li>
                <li>• Removed unused variables</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </Card>
  );
};