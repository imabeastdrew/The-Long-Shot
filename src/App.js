import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EnhancedStartupFunnel from './components/charts/EnhancedStartupFunnel';
import EnhancedMarketShareFramework from './components/charts/EnhancedMarketShareFramework';
import EnhancedSuccessFactorComparison from './components/charts/EnhancedSuccessFactorComparison';
import FunnelPage from './components/pages/FunnelPage';
import FrameworkPage from './components/pages/FrameworkPage';
import FactorsPage from './components/pages/FactorsPage';
import './App.css';

function MainApp() {
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/funnel" element={<FunnelPage />} />
        <Route path="/framework" element={<FrameworkPage />} />
        <Route path="/factors" element={<FactorsPage />} />
        <Route path="/" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 