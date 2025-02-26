import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const EnhancedStartupFunnel = () => {
  const svgRef = useRef();
  const [selectedStage, setSelectedStage] = useState(null);
  const [tooltipData, setTooltipData] = useState(null);
  
  // Data with enhanced details
  const funnelData = [
    { 
      stage: "Founded Startups", 
      percentage: 100, 
      color: "#3366cc", 
      details: "All tech startups begin here, with a founding team, initial idea, and typically pre-seed funding.",
      examples: "Every tech company starts as a startup, regardless of future trajectory."
    },
    { 
      stage: "Survive First Year", 
      percentage: 75, 
      color: "#5c85d6", 
      details: "The first major hurdle: creating a minimum viable product and navigating initial market challenges.",
      examples: "~75% of startups make it past their first year, avoiding early cash flow problems and founding team conflicts."
    },
    { 
      stage: "Reach Product-Market Fit", 
      percentage: 35, 
      color: "#7a9ee1", 
      details: "Finding the right product for the right market with evidence of customer traction and repeatable sales.",
      examples: "Slack, Airbnb, and Dropbox all pivoted before finding their successful product-market fit."
    },
    { 
      stage: "Achieve 1% Market Share", 
      percentage: 10, 
      color: "#97b7eb", 
      details: "Breaking through to meaningful market presence, proven business model, and established customer base.",
      examples: "Only about 1 in 10 startups reach this milestone, exemplified by companies like Figma and Notion early in their journeys."
    },
    { 
      stage: "Reach 20% Market Share", 
      percentage: 2, 
      color: "#b5d0f5", 
      details: "Becoming a major market player with substantial revenue, brand recognition, and industry influence.",
      examples: "Only ~2% of startups ever reach this level. Examples include Zoom, Shopify, and Stripe in their respective markets."
    }
  ];

  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear any previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Set up dimensions
    const width = 800;
    const height = 650;
    const margin = { top: 100, right: 150, bottom: 80, left: 150 };
    const contentWidth = width - margin.left - margin.right;
    const contentHeight = height - margin.top - margin.bottom;
    
    // Create SVG with responsive container
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto;');
    
    // Add gradient defs for more sophisticated styling
    const defs = svg.append("defs");
    
    // Create gradient for background
    const bgGradient = defs.append("linearGradient")
      .attr("id", "bg-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%");
    
    bgGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#f5f7fa");
    
    bgGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#e4e8ee");
    
    // Create gradient for each funnel stage
    funnelData.forEach((d, i) => {
      const gradient = defs.append("linearGradient")
        .attr("id", `funnel-gradient-${i}`)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%");
      
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", d3.rgb(d.color).brighter(0.3));
      
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", d3.rgb(d.color).darker(0.3));
    });
    
    // Background with gradient
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "url(#bg-gradient)");
    
    // Add decorative elements
    svg.append("path")
      .attr("d", `M0,${height} Q${width/3},${height-50} ${width/2},${height-30} T${width},${height-80} V${height} Z`)
      .attr("fill", "#e0e6f0")
      .attr("opacity", 0.5);
    
    // Title with drop shadow
    defs.append("filter")
      .attr("id", "drop-shadow")
      .append("feDropShadow")
      .attr("dx", "0")
      .attr("dy", "1")
      .attr("stdDeviation", "2")
      .attr("flood-opacity", "0.3");
    
    const titleGroup = svg.append("g")
      .attr("transform", `translate(${width/2}, 60)`)
      .style("filter", "url(#drop-shadow)");
    
    titleGroup.append("text")
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "28px")
      .attr("font-weight", "600")
      .attr("fill", "#2c3e50")
      .text("Startup Success Funnel");
    
    titleGroup.append("text")
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "16px")
      .attr("fill", "#5d6d7e")
      .text("From Founding to Market Leadership");
    
    // Create a container for the funnel
    const funnelGroup = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // Calculate heights for each section
    const sectionHeight = contentHeight / funnelData.length;
    const gap = 10;
    
    // Add the funnel segments with enhanced styling
    funnelData.forEach((d, i) => {
      const topWidth = contentWidth * (i === 0 ? 1 : funnelData[i-1].percentage/100);
      const bottomWidth = contentWidth * (d.percentage/100);
      const yPos = i * sectionHeight;
      
      // Calculate points for the trapezoid
      const points = [
        [0, yPos],
        [topWidth, yPos],
        [bottomWidth, yPos + sectionHeight - gap],
        [0, yPos + sectionHeight - gap]
      ];
      
      // Calculate the midpoint for proper text placement
      const midpointX = (topWidth + bottomWidth) / 4;
      const midpointY = yPos + sectionHeight / 2 - gap / 2;
      
      // Create the segment
      const segment = funnelGroup.append("polygon")
        .attr("points", points.map(p => p.join(",")).join(" "))
        .attr("fill", `url(#funnel-gradient-${i})`)
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .attr("opacity", 0)
        .attr("cursor", "pointer")
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("class", `funnel-segment-${i}`)
        .on("mouseover", () => {
          d3.select(`.funnel-segment-${i}`)
            .transition()
            .duration(200)
            .attr("transform", "scale(1.02)")
            .attr("filter", "url(#drop-shadow)");
            
          setTooltipData({
            stage: d.stage,
            details: d.details,
            examples: d.examples,
            percentage: d.percentage
          });
        })
        .on("mouseout", () => {
          d3.select(`.funnel-segment-${i}`)
            .transition()
            .duration(200)
            .attr("transform", "scale(1)")
            .attr("filter", null);
            
          setTooltipData(null);
        })
        .on("click", () => {
          setSelectedStage(selectedStage === i ? null : i);
        });
      
      // Animate the segment
      segment.transition()
        .duration(600)
        .delay(i * 200)
        .attr("opacity", 0.9);
      
      // Add the stage name
      funnelGroup.append("text")
        .attr("x", midpointX)
        .attr("y", midpointY)
        .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
        .attr("font-size", "16px")
        .attr("font-weight", "600")
        .attr("fill", "white")
        .attr("text-anchor", "start")
        .attr("pointer-events", "none")
        .attr("opacity", 0)
        .text(d.stage)
        .transition()
        .duration(600)
        .delay(i * 200 + 300)
        .attr("opacity", 1);
      
      // Add the percentage on the right side
      funnelGroup.append("text")
        .attr("x", contentWidth + 40)
        .attr("y", midpointY)
        .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
        .attr("font-size", "16px")
        .attr("font-weight", "bold")
        .attr("fill", d.color)
        .attr("text-anchor", "start")
        .attr("opacity", 0)
        .text(`${d.percentage}%`)
        .transition()
        .duration(600)
        .delay(i * 200 + 400)
        .attr("opacity", 1);
      
      // Add a connecting line
      funnelGroup.append("line")
        .attr("x1", bottomWidth + 5)
        .attr("y1", midpointY)
        .attr("x2", contentWidth + 35)
        .attr("y2", midpointY)
        .attr("stroke", d.color)
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "1,1")
        .attr("opacity", 0)
        .transition()
        .duration(600)
        .delay(i * 200 + 350)
        .attr("opacity", 0.7);
    });
    
    // Attribution text
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 30)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-style", "italic")
      .attr("font-size", "14px")
      .attr("fill", "#7f8c8d")
      .text("Based on tech startup trajectory statistics 2020-2025");
      
  }, []);
  
  return (
    <div className="w-full flex flex-col items-center relative">
      <svg ref={svgRef} className="w-full max-w-4xl"></svg>
      
      {/* Interactive tooltip */}
      {tooltipData && (
        <div className="absolute right-4 top-32 bg-white shadow-lg rounded-lg p-4 max-w-xs transition-all duration-300 border-l-4 border-blue-500">
          <h3 className="font-bold text-lg text-blue-800 mb-2">{tooltipData.stage}</h3>
          <p className="text-gray-700 mb-2">{tooltipData.details}</p>
          <div className="mt-2">
            <p className="text-sm text-gray-500 font-semibold">Examples:</p>
            <p className="text-sm text-gray-600 italic">{tooltipData.examples}</p>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <div className="bg-blue-100 rounded-full px-3 py-1 text-blue-800 font-bold">
              {tooltipData.percentage}%
            </div>
            <div className="text-xs text-gray-500">Click for more details</div>
          </div>
        </div>
      )}
      
      {/* Detailed view when a segment is selected */}
      {selectedStage !== null && (
        <div className="mt-6 bg-gray-50 rounded-lg p-6 w-full max-w-4xl shadow-md border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {funnelData[selectedStage].stage}
            </h2>
            <span 
              className="cursor-pointer text-gray-400 hover:text-gray-600 text-2xl"
              onClick={() => setSelectedStage(null)}
            >
              ×
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Key Characteristics</h3>
              <p className="text-gray-600">{funnelData[selectedStage].details}</p>
              
              <div className="mt-4">
                <h3 className="font-semibold text-gray-700 mb-2">Examples</h3>
                <p className="text-gray-600">{funnelData[selectedStage].examples}</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-inner">
              <h3 className="font-semibold text-gray-700 mb-2">Stage Statistics</h3>
              <div className="flex items-center mb-3">
                <div className="w-32 font-medium text-gray-700">Success Rate:</div>
                <div className="flex-1">
                  <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full"
                      style={{ 
                        width: `${funnelData[selectedStage].percentage}%`,
                        background: `linear-gradient(to right, ${d3.rgb(funnelData[selectedStage].color).brighter(0.3)}, ${funnelData[selectedStage].color})`
                      }}
                    ></div>
                  </div>
                </div>
                <div className="ml-3 font-bold text-blue-800">{funnelData[selectedStage].percentage}%</div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-semibold text-gray-700 mb-2">Critical Success Factors</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  {selectedStage === 0 && (
                    <>
                      <li>Strong founding team composition</li>
                      <li>Clear vision and product concept</li>
                      <li>Initial funding or bootstrap capability</li>
                      <li>Addressable market opportunity</li>
                    </>
                  )}
                  {selectedStage === 1 && (
                    <>
                      <li>Minimum viable product development</li>
                      <li>Early customer discovery</li>
                      <li>Efficient cash management</li>
                      <li>Team cohesion and resilience</li>
                    </>
                  )}
                  {selectedStage === 2 && (
                    <>
                      <li>Product iteration based on feedback</li>
                      <li>Evidence of customer retention</li>
                      <li>Repeatable customer acquisition</li>
                      <li>Clear value proposition</li>
                    </>
                  )}
                  {selectedStage === 3 && (
                    <>
                      <li>Scalable growth strategy</li>
                      <li>Market differentiation</li>
                      <li>Operational efficiency</li>
                      <li>Sustainable unit economics</li>
                    </>
                  )}
                  {selectedStage === 4 && (
                    <>
                      <li>Industry leadership position</li>
                      <li>Sustainable competitive advantage</li>
                      <li>Organizational excellence</li>
                      <li>Strategic expansion capabilities</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedStartupFunnel; 