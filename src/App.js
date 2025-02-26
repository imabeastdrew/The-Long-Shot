import React from 'react';
import EnhancedStartupFunnel from './components/charts/EnhancedStartupFunnel';
import EnhancedMarketShareFramework from './components/charts/EnhancedMarketShareFramework';
import EnhancedSuccessFactorComparison from './components/charts/EnhancedSuccessFactorComparison';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>The Long Shot</h1>
        <p>Interactive charts and visualizations for startup success metrics</p>
      </header>
      <main className="App-main">
        <div className="chart-container">
          <h2 className="text-2xl font-bold mb-6">Startup Success Funnel</h2>
          <EnhancedStartupFunnel />
        </div>
        
        <div className="chart-container">
          <h2 className="text-2xl font-bold mb-6">Market Share Growth Framework</h2>
          <EnhancedMarketShareFramework />
        </div>
        
        <div className="chart-container">
          <h2 className="text-2xl font-bold mb-6">Success Factor Comparison</h2>
          <EnhancedSuccessFactorComparison />
        </div>
      </main>
      <footer className="App-footer">
        <p>© {new Date().getFullYear()} The Long Shot</p>
      </footer>
    </div>
  );
}

export default App; 