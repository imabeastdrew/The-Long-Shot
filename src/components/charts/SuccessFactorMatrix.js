import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const SuccessFactorMatrix = () => {
  const svgRef = useRef();
  const [selectedPhase, setSelectedPhase] = useState("both");
  const [selectedFactor, setSelectedFactor] = useState(null);
  
  const factorsData = [
    {
      factor: "Product Innovation",
      earlyPhase: 85,
      scalingPhase: 60,
      earlyDescription: "Developing novel solutions that solve real problems in significantly better ways than existing alternatives.",
      scalingDescription: "Continuously improving product with new features and capabilities to maintain differentiation in a competitive landscape.",
      examples: "Slack's communication platform, Airbnb's shared accommodations model, Stripe's developer-friendly payments API."
    },
    {
      factor: "Market Timing",
      earlyPhase: 75,
      scalingPhase: 50,
      earlyDescription: "Launching when market conditions, technology foundations, and customer needs align.",
      scalingDescription: "Adapting to evolving market dynamics to maintain momentum as adoption increases.",
      examples: "Zoom was positioned for the remote work surge, Netflix timed streaming perfectly with broadband adoption, Uber launched when smartphones became ubiquitous."
    },
    {
      factor: "User Experience",
      earlyPhase: 80,
      scalingPhase: 70,
      earlyDescription: "Creating intuitive, frictionless experiences that drive initial adoption and positive word-of-mouth.",
      scalingDescription: "Maintaining quality and reliability while serving diverse user segments with different needs.",
      examples: "Apple's obsessive focus on UX, Robinhood's simplified investing interface, TikTok's algorithm-driven content feed."
    },
    {
      factor: "Distribution Strategy",
      earlyPhase: 65,
      scalingPhase: 85,
      earlyDescription: "Finding efficient customer acquisition channels that reach early adopters.",
      scalingDescription: "Building scalable, multi-channel distribution systems to reach mainstream customers cost-effectively.",
      examples: "Zoom's freemium model, Shopify's app marketplace, Salesforce's partnership ecosystem."
    },
    {
      factor: "Capital Efficiency",
      earlyPhase: 60,
      scalingPhase: 75,
      earlyDescription: "Maximizing runway through lean operations and capital-efficient growth.",
      scalingDescription: "Scaling operations while maintaining sustainable unit economics and clear path to profitability.",
      examples: "Mailchimp bootstrapped to $700M annual revenue, GitLab's remote-first model, Atlassian's minimal sales approach."
    },
    {
      factor: "Team Capabilities",
      earlyPhase: 70,
      scalingPhase: 80,
      earlyDescription: "Small, agile founding team with complementary skills and product vision.",
      scalingDescription: "Building experienced executive team and organization structure to manage complexity and growth.",
      examples: "LinkedIn's founder-to-CEO transition, Spotify's squad organizational model, Microsoft's leadership evolution."
    },
    {
      factor: "Network Effects",
      earlyPhase: 40,
      scalingPhase: 90,
      earlyDescription: "Designing mechanics that increase product value as more users join, even with small initial user base.",
      scalingDescription: "Leveraging network effects to create increasingly powerful competitive moats and value for users.",
      examples: "Facebook's social graph, Uber's driver/rider marketplace, GitHub's collaborative developer community."
    }
  ];
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear previous rendering
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Set up dimensions
    const width = 900;
    const height = 600;
    const margin = { top: 70, right: 120, bottom: 80, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto;');
    
    // Add background
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#f8f9fa");
    
    // Title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "20px")
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .text("Success Factor Matrix: Initial Traction vs. Scaling Phase");
    
    // Create chart group
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // Define scales
    const xScale = d3.scaleBand()
      .domain(factorsData.map(d => d.factor))
      .range([0, innerWidth])
      .padding(0.2);
    
    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([innerHeight, 0]);
    
    // Add X axis
    g.append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "12px");
    
    // Add Y axis
    g.append("g")
      .call(d3.axisLeft(yScale).tickFormat(d => d + "%"))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", innerWidth)
        .attr("stroke-opacity", 0.1)
      );
    
    // Y axis label
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -60)
      .attr("x", -innerHeight / 2)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "14px")
      .attr("fill", "#666")
      .text("Importance Rating (%)");
    
    // Add phase toggle buttons
    const buttons = svg.append("g")
      .attr("transform", `translate(${width - margin.right - 270}, 45)`);
    
    const buttonWidth = 90;
    const buttonHeight = 25;
    const buttonPadding = 5;
    
    const buttonData = [
      { label: "Both Phases", value: "both" },
      { label: "0% to 1%", value: "early" },
      { label: "1% to 20%", value: "scaling" }
    ];
    
    buttonData.forEach((button, i) => {
      const isSelected = selectedPhase === button.value;
      
      buttons.append("rect")
        .attr("x", i * (buttonWidth + buttonPadding))
        .attr("y", 0)
        .attr("width", buttonWidth)
        .attr("height", buttonHeight)
        .attr("rx", 4)
        .attr("fill", isSelected ? "#4a90e2" : "#e0e0e0")
        .attr("stroke", isSelected ? "#3a70b2" : "#ccc")
        .attr("cursor", "pointer")
        .on("click", () => {
          setSelectedPhase(button.value);
        });
      
      buttons.append("text")
        .attr("x", i * (buttonWidth + buttonPadding) + buttonWidth / 2)
        .attr("y", buttonHeight / 2 + 5)
        .attr("text-anchor", "middle")
        .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
        .attr("font-size", "12px")
        .attr("fill", isSelected ? "white" : "#444")
        .attr("pointer-events", "none")
        .text(button.label);
    });
    
    // Add bars based on selected phase
    factorsData.forEach(factor => {
      const xPos = xScale(factor.factor);
      const barWidth = xScale.bandwidth() / (selectedPhase === "both" ? 2.5 : 1.2);
      
      if (selectedPhase === "early" || selectedPhase === "both") {
        const earlyBarX = selectedPhase === "both" ? xPos + xScale.bandwidth() * 0.05 : xPos;
        
        g.append("rect")
          .attr("x", earlyBarX)
          .attr("y", yScale(factor.earlyPhase))
          .attr("width", barWidth)
          .attr("height", innerHeight - yScale(factor.earlyPhase))
          .attr("fill", selectedFactor === factor.factor ? "#4a90e2" : "#6baed6")
          .attr("stroke", "#fff")
          .attr("stroke-width", 1)
          .attr("opacity", selectedFactor ? (selectedFactor === factor.factor ? 1 : 0.5) : 0.8)
          .attr("cursor", "pointer")
          .on("click", () => {
            setSelectedFactor(selectedFactor === factor.factor ? null : factor.factor);
          });
        
        if (selectedPhase === "both") {
          g.append("text")
            .attr("x", earlyBarX + barWidth / 2)
            .attr("y", yScale(factor.earlyPhase) - 5)
            .attr("text-anchor", "middle")
            .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "#444")
            .text(factor.earlyPhase + "%");
        }
      }
      
      if (selectedPhase === "scaling" || selectedPhase === "both") {
        const scalingBarX = selectedPhase === "both" ? xPos + xScale.bandwidth() * 0.55 : xPos;
        
        g.append("rect")
          .attr("x", scalingBarX)
          .attr("y", yScale(factor.scalingPhase))
          .attr("width", barWidth)
          .attr("height", innerHeight - yScale(factor.scalingPhase))
          .attr("fill", selectedFactor === factor.factor ? "#fd8d3c" : "#fdae6b")
          .attr("stroke", "#fff")
          .attr("stroke-width", 1)
          .attr("opacity", selectedFactor ? (selectedFactor === factor.factor ? 1 : 0.5) : 0.8)
          .attr("cursor", "pointer")
          .on("click", () => {
            setSelectedFactor(selectedFactor === factor.factor ? null : factor.factor);
          });
        
        if (selectedPhase === "both") {
          g.append("text")
            .attr("x", scalingBarX + barWidth / 2)
            .attr("y", yScale(factor.scalingPhase) - 5)
            .attr("text-anchor", "middle")
            .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
            .attr("font-size", "11px")
            .attr("fill", "#444")
            .text(factor.scalingPhase + "%");
        }
      }
      
      if (selectedPhase !== "both") {
        const value = selectedPhase === "early" ? factor.earlyPhase : factor.scalingPhase;
        
        g.append("text")
          .attr("x", xPos + xScale.bandwidth() / 2)
          .attr("y", yScale(value) - 5)
          .attr("text-anchor", "middle")
          .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
          .attr("font-size", "12px")
          .attr("fill", "#444")
          .text(value + "%");
      }
    });
    
    // Add legend if showing both phases
    if (selectedPhase === "both") {
      const legend = svg.append("g")
        .attr("transform", `translate(${width - margin.right - 180}, ${margin.top})`);
      
      legend.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", "#6baed6");
      
      legend.append("text")
        .attr("x", 25)
        .attr("y", 12)
        .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
        .attr("font-size", "12px")
        .attr("fill", "#444")
        .text("Initial Traction (0% to 1%)");
      
      legend.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("y", 25)
        .attr("fill", "#fdae6b");
      
      legend.append("text")
        .attr("x", 25)
        .attr("y", 37)
        .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
        .attr("font-size", "12px")
        .attr("fill", "#444")
        .text("Scaling Phase (1% to 20%)");
    }
    
    // Add footnote
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 15)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-style", "italic")
      .attr("font-size", "11px")
      .attr("fill", "#777")
      .text("Source: Analysis of successful technology companies' growth patterns and founder interviews (2015-2024)");
  }, [selectedPhase, selectedFactor]);

  return (
    <div className="w-full flex flex-col items-center">
      <svg ref={svgRef} className="w-full max-w-4xl"></svg>
      
      {selectedFactor && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md w-full max-w-3xl">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-gray-800">
              {selectedFactor}
            </h3>
            <button 
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedFactor(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Initial Traction Phase (0% to 1%)</h4>
              <p className="text-gray-600 text-sm">{factorsData.find(f => f.factor === selectedFactor)?.earlyDescription}</p>
              <div className="flex justify-between items-center mt-2">
                <div className="text-xs text-gray-500">Importance Rating:</div>
                <div className="font-bold text-blue-600">{factorsData.find(f => f.factor === selectedFactor)?.earlyPhase}%</div>
              </div>
            </div>
            
            <div className="bg-orange-50 p-3 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Scaling Phase (1% to 20%)</h4>
              <p className="text-gray-600 text-sm">{factorsData.find(f => f.factor === selectedFactor)?.scalingDescription}</p>
              <div className="flex justify-between items-center mt-2">
                <div className="text-xs text-gray-500">Importance Rating:</div>
                <div className="font-bold text-orange-600">{factorsData.find(f => f.factor === selectedFactor)?.scalingPhase}%</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Notable Examples</h4>
            <p className="text-gray-600 text-sm">{factorsData.find(f => f.factor === selectedFactor)?.examples}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessFactorMatrix; 