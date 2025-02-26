import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const EnhancedMarketShareFramework = () => {
  const svgRef = useRef();
  const [selectedDimension, setSelectedDimension] = useState(null);
  
  // Enhanced data with detailed descriptions
  const centerNode = {
    id: "center",
    name: "Market Share Growth",
    description: "The combination of factors that drive a company's ability to capture and expand market share.",
    color: "#3498db",
    radius: 85
  };
  
  const dimensionNodes = [
    {
      id: "market",
      name: "Market Conditions",
      description: "External factors and timing that influence market entry success.",
      color: "#2ecc71",
      radius: 70,
      position: "top",
      subElements: [
        { 
          name: "Industry Maturity", 
          description: "Whether the market is emerging, growing, or mature affects the ability of new entrants to capture share."
        },
        { 
          name: "Competitive Landscape", 
          description: "The number, power, and positioning of existing players shapes entry opportunities."
        },
        { 
          name: "Timing", 
          description: "Launching at the right moment relative to technology adoption, regulatory changes, or cultural shifts."
        }
      ]
    },
    {
      id: "product",
      name: "Product Factors",
      description: "Characteristics of the offering that influence adoption and competitiveness.",
      color: "#f1c40f",
      radius: 70,
      position: "topLeft",
      subElements: [
        { 
          name: "Innovation Level", 
          description: "The degree to which the product introduces novel capabilities or approaches." 
        },
        { 
          name: "User Experience", 
          description: "Ease of use, intuitiveness, and overall satisfaction with the product interaction."
        },
        { 
          name: "Differentiation", 
          description: "Clear distinction from competitive offerings in meaningful ways."
        }
      ]
    },
    {
      id: "growth",
      name: "Growth Mechanics",
      description: "Systems and approaches that drive user or customer acquisition.",
      color: "#e74c3c",
      radius: 70,
      position: "bottomLeft",
      subElements: [
        { 
          name: "Network Effects", 
          description: "How product value increases as more users join, creating inherent scaling advantages."
        },
        { 
          name: "Viral Loops", 
          description: "Mechanisms through which users naturally invite or recruit additional users."
        },
        { 
          name: "Distribution Channels", 
          description: "Pathways to reach customers effectively and efficiently."
        }
      ]
    },
    {
      id: "org",
      name: "Organizational Capabilities",
      description: "Internal strengths that enable execution and scaling.",
      color: "#9b59b6",
      radius: 70,
      position: "topRight",
      subElements: [
        { 
          name: "Team Composition", 
          description: "The skills, experience, and diversity of the leadership and operational teams."
        },
        { 
          name: "Capital Efficiency", 
          description: "Ability to achieve results with minimal financial resources."
        },
        { 
          name: "Execution", 
          description: "Speed, quality, and consistency in turning strategy into operational reality."
        }
      ]
    },
    {
      id: "competition",
      name: "Competitive Response",
      description: "How established players react to new market entrants.",
      color: "#1abc9c",
      radius: 70,
      position: "bottomRight",
      subElements: [
        { 
          name: "Incumbent Reactions", 
          description: "Whether existing players ignore, imitate, block, or acquire new entrants."
        },
        { 
          name: "Competitive Dynamics", 
          description: "Evolution of competition over time as the market responds to disruption."
        }
      ]
    }
  ];

  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear any previous SVG content
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Set up dimensions
    const width = 850;
    const height = 650;
    
    // Create SVG with responsive container
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .attr('style', 'max-width: 100%; height: auto;');
    
    // Create defs for filters and gradients
    const defs = svg.append("defs");
    
    // Add a subtle texture pattern
    const pattern = defs.append("pattern")
      .attr("id", "texture")
      .attr("patternUnits", "userSpaceOnUse")
      .attr("width", 100)
      .attr("height", 100)
      .attr("patternTransform", "rotate(45)");
    
    pattern.append("rect")
      .attr("width", 100)
      .attr("height", 100)
      .attr("fill", "#f8f9fa");
    
    pattern.append("path")
      .attr("d", "M 0,10 l 20,0")
      .attr("stroke", "#e9ecef")
      .attr("stroke-width", 1);
    
    pattern.append("path")
      .attr("d", "M 0,50 l 100,0")
      .attr("stroke", "#e9ecef")
      .attr("stroke-width", 0.5);
    
    // Drop shadow filter
    const dropShadow = defs.append("filter")
      .attr("id", "drop-shadow")
      .attr("height", "130%");
    
    dropShadow.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 3)
      .attr("result", "blur");
    
    dropShadow.append("feOffset")
      .attr("in", "blur")
      .attr("dx", 2)
      .attr("dy", 2)
      .attr("result", "offsetBlur");
    
    const feMerge = dropShadow.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "offsetBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");
    
    // Glow filter for hover effects
    const glow = defs.append("filter")
      .attr("id", "glow")
      .attr("height", "130%");
    
    glow.append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 5)
      .attr("result", "blur");
    
    glow.append("feColorMatrix")
      .attr("in", "blur")
      .attr("type", "matrix")
      .attr("values", "0 0 0 0 0.9 0 0 0 0 0.9 0 0 0 0 0.9 0 0 0 0.7 0")
      .attr("result", "coloredBlur");
    
    const feMergeGlow = glow.append("feMerge");
    feMergeGlow.append("feMergeNode").attr("in", "coloredBlur");
    feMergeGlow.append("feMergeNode").attr("in", "SourceGraphic");
    
    // Create gradients for each node
    const centerGradient = defs.append("radialGradient")
      .attr("id", "center-gradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%")
      .attr("fx", "50%")
      .attr("fy", "50%");
    
    centerGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", d3.rgb(centerNode.color).brighter(0.5));
    
    centerGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", d3.rgb(centerNode.color).darker(0.5));
    
    // Create gradients for dimension nodes
    dimensionNodes.forEach(node => {
      const gradient = defs.append("radialGradient")
        .attr("id", `gradient-${node.id}`)
        .attr("cx", "50%")
        .attr("cy", "50%")
        .attr("r", "50%")
        .attr("fx", "70%")
        .attr("fy", "30%");
      
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", d3.rgb(node.color).brighter(0.7));
      
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", node.color);
    });
    
    // Background with subtle texture
    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "url(#texture)");
    
    // Add decorative background elements
    svg.append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", 270)
      .attr("fill", "none")
      .attr("stroke", "#e0e6f0")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "2,4");
    
    svg.append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", 220)
      .attr("fill", "none")
      .attr("stroke", "#e0e6f0")
      .attr("stroke-width", 1);
    
    // Title
    const titleGroup = svg.append("g")
      .attr("transform", `translate(${width/2}, 45)`);
    
    titleGroup.append("text")
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "28px")
      .attr("font-weight", "600")
      .attr("fill", "#2c3e50")
      .text("Market Share Growth Framework");
    
    titleGroup.append("text")
      .attr("y", 30)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "16px")
      .attr("fill", "#5d6d7e")
      .text("Five Dimensions That Influence Market Share Growth");
    
    // Define node positions
    const centerX = width / 2;
    const centerY = height / 2;
    const orbitRadius = 180;
    
    const getNodePosition = (position) => {
      switch(position) {
        case "top": return { x: centerX, y: centerY - orbitRadius };
        case "topRight": return { x: centerX + orbitRadius * 0.866, y: centerY - orbitRadius * 0.5 };
        case "bottomRight": return { x: centerX + orbitRadius * 0.866, y: centerY + orbitRadius * 0.5 };
        case "bottom": return { x: centerX, y: centerY + orbitRadius };
        case "bottomLeft": return { x: centerX - orbitRadius * 0.866, y: centerY + orbitRadius * 0.5 };
        case "topLeft": return { x: centerX - orbitRadius * 0.866, y: centerY - orbitRadius * 0.5 };
        default: return { x: centerX, y: centerY };
      }
    };
    
    // Position the nodes
    dimensionNodes.forEach(node => {
      const pos = getNodePosition(node.position);
      node.x = pos.x;
      node.y = pos.y;
    });
    
    // Create links first (to be in the background)
    const linkGroup = svg.append("g")
      .attr("class", "links");
    
    dimensionNodes.forEach((node, i) => {
      // Calculate angle for curved links
      const dx = node.x - centerX;
      const dy = node.y - centerY;
      const angle = Math.atan2(dy, dx);
      
      // Create curve path
      const path = linkGroup.append("path")
        .attr("d", () => {
          const r1 = centerNode.radius;
          const r2 = node.radius;
          
          // Start and end points adjusted for circle radii
          const x1 = centerX + Math.cos(angle) * r1;
          const y1 = centerY + Math.sin(angle) * r1;
          const x2 = node.x - Math.cos(angle) * r2;
          const y2 = node.y - Math.sin(angle) * r2;
          
          return `M${x1},${y1} L${x2},${y2}`;
        })
        .attr("stroke", node.color)
        .attr("stroke-width", 4)
        .attr("opacity", 0.6)
        .attr("fill", "none")
        .attr("stroke-dasharray", function() { return this.getTotalLength(); })
        .attr("stroke-dashoffset", function() { return this.getTotalLength(); });
      
      // Animate the path
      path.transition()
        .duration(1000)
        .delay(i * 200 + 500)
        .attr("stroke-dashoffset", 0);
      
      // Add pulsing effect
      path.append("animate")
        .attr("attributeName", "stroke-opacity")
        .attr("values", "0.6;0.8;0.6")
        .attr("dur", "3s")
        .attr("repeatCount", "indefinite");
    });
    
    // Create the central node
    const centralNode = svg.append("g")
      .attr("class", "central-node")
      .attr("cursor", "pointer")
      .attr("transform", `translate(${centerX}, ${centerY})`)
      .on("click", () => setSelectedDimension(null));
    
    centralNode.append("circle")
      .attr("r", 0)
      .attr("fill", "url(#center-gradient)")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .transition()
      .duration(1000)
      .attr("r", centerNode.radius);
    
    // Add a pulse effect to central node
    centralNode.append("circle")
      .attr("r", centerNode.radius)
      .attr("fill", "none")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("opacity", 0.5);
    
    centralNode.select("circle:last-of-type")
      .append("animate")
      .attr("attributeName", "r")
      .attr("values", `${centerNode.radius};${centerNode.radius + 10};${centerNode.radius}`)
      .attr("dur", "4s")
      .attr("repeatCount", "indefinite");
    
    centralNode.select("circle:last-of-type")
      .append("animate")
      .attr("attributeName", "opacity")
      .attr("values", "0.5;0;0.5")
      .attr("dur", "4s")
      .attr("repeatCount", "indefinite");
    
    // Add central node text
    centralNode.append("text")
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .attr("fill", "white")
      .attr("y", -5)
      .attr("opacity", 0)
      .text("Market Share")
      .transition()
      .duration(1000)
      .delay(400)
      .attr("opacity", 1);
    
    centralNode.append("text")
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .attr("fill", "white")
      .attr("y", 20)
      .attr("opacity", 0)
      .text("Growth")
      .transition()
      .duration(1000)
      .delay(400)
      .attr("opacity", 1);
    
    // Add mouseover effect
    centralNode.on("mouseover", function() {
      d3.select(this).select("circle:first-of-type")
        .transition()
        .duration(300)
        .attr("filter", "url(#glow)");
    })
    .on("mouseout", function() {
      d3.select(this).select("circle:first-of-type")
        .transition()
        .duration(300)
        .attr("filter", null);
    });
    
    // Create dimension nodes
    dimensionNodes.forEach((node, i) => {
      const group = svg.append("g")
        .attr("class", `dimension-${node.id}`)
        .attr("cursor", "pointer")
        .attr("transform", `translate(${node.x}, ${node.y})`)
        .on("click", () => setSelectedDimension(node.id));
      
      // Main circle
      group.append("circle")
        .attr("r", 0)
        .attr("fill", `url(#gradient-${node.id})`)
        .attr("stroke", "#fff")
        .attr("stroke-width", 1.5)
        .transition()
        .duration(800)
        .delay(i * 200)
        .attr("r", node.radius);
      
      // Add mouseover effect
      group.on("mouseover", function() {
        d3.select(this).select("circle")
          .transition()
          .duration(300)
          .attr("filter", "url(#glow)");
      })
      .on("mouseout", function() {
        d3.select(this).select("circle")
          .transition()
          .duration(300)
          .attr("filter", null);
      });
      
      // Main text
      const words = node.name.split(" ");
      if (words.length > 1) {
        group.append("text")
          .attr("text-anchor", "middle")
          .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
          .attr("font-size", "16px")
          .attr("font-weight", "bold")
          .attr("fill", "white")
          .attr("y", -10)
          .attr("opacity", 0)
          .text(words[0])
          .transition()
          .duration(800)
          .delay(i * 200 + 400)
          .attr("opacity", 1);
        
        group.append("text")
          .attr("text-anchor", "middle")
          .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
          .attr("font-size", "16px")
          .attr("font-weight", "bold")
          .attr("fill", "white")
          .attr("y", 10)
          .attr("opacity", 0)
          .text(words[1])
          .transition()
          .duration(800)
          .delay(i * 200 + 400)
          .attr("opacity", 1);
      } else {
        group.append("text")
          .attr("text-anchor", "middle")
          .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
          .attr("font-size", "16px")
          .attr("font-weight", "bold")
          .attr("fill", "white")
          .attr("opacity", 0)
          .text(node.name)
          .transition()
          .duration(800)
          .delay(i * 200 + 400)
          .attr("opacity", 1);
      }
      
      // Add sub-elements as smaller text (only visible on hover)
      node.subElements.forEach((subEl, j) => {
        const offset = words.length > 1 ? 30 : 20;
        
        group.append("text")
          .attr("class", "sub-element")
          .attr("text-anchor", "middle")
          .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
          .attr("font-size", "12px")
          .attr("fill", "white")
          .attr("y", offset + j * 16)
          .attr("opacity", 0)
          .text(subEl.name);
      });
      
      // Show sub-elements on hover
      group.on("mouseover.text", function() {
        d3.select(this).selectAll(".sub-element")
          .transition()
          .duration(300)
          .attr("opacity", 1);
      })
      .on("mouseout.text", function() {
        d3.select(this).selectAll(".sub-element")
          .transition()
          .duration(300)
          .attr("opacity", 0);
      });
    });
    
    // Attribution text
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 20)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-style", "italic")
      .attr("font-size", "14px")
      .attr("fill", "#7f8c8d")
      .text("Based on analysis of tech market penetration patterns 2010-2025");
      
  }, []);
  
  // Find the selected dimension data
  const selectedDimensionData = selectedDimension 
    ? dimensionNodes.find(d => d.id === selectedDimension) 
    : null;
  
  return (
    <div className="w-full flex flex-col items-center relative">
      <svg ref={svgRef} className="w-full max-w-4xl"></svg>
      
      {/* Detailed panel when a dimension is selected */}
      {selectedDimensionData && (
        <div className="mt-6 bg-white rounded-lg p-6 w-full max-w-4xl shadow-lg border-l-4" 
          style={{ borderColor: selectedDimensionData.color }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold" style={{ color: selectedDimensionData.color }}>
              {selectedDimensionData.name}
            </h2>
            <span 
              className="cursor-pointer text-gray-400 hover:text-gray-600 text-2xl"
              onClick={() => setSelectedDimension(null)}
            >
              ×
            </span>
          </div>
          
          <p className="text-gray-700 mb-6">{selectedDimensionData.description}</p>
          
          <h3 className="font-semibold text-gray-700 mb-3">Key Components:</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedDimensionData.subElements.map((element, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-semibold mb-2" style={{ color: selectedDimensionData.color }}>{element.name}</h4>
                <p className="text-gray-600 text-sm">{element.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-2">Strategic Implications:</h3>
            <p className="text-gray-600">
              {selectedDimension === 'market' && "Market conditions are often beyond a company's control, but can be anticipated and leveraged. Success requires timing entry to match market readiness and identifying segments where existing competition has vulnerabilities."}
              {selectedDimension === 'product' && "Product development should focus on meaningful differentiation from existing solutions. Successful companies identify the critical attributes that drive user adoption and invest disproportionately in those areas."}
              {selectedDimension === 'growth' && "Growth mechanics should be built into the product design rather than added as afterthoughts. Companies that achieve rapid market share growth typically have inherent mechanisms that accelerate adoption."}
              {selectedDimension === 'org' && "Team composition and capability are often the deciding factors between similarly positioned competitors. Technical excellence must be balanced with operational discipline and strategic clarity."}
              {selectedDimension === 'competition' && "Anticipating competitive response is essential for sustainable growth. New entrants should identify whether incumbents are likely to respond through imitation, acquisition offers, or aggressive countermeasures."}
            </p>
          </div>
          
          <div className="mt-4 text-right">
            <button 
              className="px-4 py-2 rounded-lg text-white font-medium text-sm"
              style={{ backgroundColor: selectedDimensionData.color }}
              onClick={() => setSelectedDimension(null)}
            >
              Back to Framework
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedMarketShareFramework; 