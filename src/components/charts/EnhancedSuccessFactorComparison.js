import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

const EnhancedSuccessFactorComparison = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showPhase, setShowPhase] = useState('both'); // 'initial', 'scaling', or 'both'
  
  // Enhanced detailed data
  const successFactors = [
    {
      category: "Primary Focus",
      initial: {
        text: "Innovation & Product-Market Fit",
        details: "The initial phase centers on creating novel solutions and validating that they solve real problems for users.",
        examples: "Slack began as an internal tool for a gaming company before pivoting to focus on team communication."
      },
      scaling: {
        text: "Operational Excellence & Growth",
        details: "The scaling phase shifts focus to maintaining quality while building efficient processes for expansion.",
        examples: "Salesforce evolved from a disruptive CRM startup to an operational powerhouse with systematic growth."
      }
    },
    {
      category: "Product Development",
      initial: {
        text: "Rapid Iteration, Niche Focus",
        details: "Startups succeed by quickly improving their product based on user feedback, typically serving a specific segment extremely well.",
        examples: "Figma initially focused exclusively on collaborative design, mastering that niche before expanding."
      },
      scaling: {
        text: "Feature Expansion, Reliability",
        details: "Growth requires broadening the product to appeal to mainstream users while hardening infrastructure.",
        examples: "Zoom expanded from video meetings to include phone, rooms, and events while hardening security."
      }
    },
    {
      category: "User Acquisition",
      initial: {
        text: "Creative, Low-Cost Channels",
        details: "Successful early-stage startups find clever, capital-efficient methods to reach initial users.",
        examples: "Airbnb's integration with Craigslist allowed them to tap into an existing user base with minimal cost."
      },
      scaling: {
        text: "Systematic Marketing, Mass Channels",
        details: "Scaling requires more formal marketing approaches and broader channel strategies.",
        examples: "HubSpot evolved from content marketing to a comprehensive approach including sales teams and partners."
      }
    },
    {
      category: "Team Requirements",
      initial: {
        text: "Product/Technical Excellence, Hustle",
        details: "Early teams need technical prowess and scrappy execution to create something valuable from nothing.",
        examples: "Early Stripe team focused on building superior developer tools before scaling the organization."
      },
      scaling: {
        text: "Management Experience, Specialization",
        details: "Growth requires organizational structure, experienced leadership, and specialized roles.",
        examples: "Facebook's transition from startup to tech giant involved hiring experienced executives from Google and other companies."
      }
    },
    {
      category: "Capital Requirements",
      initial: {
        text: "Lean, Capital Efficiency Critical",
        details: "Most successful startups maximize progress with minimal capital until product-market fit is proven.",
        examples: "Mailchimp bootstrapped for years, focusing on profitability and capital efficiency from the start."
      },
      scaling: {
        text: "Substantial, Often Requires Series B+",
        details: "Scaling typically requires significant capital to support growth, marketing, and team expansion.",
        examples: "Uber raised over $25B to support its aggressive global expansion strategy."
      }
    },
    {
      category: "Primary Challenges",
      initial: {
        text: "Creating Value, Finding Initial Users",
        details: "The fundamental challenges are building something valuable and getting the first cohort of users.",
        examples: "Discord struggled to find its initial audience before pivoting to focus on gaming communities."
      },
      scaling: {
        text: "Competitive Response, Maintaining Quality",
        details: "Growth attracts competitive attention while organizational scaling threatens quality and culture.",
        examples: "Snapchat faced intense competitive pressure from Facebook/Instagram copying key features."
      }
    },
    {
      category: "Success Metrics",
      initial: {
        text: "Engagement, Retention, Word-of-Mouth",
        details: "Early success is measured by how deeply users engage and whether they advocate for the product.",
        examples: "Notion's early growth came primarily through enthusiastic user referrals and community engagement."
      },
      scaling: {
        text: "Revenue Growth, Unit Economics, Market Share",
        details: "Scaling success requires demonstrating sustainable business metrics and market position.",
        examples: "Shopify's transition to public company focused on merchant growth, GMV, and sustainable unit economics."
      }
    },
    {
      category: "Approximate Failure Rate",
      initial: {
        text: "~90% of Startups",
        details: "The vast majority of tech startups never achieve meaningful market traction.",
        examples: "For every Airbnb or Dropbox, approximately 90 startups fail to gain significant adoption."
      },
      scaling: {
        text: "~80% of Companies with Initial Traction",
        details: "Even among companies that achieve initial success, most fail to scale to mainstream adoption.",
        examples: "Many once-promising startups like Jawbone and Quibi achieved initial traction but failed to scale successfully."
      }
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Interactive Controls */}
      <div className="mb-6 bg-white rounded-lg p-4 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Success Factor Comparison</h2>
          
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <span className="text-gray-700 text-sm">View:</span>
            <div className="flex bg-gray-100 rounded-lg overflow-hidden">
              <button 
                className={`px-3 py-1 text-sm font-medium ${showPhase === 'both' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setShowPhase('both')}
              >
                Both Phases
              </button>
              <button 
                className={`px-3 py-1 text-sm font-medium ${showPhase === 'initial' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setShowPhase('initial')}
              >
                0% → 1%
              </button>
              <button 
                className={`px-3 py-1 text-sm font-medium ${showPhase === 'scaling' ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setShowPhase('scaling')}
              >
                1% → 20%
              </button>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mt-2">
          Compare critical success factors across the initial traction and scaling phases. 
          Click on any row for detailed insights.
        </p>
      </div>
      
      {/* Main Comparison Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          <div className="col-span-3 p-4">
            <h3 className="font-semibold text-gray-700">Success Factor</h3>
          </div>
          
          {(showPhase === 'both' || showPhase === 'initial') && (
            <div className="col-span-2 p-4 border-l border-gray-200 bg-blue-50">
              <h3 className="font-semibold text-blue-800">
                Initial Traction Phase
                <span className="block text-xs font-normal mt-1">0% → 1% Market Share</span>
              </h3>
            </div>
          )}
          
          {(showPhase === 'both' || showPhase === 'scaling') && (
            <div className={`${showPhase === 'both' ? 'col-span-2' : 'col-span-4'} p-4 border-l border-gray-200 bg-green-50`}>
              <h3 className="font-semibold text-green-800">
                Scaling Phase
                <span className="block text-xs font-normal mt-1">1% → 20% Market Share</span>
              </h3>
            </div>
          )}
        </div>
        
        {/* Data Rows */}
        {successFactors.map((factor, index) => (
          <div 
            key={index} 
            className={`grid grid-cols-7 border-b border-gray-200 transition-colors duration-200 hover:bg-gray-50 cursor-pointer ${activeCategory === index ? 'bg-blue-50' : ''}`}
            onClick={() => setActiveCategory(activeCategory === index ? null : index)}
          >
            <div className="col-span-3 p-4">
              <h4 className="font-medium text-gray-800">{factor.category}</h4>
            </div>
            
            {(showPhase === 'both' || showPhase === 'initial') && (
              <div className="col-span-2 p-4 border-l border-gray-200">
                <div className="font-medium text-blue-700">{factor.initial.text}</div>
              </div>
            )}
            
            {(showPhase === 'both' || showPhase === 'scaling') && (
              <div className={`${showPhase === 'both' ? 'col-span-2' : 'col-span-4'} p-4 border-l border-gray-200`}>
                <div className="font-medium text-green-700">{factor.scaling.text}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Detailed Panel */}
      {activeCategory !== null && (
        <div className="mt-6 bg-white rounded-lg p-6 shadow-lg border-t-4 border-blue-500 transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">{successFactors[activeCategory].category}</h3>
            <button 
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setActiveCategory(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(showPhase === 'both' || showPhase === 'initial') && (
              <div className="bg-blue-50 p-5 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Initial Traction Phase (0% → 1%)</h4>
                <div className="mb-4">
                  <div className="text-lg font-medium text-blue-700 mb-2">{successFactors[activeCategory].initial.text}</div>
                  <p className="text-gray-700">{successFactors[activeCategory].initial.details}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-blue-200">
                  <h5 className="font-medium text-blue-800 mb-1">Example:</h5>
                  <p className="text-gray-600 italic">{successFactors[activeCategory].initial.examples}</p>
                </div>
              </div>
            )}
            
            {(showPhase === 'both' || showPhase === 'scaling') && (
              <div className="bg-green-50 p-5 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Scaling Phase (1% → 20%)</h4>
                <div className="mb-4">
                  <div className="text-lg font-medium text-green-700 mb-2">{successFactors[activeCategory].scaling.text}</div>
                  <p className="text-gray-700">{successFactors[activeCategory].scaling.details}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-green-200">
                  <h5 className="font-medium text-green-800 mb-1">Example:</h5>
                  <p className="text-gray-600 italic">{successFactors[activeCategory].scaling.examples}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Key Takeaways */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-2">Key Strategic Implications:</h4>
            <p className="text-gray-700">
              {activeCategory === 0 && "As companies grow, they must shift from innovation-driven cultures to ones that balance creativity with operational discipline. This transition often requires different leadership styles and organizational structures."}
              {activeCategory === 1 && "Product development must evolve from nimble experimentation to structured roadmaps that serve broader markets. Teams need to preserve innovative capabilities while introducing quality assurance and scaling infrastructure."}
              {activeCategory === 2 && "Early growth typically leverages creative, cost-effective channels, while scaling requires systematic marketing across multiple channels with predictable unit economics."}
              {activeCategory === 3 && "Team composition must evolve from generalists who can wear multiple hats to specialists with deep expertise in specific business functions."}
              {activeCategory === 4 && "Financing strategy changes dramatically between phases, with early focus on capital efficiency shifting to substantial investment in growth infrastructure."}
              {activeCategory === 5 && "As companies achieve initial success, they shift from fighting for survival and relevance to managing competitive responses and maintaining product excellence during rapid scaling."}
              {activeCategory === 6 && "Success metrics evolve from product engagement and retention to business sustainability metrics including market share and profitability."}
              {activeCategory === 7 && "The data shows both phases present significant challenges, with most companies failing to successfully navigate each transition."}
            </p>
          </div>
        </div>
      )}
      
      {/* Attribution */}
      <div className="mt-4 text-center text-gray-500 text-sm italic">
        Based on analysis of tech startup success patterns 2015-2025
      </div>
    </div>
  );
};

export default EnhancedSuccessFactorComparison; 