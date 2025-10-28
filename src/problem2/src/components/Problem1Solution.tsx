import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useCallback, useEffect, useState } from 'react';

// Import the solutions from problem1
const sum_to_n_a = function(n: number) {
  // Using mathematical formula: n * (n + 1) / 2
  return n * (n + 1) / 2;
};

const sum_to_n_b = function(n: number) {
  // Using iterative approach with for loop
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

const sum_to_n_c = function(n: number): number {
  // Using recursive approach
  if (n <= 1) {
    return n;
  }
  return n + sum_to_n_c(n - 1);
};

export const Problem1Solution = () => {
  const [inputValue, setInputValue] = useState<string>('5');
  const [results, setResults] = useState<{
    a: number;
    b: number;
    c: number;
  } | null>(null);

  const calculateResults = useCallback(() => {
    const n = parseInt(inputValue);
    if (isNaN(n)) {
      return;
    }
    
    setResults({
      a: sum_to_n_a(n),
      b: sum_to_n_b(n),
      c: sum_to_n_c(n),
    });
  }, [inputValue]);

  useEffect(() => {
    calculateResults();
  }, [calculateResults, inputValue]);

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Problem 1: Three ways to sum to N</h2>
      <div className="text-muted-foreground mb-6 space-y-2">
        <p>
          Provide 3 unique implementations of the following function in JavaScript.
        </p>
        <div className="bg-muted p-3 rounded">
          <p><strong>Input:</strong> <code>n</code> - any integer</p>
          <p className="text-sm italic">Assuming this input will always produce a result lesser than <code>Number.MAX_SAFE_INTEGER</code>.</p>
        </div>
        <div className="bg-muted p-3 rounded">
          <p><strong>Output:</strong> <code>return</code> - summation to <code>n</code>, i.e. <code>sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15</code>.</p>
        </div>
      </div>
      
      <div className="space-y-6">
        <label className="font-semibold mt-2">Enter n:</label>
        <div className="flex gap-2">
          <Input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a number"
            className="flex-1"
          />
        </div>

        {results && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Results for n = {inputValue}:</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Solution A (Mathematical Formula)</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Uses: n * (n + 1) / 2
                </p>
                <p className="text-xl font-bold text-green-600">{results.a}</p>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Solution B (Iterative)</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Uses: for loop
                </p>
                <p className="text-xl font-bold text-blue-600">{results.b}</p>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Solution C (Recursive)</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Uses: recursive function call
                </p>
                <p className="text-xl font-bold text-purple-600">{results.c}</p>
              </Card>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Implementation Details:</h3>
          
          <div className="space-y-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Solution A: Mathematical Formula</h4>
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`var sum_to_n_a = function(n) {
  // Using mathematical formula: n * (n + 1) / 2
  return n * (n + 1) / 2;
};`}
              </pre>
              <p className="text-sm text-muted-foreground mt-2">
                Time Complexity: O(1) - Most efficient, constant time
              </p>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-2">Solution B: Iterative Approach</h4>
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`var sum_to_n_b = function(n) {
  // Using iterative approach with for loop
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};`}
              </pre>
              <p className="text-sm text-muted-foreground mt-2">
                Time Complexity: O(n) - Linear time complexity
              </p>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-2">Solution C: Recursive Approach</h4>
              <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`var sum_to_n_c = function(n) {
  // Using recursive approach
  if (n <= 1) {
    return n;
  }
  return n + sum_to_n_c(n - 1);
};`}
              </pre>
              <p className="text-sm text-muted-foreground mt-2">
                Time Complexity: O(n) - Linear time, but uses call stack
              </p>
            </Card>
          </div>
        </div>
      </div>
    </Card>
  );
};