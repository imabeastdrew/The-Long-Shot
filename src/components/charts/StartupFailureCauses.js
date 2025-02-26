import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const StartupFailureCauses = () => {
  const svgRef = useRef();
  const [selectedCause, setSelectedCause] = useState(null);
  
  const failureCausesData = [
    {
      cause: "No Product-Market Fit",
      percentage: 42,
      color: "#e74c3c",
      description: "Building products that do not address genuine market needs or solve significant problems for users.",
      examples: "Google Glass struggled to articulate a compelling consumer use case despite impressive technology.",
      prevention: "Conduct thorough market research, use customer development methodology, and test MVPs with real users before full investment."
    },
    {
      cause: "Running Out of Funding",
      percentage: 29,
      color: "#3498db",
      description: "Exhausting capital before achieving sustainable revenue or securing next funding round.",
      examples: "Quibi burned through $1.75B before shutting down due to insufficient user growth.",
      prevention: "Maintain lean operations, establish clear runways and milestones, and focus on capital-efficient growth channels."
    },
    {
      cause: "Team Issues",
      percentage: 23,
      color: "#9b59b6",
      description: "Founder conflicts, inability to attract key talent, or poor team dynamics that hinder execution.",
      examples: "Friendster's technical team couldn't scale the platform to meet demand, leading to its decline.",
      prevention: "Define clear roles and expectations, establish conflict resolution mechanisms, and invest in team building and culture."
    },
    {
      cause: "Strong Competition",
      percentage: 19,
      color: "#f39c12",
      description: "Being outmaneuvered by competitors with more resources or better execution.",
      examples: "Snapdeal in India struggled against Amazon and Flipkart's aggressive expansion.",
      prevention: "Create defensible advantages, target underserved niches initially, and develop unique value propositions beyond features."
    },
    {
      cause: "Ineffective Marketing",
      percentage: 14,
      color: "#2ecc71",
      description: "Inability to effectively reach target audience or communicate value proposition.",
      examples: "Many B2B SaaS products fail because they can't efficiently acquire customers at viable CAC ratios.",
      prevention: "Test marketing channels with small budgets, optimize based on data, and refine messaging based on customer feedback."
    },
    {
      cause: "Other Factors",
      percentage: 18,
      color: "#95a5a6",
      description: "Regulatory challenges, economic downturns, pricing strategy failures, and other miscellaneous issues.",
      examples: "TikTok faced potential bans in the US due to regulatory concerns.",
      prevention: "Maintain awareness of external factors, build scenario plans, and create adaptable business models."
    }
  ];

  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear previous rendering
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Set up dimensions
    const width = 800;
    const height = 550;
    const margin = { top: 60, right: 20, bottom: 40, left: 20 };
    const radius = Math.min(width - margin.left - margin.right, height - margin.top - margin.bottom) / 2;
    
    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto;');
    
    // Add title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "20px")
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .text("Primary Causes of Startup Failure");
    
    // Create chart group
    const g = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
    
    // Prepare pie generator
    const pie = d3.pie()
      .value(d => d.percentage)
      .sort(null); // Don't sort, keep the order
    
    // Prepare arc generators
    const arc = d3.arc()
      .innerRadius(radius * 0.5) // Create a donut chart
      .outerRadius(radius * 0.8);
    
    const hoverArc = d3.arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.85);
    
    const labelArc = d3.arc()
      .innerRadius(radius * 0.85)
      .outerRadius(radius * 0.85);
    
    // Convert data to pie format
    const pieData = pie(failureCausesData);
    
    // Create pie segments
    const segments = g.selectAll(".segment")
      .data(pieData)
      .enter()
      .append("path")
      .attr("class", "segment")
      .attr("d", arc)
      .attr("fill", d => d.data.color)
      .attr("stroke", "white")
      .attr("stroke-width", 2)
      .attr("cursor", "pointer")
      .style("opacity", 0.9);
    
    // Add labels
    const labels = g.selectAll(".label")
      .data(pieData)
      .enter()
      .append("text")
      .attr("class", "label")
      .attr("transform", d => `translate(${labelArc.centroid(d)})`)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .style("pointer-events", "none")
      .text(d => d.data.percentage + "%");
    
    // Add center text
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .attr("dy", "-0.5em")
      .text("Startup");
    
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .attr("dy", "0.9em")
      .text("Failure");
    
    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height - 50})`)
      .attr("text-anchor", "middle");
    
    const legendItems = legend.selectAll(".legend-item")
      .data(failureCausesData)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(${(i - 2.5) * 120}, 0)`);
    
    legendItems.append("rect")
      .attr("width", 12)
      .attr("height", 12)
      .attr("fill", d => d.color)
      .attr("rx", 2)
      .attr("ry", 2);
    
    legendItems.append("text")
      .attr("x", 16)
      .attr("y", 9)
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "10px")
      .attr("fill", "#555")
      .style("text-anchor", "start")
      .text(d => d.cause);
    
    // Add interactions
    segments
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", hoverArc)
          .style("opacity", 1);
          
        setSelectedCause(d.data);
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("d", arc)
          .style("opacity", 0.9);
      })
      .on("click", function(event, d) {
        setSelectedCause(d.data === selectedCause ? null : d.data);
      });
    
    // Add footnote
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-style", "italic")
      .attr("font-size", "11px")
      .attr("fill", "#999")
      .text("Source: Analysis of startup failure data from CB Insights, Failory, and Embroker (2018-2024)");
      
  }, []);
  
  return (
    <div className="w-full flex flex-col items-center">
      <svg ref={svgRef} className="w-full max-w-4xl"></svg>
      
      {selectedCause && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md border-l-4 w-full max-w-3xl" style={{ borderColor: selectedCause.color }}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold" style={{ color: selectedCause.color }}>
              {selectedCause.cause} ({selectedCause.percentage}%)
            </h3>
            <button 
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedCause(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <p className="text-gray-700 mb-3">{selectedCause.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-1">Notable Examples</h4>
              <p className="text-gray-600 text-sm">{selectedCause.examples}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-1">Prevention Strategies</h4>
              <p className="text-gray-600 text-sm">{selectedCause.prevention}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupFailureCauses; 