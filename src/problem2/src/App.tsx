
import { Problem1Solution } from '@/components/Problem1Solution';
import { Problem3Solution } from '@/components/Problem3Solution';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import './App.css';
import { Problem2Solution } from './components/Problem2Solution';

type ActiveTab = 'problem1' | 'problem2' | 'problem3';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('problem1');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'problem1':
        return <Problem1Solution />;
      case 'problem2':
        return <Problem2Solution />;
      case 'problem3':
        return <Problem3Solution />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 p-1 bg-slate-200 rounded-lg overflow-auto">
            <Button
              variant={activeTab === 'problem1' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('problem1')}
              className="px-4 py-2"
            >
              Problem 1: Sum to N
            </Button>
            <Button
              variant={activeTab === 'problem2' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('problem2')}
              className="px-4 py-2"
            >
              Problem 2: Fancy Form
            </Button>
            <Button
              variant={activeTab === 'problem3' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('problem3')}
              className="px-4 py-2"
            >
              Problem 3: Code Analysis
            </Button>
          </div>
        </div>

        {/* Active Component */}
        <div className={activeTab === 'problem2' ? 'max-w-2xl mx-auto' : ''}>
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  )
}

export default App