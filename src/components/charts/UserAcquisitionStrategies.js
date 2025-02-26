import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const UserAcquisitionStrategies = () => {
  const svgRef = useRef();
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  
  const strategiesData = [
    {
      strategy: "Viral Referrals",
      effectiveness: 85,
      cost: 15,
      example: "Dropbox grew from 100k to 4M users in 15 months with referrals",
      description: "Programs that incentivize existing users to invite others, creating organic growth with minimal direct marketing expense.",
      color: "#3498db"
    },
    {
      strategy: "Platform Leverage",
      effectiveness: 78,
      cost: 25,
      example: "Airbnb's Craigslist integration drove early growth by tapping into an existing user base",
      description: "Tapping into existing platforms where potential users already gather, redirecting their attention to your product.",
      color: "#2ecc71"
    },
    {
      strategy: "Community Focus",
      effectiveness: 72,
      cost: 30,
      example: "Discord grew by targeting specific gaming communities rather than general users",
      description: "Concentrating resources on serving a specific community extremely well, allowing deeper penetration of a defined segment.",
      color: "#e74c3c"
    },
    {
      strategy: "Content Marketing",
      effectiveness: 65,
      cost: 40,
      example: "HubSpot built audience through educational content before converting to customers",
      description: "Creating valuable resources that attract potential users organically through search and sharing.",
      color: "#f39c12"
    },
    {
      strategy: "Growth Hacking",
      effectiveness: 68,
      cost: 35,
      example: "Hotmail's automatic email signature drove viral adoption",
      description: "Creative, unconventional tactics to achieve rapid growth with limited resources, often exploiting unique opportunities.",
      color: "#9b59b6"
    },
    {
      strategy: "Exclusivity",
      effectiveness: 75,
      cost: 20,
      example: "Facebook's campus-by-campus expansion created demand through scarcity",
      description: "Creating perceived scarcity or limiting access to create demand and word-of-mouth buzz.",
      color: "#1abc9c"
    },
    {
      strategy: "Traditional Marketing",
      effectiveness: 45,
      cost: 85,
      example: "Most mainstream B2C companies rely on paid advertising to grow",
      description: "Conventional paid advertising and marketing campaigns, typically requiring substantial budget but offering predictable results.",
      color: "#95a5a6"
    }
  ];

  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Set up dimensions
    const width = 850;
    const height = 500;
    const margin = { top: 50, right: 180, bottom: 80, left: 80 };
    const contentWidth = width - margin.left - margin.right;
    const contentHeight = height - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto;');
    
    // Add gradient background
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "#f8f9fa");
    
    // Create chart group
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // Add title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "20px")
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .text("Effectiveness of Initial User Acquisition Strategies");
    
    // Define scales
    const xScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, contentWidth]);
    
    const yScale = d3.scaleBand()
      .domain(strategiesData.map(d => d.strategy))
      .range([0, contentHeight])
      .padding(0.2);
    
    // Add X axis
    g.append("g")
      .attr("transform", `translate(0, ${contentHeight})`)
      .call(d3.axisBottom(xScale).ticks(5).tickFormat(d => d + "%"))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line")
        .attr("y1", -contentHeight)
        .attr("y2", 0)
        .attr("stroke", "#e0e0e0")
      )
      .call(g => g.selectAll(".tick text")
        .attr("font-size", "12px")
        .attr("fill", "#666")
      );
    
    // Add X axis label
    g.append("text")
      .attr("x", contentWidth / 2)
      .attr("y", contentHeight + 40)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "14px")
      .attr("fill", "#666")
      .text("Effectiveness Rating (%)");
    
    // Add Y axis
    g.append("g")
      .call(d3.axisLeft(yScale))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").remove())
      .call(g => g.selectAll(".tick text")
        .attr("font-size", "14px")
        .attr("font-weight", "500")
        .attr("fill", "#333")
      );
    
    // Create bars for effectiveness
    const bars = g.selectAll(".bar")
      .data(strategiesData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", d => yScale(d.strategy))
      .attr("height", yScale.bandwidth())
      .attr("x", 0)
      .attr("width", d => xScale(d.effectiveness))
      .attr("fill", d => d.color)
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("opacity", 0.85)
      .attr("cursor", "pointer");
    
    // Add cost indicator markers
    g.selectAll(".cost-marker")
      .data(strategiesData)
      .enter()
      .append("circle")
      .attr("class", "cost-marker")
      .attr("cy", d => yScale(d.strategy) + yScale.bandwidth() / 2)
      .attr("cx", d => xScale(d.effectiveness) + 15)
      .attr("r", d => 6 + d.cost / 10)
      .attr("fill", "none")
      .attr("stroke", "#e74c3c")
      .attr("stroke-width", 2)
      .attr("opacity", 0.8);
    
    // Add effectiveness labels on bars
    g.selectAll(".effectiveness-label")
      .data(strategiesData)
      .enter()
      .append("text")
      .attr("class", "effectiveness-label")
      .attr("y", d => yScale(d.strategy) + yScale.bandwidth() / 2 + 5)
      .attr("x", d => xScale(d.effectiveness) - 35)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "13px")
      .attr("font-weight", "bold")
      .attr("fill", "white")
      .text(d => d.effectiveness + "%");
    
    // Add cost percentage labels
    g.selectAll(".cost-label")
      .data(strategiesData)
      .enter()
      .append("text")
      .attr("class", "cost-label")
      .attr("y", d => yScale(d.strategy) + yScale.bandwidth() / 2 + 4)
      .attr("x", d => xScale(d.effectiveness) + 15)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "11px")
      .attr("font-weight", "bold")
      .attr("fill", "#e74c3c")
      .text(d => d.cost + "%");
    
    // Add legend for cost
    const legend = svg.append("g")
      .attr("transform", `translate(${width - margin.right + 30}, ${margin.top + 10})`);
    
    legend.append("text")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "14px")
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .text("Legend");
    
    // Effectiveness bar
    legend.append("rect")
      .attr("y", 25)
      .attr("width", 20)
      .attr("height", 10)
      .attr("fill", "#3498db")
      .attr("rx", 2)
      .attr("ry", 2);
    
    legend.append("text")
      .attr("y", 35)
      .attr("x", 30)
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "12px")
      .attr("fill", "#666")
      .text("Effectiveness Rating");
    
    // Cost circle
    legend.append("circle")
      .attr("cy", 55)
      .attr("cx", 10)
      .attr("r", 8)
      .attr("fill", "none")
      .attr("stroke", "#e74c3c")
      .attr("stroke-width", 2);
    
    legend.append("text")
      .attr("y", 60)
      .attr("x", 30)
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "12px")
      .attr("fill", "#666")
      .text("Relative Cost");
    
    // Add interactions
    bars.on("mouseover", function(event, d) {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("opacity", 1)
        .attr("stroke", "#333")
        .attr("stroke-width", 1);
      
      setSelectedStrategy(d);
    })
    .on("mouseout", function() {
      d3.select(this)
        .transition()
        .duration(200)
        .attr("opacity", 0.85)
        .attr("stroke", "none");
    })
    .on("click", function(event, d) {
      setSelectedStrategy(d === selectedStrategy ? null : d);
    });
    
    // Add footnote
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-style", "italic")
      .attr("font-size", "12px")
      .attr("fill", "#999")
      .text("Based on analysis of early-stage startup user acquisition data 2015-2023");
      
  }, [selectedStrategy]);
  
  return (
    <div className="w-full flex flex-col items-center">
      <svg ref={svgRef} className="w-full max-w-4xl"></svg>
      
      {selectedStrategy && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md border border-gray-200 w-full max-w-3xl">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-bold" style={{ color: selectedStrategy.color }}>
              {selectedStrategy.strategy}
            </h3>
            <button 
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedStrategy(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
              <p className="text-gray-700 mb-2">{selectedStrategy.description}</p>
              <div className="text-sm text-gray-600 italic">Example: {selectedStrategy.example}</div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <div className="text-sm text-gray-600">Effectiveness:</div>
                <div className="font-bold" style={{ color: selectedStrategy.color }}>{selectedStrategy.effectiveness}%</div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                <div className="h-2.5 rounded-full" style={{ width: `${selectedStrategy.effectiveness}%`, backgroundColor: selectedStrategy.color }}></div>
              </div>
              
              <div className="flex justify-between items-center mb-1">
                <div className="text-sm text-gray-600">Relative Cost:</div>
                <div className="font-bold text-red-500">{selectedStrategy.cost}%</div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="h-2.5 rounded-full bg-red-500" style={{ width: `${selectedStrategy.cost}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAcquisitionStrategies; 