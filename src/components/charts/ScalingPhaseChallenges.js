import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const ScalingPhaseChallenges = () => {
  const svgRef = useRef();
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  
  const challengesData = [
    {
      challenge: "Crossing the Chasm",
      difficulty: 85,
      impact: 90,
      color: "#3498db",
      description: "Adapting products from early adopters to mainstream markets, bridging differing user needs and expectations.",
      strategies: "Develop complete solutions, establish vertical market focus, create compelling use cases for pragmatists, build social proof through reference customers.",
      examples: "Slack transitioned from tech enthusiasts to enterprise by adding security, compliance and admin features needed by corporate IT departments."
    },
    {
      challenge: "Scaling Operations",
      difficulty: 75,
      impact: 80,
      color: "#2ecc71",
      description: "Transforming from nimble startup processes to robust systems that support exponential user growth.",
      strategies: "Invest in automation early, implement scalable architecture, develop operational playbooks, hire ahead of growth curves for key functions.",
      examples: "Airbnb had to rapidly scale customer service, trust and safety teams, and payment systems as it expanded globally."
    },
    {
      challenge: "Intensified Competition",
      difficulty: 70,
      impact: 85,
      color: "#e74c3c",
      description: "Facing aggressive responses from incumbents once your innovation proves the market opportunity.",
      strategies: "Develop moats beyond features (data, network effects, ecosystem), pursue rapid market expansion, seek strategic partnerships to strengthen position.",
      examples: "Microsoft responded to Slack's growth by launching Teams, bundling it with Office 365 to rapidly gain market share."
    },
    {
      challenge: "Rising CAC",
      difficulty: 65,
      impact: 75,
      color: "#f39c12",
      description: "Dealing with increasing customer acquisition costs as early adopter channels are exhausted.",
      strategies: "Develop omnichannel acquisition strategy, optimize conversion funnels, improve retention to increase LTV, find sustainable unit economics before scaling marketing.",
      examples: "DTC brands like Casper and Allbirds saw CAC rise significantly as they expanded beyond their initial customer base, forcing business model adjustments."
    },
    {
      challenge: "Organizational Growth",
      difficulty: 80,
      impact: 70,
      color: "#9b59b6",
      description: "Managing rapid team expansion while maintaining culture, communication, and decision-making effectiveness.",
      strategies: "Implement structured onboarding, document culture explicitly, develop middle management layer, establish clear decision frameworks.",
      examples: "Facebook implemented 'bootcamp' for all new employees and maintained small team structures to preserve startup speed during hypergrowth."
    },
    {
      challenge: "Regulatory Scrutiny",
      difficulty: 60,
      impact: 65,
      color: "#34495e",
      description: "Navigating increased attention from regulators, media, and the public as market presence grows.",
      strategies: "Proactively engage regulators, invest in compliance early, develop transparent policies, build public affairs capabilities.",
      examples: "Uber faced regulatory backlash in multiple markets as it scaled, requiring significant resources to address legal challenges."
    }
  ];
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear any previous rendering
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Set up dimensions
    const width = 900;
    const height = 600;
    const margin = { top: 80, right: 40, bottom: 60, left: 90 };
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
      .attr("font-size", "22px")
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .text("Key Challenges in Scaling from 1% to 20% Market Share");
    
    // Subtitle
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 55)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "14px")
      .attr("fill", "#666")
      .text("Difficulty vs. Business Impact Assessment");
    
    // Create chart group
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // Define scales
    const xScale = d3.scaleLinear()
      .domain([50, 100])
      .range([0, innerWidth]);
    
    const yScale = d3.scaleLinear()
      .domain([50, 100])
      .range([innerHeight, 0]);
    
    const sizeScale = d3.scaleLinear()
      .domain([60, 90])
      .range([60, 100]);
    
    // Add gridlines
    g.append("g")
      .attr("class", "grid")
      .attr("stroke", "#e0e0e0")
      .attr("stroke-opacity", 0.5)
      .selectAll("line")
      .data([60, 70, 80, 90])
      .enter()
      .append("line")
      .attr("x1", d => xScale(d))
      .attr("x2", d => xScale(d))
      .attr("y1", 0)
      .attr("y2", innerHeight);
    
    g.append("g")
      .attr("class", "grid")
      .attr("stroke", "#e0e0e0")
      .attr("stroke-opacity", 0.5)
      .selectAll("line")
      .data([60, 70, 80, 90])
      .enter()
      .append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", d => yScale(d))
      .attr("y2", d => yScale(d));
    
    // Add axes
    const xAxis = g.append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale).ticks(5).tickFormat(d => d + "%"))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick text")
        .attr("font-size", "12px")
        .attr("fill", "#666")
      );
    
    const yAxis = g.append("g")
      .call(d3.axisLeft(yScale).ticks(5).tickFormat(d => d + "%"))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick text")
        .attr("font-size", "12px")
        .attr("fill", "#666")
      );
    
    // Add axis labels
    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 40)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "14px")
      .attr("fill", "#555")
      .text("Challenge Difficulty");
    
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -60)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "14px")
      .attr("fill", "#555")
      .text("Business Impact");
    
    // Add bubble labels
    const bubbleLabels = g.append("g")
      .selectAll(".bubble-label")
      .data(challengesData)
      .enter()
      .append("text")
      .attr("class", "bubble-label")
      .attr("x", d => xScale(d.difficulty))
      .attr("y", d => yScale(d.impact) - 50)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("fill", d => d.color)
      .attr("pointer-events", "none")
      .attr("opacity", 0)
      .text(d => d.challenge);
    
    // Add bubbles
    const bubbles = g.selectAll(".bubble")
      .data(challengesData)
      .enter()
      .append("circle")
      .attr("class", "bubble")
      .attr("cx", d => xScale(d.difficulty))
      .attr("cy", d => yScale(d.impact))
      .attr("r", d => Math.sqrt((d.difficulty + d.impact) / 2))
      .attr("fill", d => d.color)
      .attr("fill-opacity", 0.7)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("cursor", "pointer");
    
    // Add bubble text directly on bubbles
    const bubbleText = g.selectAll(".bubble-text")
      .data(challengesData)
      .enter()
      .append("text")
      .attr("class", "bubble-text")
      .attr("x", d => xScale(d.difficulty))
      .attr("y", d => yScale(d.impact) + 5)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "11px")
      .attr("font-weight", "bold")
      .attr("fill", "white")
      .attr("pointer-events", "none")
      .text((d, i) => i + 1);
    
    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width - margin.right - 30}, ${margin.top + 20})`);
    
    challengesData.forEach((d, i) => {
      const legendRow = legend.append("g")
        .attr("transform", `translate(0, ${i * 25})`)
        .attr("cursor", "pointer")
        .on("click", () => {
          setSelectedChallenge(d === selectedChallenge ? null : d);
        });
      
      legendRow.append("circle")
        .attr("r", 6)
        .attr("fill", d.color)
        .attr("fill-opacity", 0.7)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1);
      
      legendRow.append("text")
        .attr("x", 15)
        .attr("y", 5)
        .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
        .attr("font-size", "12px")
        .attr("fill", "#333")
        .text(`${i+1}. ${d.challenge}`);
    });
    
    // Add interactions
    bubbles
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("fill-opacity", 1)
          .attr("r", d => Math.sqrt((d.difficulty + d.impact) / 2) + 5);
        
        bubbleLabels
          .filter(label => label === d)
          .transition()
          .duration(200)
          .attr("opacity", 1);
        
        setSelectedChallenge(d);
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("fill-opacity", 0.7)
          .attr("r", d => Math.sqrt((d.difficulty + d.impact) / 2));
        
        bubbleLabels
          .transition()
          .duration(200)
          .attr("opacity", 0);
      })
      .on("click", function(event, d) {
        setSelectedChallenge(d === selectedChallenge ? null : d);
      });
      
    // Add quadrant labels
    const quadrants = [
      { label: "High Impact, High Difficulty", x: innerWidth * 0.75, y: innerHeight * 0.25 },
      { label: "High Impact, Lower Difficulty", x: innerWidth * 0.25, y: innerHeight * 0.25 },
      { label: "Lower Impact, High Difficulty", x: innerWidth * 0.75, y: innerHeight * 0.75 },
      { label: "Lower Impact, Lower Difficulty", x: innerWidth * 0.25, y: innerHeight * 0.75 }
    ];
    
    g.selectAll(".quadrant-label")
      .data(quadrants)
      .enter()
      .append("text")
      .attr("class", "quadrant-label")
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "11px")
      .attr("font-style", "italic")
      .attr("fill", "#999")
      .text(d => d.label);
    
    // Add dividing lines for quadrants
    g.append("line")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", innerHeight / 2)
      .attr("y2", innerHeight / 2)
      .attr("stroke", "#ccc")
      .attr("stroke-dasharray", "4");
    
    g.append("line")
      .attr("x1", innerWidth / 2)
      .attr("x2", innerWidth / 2)
      .attr("y1", 0)
      .attr("y2", innerHeight)
      .attr("stroke", "#ccc")
      .attr("stroke-dasharray", "4");
    
    // Add footnote
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 10)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-style", "italic")
      .attr("font-size", "11px")
      .attr("fill", "#999")
      .text("Based on analysis of tech companies that successfully scaled from niche to mainstream adoption (2018-2024)");
  }, [selectedChallenge]);

  return (
    <div className="w-full flex flex-col items-center">
      <svg ref={svgRef} className="w-full max-w-4xl"></svg>
      
      {selectedChallenge && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md border-l-4 w-full max-w-3xl" style={{ borderColor: selectedChallenge.color }}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold" style={{ color: selectedChallenge.color }}>
              {selectedChallenge.challenge}
            </h3>
            <button 
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedChallenge(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Difficulty Rating:</div>
              <div className="font-bold text-lg" style={{ color: selectedChallenge.color }}>{selectedChallenge.difficulty}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="h-2 rounded-full" style={{ width: `${selectedChallenge.difficulty}%`, backgroundColor: selectedChallenge.color }}></div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Business Impact:</div>
              <div className="font-bold text-lg" style={{ color: selectedChallenge.color }}>{selectedChallenge.impact}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div className="h-2 rounded-full" style={{ width: `${selectedChallenge.impact}%`, backgroundColor: selectedChallenge.color }}></div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">Overall Priority:</div>
              <div className="font-bold text-lg" style={{ color: selectedChallenge.color }}>
                {selectedChallenge.impact > 80 && selectedChallenge.difficulty > 80 ? "Critical" : 
                 selectedChallenge.impact > 70 ? "High" : 
                 selectedChallenge.impact > 60 ? "Medium" : "Moderate"}
              </div>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4">{selectedChallenge.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Key Strategies</h4>
              <p className="text-gray-600 text-sm">{selectedChallenge.strategies}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Notable Examples</h4>
              <p className="text-gray-600 text-sm">{selectedChallenge.examples}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScalingPhaseChallenges; 