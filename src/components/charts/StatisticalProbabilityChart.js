import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const StatisticalProbabilityChart = () => {
  const svgRef = useRef();
  const [selectedStage, setSelectedStage] = useState(null);
  
  const stagesData = [
    {
      stage: "Idea",
      startups: 100,
      successRate: 50,
      description: "Initial concept validation and pre-product development",
      challenges: "Evaluating market potential, forming founding team, securing initial capital",
      strategies: "Conduct thorough customer discovery, validate problem/solution fit with minimal resources, develop clear vision"
    },
    {
      stage: "MVP",
      startups: 50,
      successRate: 40,
      description: "Building and launching minimum viable product",
      challenges: "Technical execution, meeting user expectations, finding early adopters",
      strategies: "Focus on core value proposition, establish feedback loops, iterate rapidly based on user insights"
    },
    {
      stage: "0.1% Share",
      startups: 20,
      successRate: 50,
      description: "Finding initial product-market fit with early adopters",
      challenges: "User acquisition, retention, identifying scalable use cases",
      strategies: "Obsess over early user experience, measure product engagement, refine ideal customer profile"
    },
    {
      stage: "1% Share",
      startups: 10,
      successRate: 30,
      description: "Establishing viable market presence and business model",
      challenges: "Building repeatable sales process, team expansion, operational foundation",
      strategies: "Systematize customer acquisition, develop key metrics and dashboards, strengthen unit economics"
    },
    {
      stage: "5% Share",
      startups: 3,
      successRate: 67,
      description: "Scaling core business and expanding market reach",
      challenges: "Managing growth, maintaining product quality, competitive responses",
      strategies: "Build organizational structure for scale, develop leadership team, create defensible advantages"
    },
    {
      stage: "20% Share",
      startups: 2,
      successRate: 100,
      description: "Achieving category leadership position",
      challenges: "Market consolidation, shareholder expectations, innovation dilemmas",
      strategies: "Expand into adjacent markets, develop platform strategy, balance growth and profitability"
    }
  ];
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Set up dimensions
    const width = 900;
    const height = 600;
    const margin = { top: 70, right: 40, bottom: 100, left: 70 };
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
      .text("Statistical Probability of Startup Success: The Funnel of Attrition");
    
    // Create chart group
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // Define scales
    const xScale = d3.scaleBand()
      .domain(stagesData.map(d => d.stage))
      .range([0, innerWidth])
      .padding(0.4);
    
    const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([innerHeight, 0]);
    
    // Add X axis
    g.append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "12px");
    
    // Add Y axis
    g.append("g")
      .call(d3.axisLeft(yScale))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
        .attr("x2", innerWidth)
        .attr("stroke-opacity", 0.1)
      );
    
    // Add Y axis label
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -60)
      .attr("x", -innerHeight / 2)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "14px")
      .attr("fill", "#666")
      .text("Startups Remaining (%)");
    
    // Add bars
    g.selectAll(".bar")
      .data(stagesData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => xScale(d.stage))
      .attr("y", d => yScale(d.startups))
      .attr("width", xScale.bandwidth())
      .attr("height", d => innerHeight - yScale(d.startups))
      .attr("fill", d => selectedStage === d.stage ? "#3182bd" : "#6baed6")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .attr("rx", 2)
      .attr("cursor", "pointer")
      .on("click", function(event, d) {
        setSelectedStage(selectedStage === d.stage ? null : d.stage);
      });
    
    // Add bar labels
    g.selectAll(".bar-label")
      .data(stagesData)
      .enter()
      .append("text")
      .attr("class", "bar-label")
      .attr("x", d => xScale(d.stage) + xScale.bandwidth() / 2)
      .attr("y", d => yScale(d.startups) - 5)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .text(d => d.startups + "%");
    
    // Add connecting lines between bars
    for (let i = 0; i < stagesData.length - 1; i++) {
      const current = stagesData[i];
      const next = stagesData[i + 1];
      
      g.append("path")
        .attr("d", `M${xScale(current.stage) + xScale.bandwidth()} ${yScale(current.startups) + (innerHeight - yScale(current.startups)) / 2} 
                   L${xScale(next.stage)} ${yScale(next.startups) + (innerHeight - yScale(next.startups)) / 2}`)
        .attr("stroke", "#aaa")
        .attr("stroke-width", 1.5)
        .attr("stroke-dasharray", "4,2")
        .attr("marker-end", "url(#arrow)");
    }
    
    // Define arrow marker
    svg.append("defs").append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 8)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#999");
    
    // Add key milestones
    const milestones = [
      { x: xScale("0.1% Share") + xScale.bandwidth() / 2, y: innerHeight + 50, label: "Initial Traction" },
      { x: xScale("1% Share") + xScale.bandwidth() / 2, y: innerHeight + 50, label: "Product-Market Fit" },
      { x: xScale("20% Share") + xScale.bandwidth() / 2, y: innerHeight + 50, label: "Market Leadership" }
    ];
    
    milestones.forEach(milestone => {
      g.append("line")
        .attr("x1", milestone.x)
        .attr("x2", milestone.x)
        .attr("y1", innerHeight)
        .attr("y2", innerHeight + 20)
        .attr("stroke", "#333")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "3,2");
      
      g.append("text")
        .attr("x", milestone.x)
        .attr("y", milestone.y)
        .attr("text-anchor", "middle")
        .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("fill", "#333")
        .text(milestone.label);
    });
    
    // Add footnote
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 15)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-style", "italic")
      .attr("font-size", "11px")
      .attr("fill", "#777")
      .text("Source: Compiled from CB Insights, Startup Genome Project, and academic research on startup outcomes (2018-2024)");
  }, [selectedStage]);

  return (
    <div className="w-full flex flex-col items-center">
      <svg ref={svgRef} className="w-full max-w-4xl"></svg>
      
      {selectedStage && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md w-full max-w-3xl">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-blue-800">
              {selectedStage} Stage
            </h3>
            <button 
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedStage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <div className="flex justify-between">
              <div className="text-gray-700">Startups Remaining:</div>
              <div className="font-bold text-blue-800">{stagesData.find(s => s.stage === selectedStage)?.startups}%</div>
            </div>
            {selectedStage !== "Idea" && (
              <div className="flex justify-between mt-2">
                <div className="text-gray-700">Success Rate from Previous Stage:</div>
                <div className="font-bold text-green-700">{stagesData.find(s => s.stage === selectedStage)?.successRate}%</div>
              </div>
            )}
          </div>
          
          <p className="text-gray-700 mb-4">{stagesData.find(s => s.stage === selectedStage)?.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Key Challenges</h4>
              <p className="text-gray-600 text-sm">{stagesData.find(s => s.stage === selectedStage)?.challenges}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Effective Strategies</h4>
              <p className="text-gray-600 text-sm">{stagesData.find(s => s.stage === selectedStage)?.strategies}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticalProbabilityChart; 