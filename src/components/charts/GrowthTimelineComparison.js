import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const GrowthTimelineComparison = () => {
  const svgRef = useRef();
  const [selectedCompany, setSelectedCompany] = useState(null);
  
  const companiesData = [
    {
      name: "Google Chrome",
      color: "#1abc9c",
      timeline: [
        { year: 2008, share: 1, event: "Initial release" },
        { year: 2009, share: 5, event: "Version 2.0, extensions support" },
        { year: 2010, share: 15, event: "Version 5.0, rapid adoption growth" },
        { year: 2012, share: 31, event: "Became world's most used browser" },
        { year: 2016, share: 58, event: "Dominant position established" },
        { year: 2020, share: 70, event: "Market leader with 70% share" }
      ],
      keyFactors: "Free download, superior performance, Google services integration, aggressive marketing through Google sites",
      lessons: "Leveraging existing platforms to promote new products can dramatically accelerate adoption"
    },
    {
      name: "Salesforce",
      color: "#3498db",
      timeline: [
        { year: 1999, share: 0, event: "Founded" },
        { year: 2002, share: 3, event: "IPO" },
        { year: 2006, share: 7, event: "Expansion beyond CRM" },
        { year: 2010, share: 10, event: "Reaches $1.3B revenue" },
        { year: 2015, share: 15, event: "Expands through acquisitions" },
        { year: 2023, share: 22, event: "Market leader with 22% share" }
      ],
      keyFactors: "SaaS pioneer, continuous product expansion, strategic acquisitions, strong ecosystem development",
      lessons: "Patience in B2B markets—took 10+ years to reach meaningful market share and 20+ years to become dominant"
    },
    {
      name: "Zoom",
      color: "#e74c3c",
      timeline: [
        { year: 2011, share: 0, event: "Founded" },
        { year: 2018, share: 5, event: "IPO" },
        { year: 2019, share: 10, event: "10 million daily participants" },
        { year: 2020, share: 49, event: "Pandemic: 300M daily participants" },
        { year: 2021, share: 45, event: "Post-pandemic adjustment" },
        { year: 2023, share: 39, event: "Established enterprise presence" }
      ],
      keyFactors: "Superior product experience, COVID-19 catalyst, freemium model, ease of use",
      lessons: "External events can dramatically compress adoption timelines when product is ready to scale"
    },
    {
      name: "AWS",
      color: "#f39c12",
      timeline: [
        { year: 2006, share: 1, event: "S3 and EC2 launched" },
        { year: 2010, share: 7, event: "Netflix begins moving to AWS" },
        { year: 2014, share: 20, event: "Rapid service expansion" },
        { year: 2016, share: 30, event: "Reaches $12B revenue run rate" },
        { year: 2019, share: 32, event: "Established enterprise presence" },
        { year: 2023, share: 33, event: "Stable market leadership" }
      ],
      keyFactors: "First-mover advantage, massive capital investment, rapid service expansion, adoption by tech companies",
      lessons: "Early leadership in platform markets can create long-term structural advantages that are difficult to overcome"
    },
    {
      name: "Facebook",
      color: "#9b59b6",
      timeline: [
        { year: 2004, share: 0, event: "Founded, Harvard-only" },
        { year: 2006, share: 7, event: "Opens to general public" },
        { year: 2008, share: 16, event: "Surpasses MySpace in users" },
        { year: 2010, share: 40, event: "500 million users" },
        { year: 2012, share: 60, event: "IPO, 1 billion users" },
        { year: 2018, share: 65, event: "2.3 billion monthly users" }
      ],
      keyFactors: "Network effects, campus-by-campus strategy, user engagement focus, developer platform",
      lessons: "In social networks, controlled growth can create exclusivity that drives demand and accelerates adoption"
    }
  ];
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear any previous rendering
    d3.select(svgRef.current).selectAll("*").remove();
    
    // Set up dimensions
    const width = 900;
    const height = 600;
    const margin = { top: 60, right: 100, bottom: 60, left: 60 };
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
      .text("Market Share Growth Timelines: Industry Success Stories");
    
    // Create chart group
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    // Flatten the data for easier processing
    const flatData = companiesData.flatMap(company => 
      company.timeline.map(point => ({
        company: company.name,
        color: company.color,
        year: point.year,
        share: point.share,
        event: point.event
      }))
    );
    
    // Define scales
    const xScale = d3.scaleLinear()
      .domain([
        d3.min(flatData, d => d.year), 
        d3.max(flatData, d => d.year)
      ])
      .range([0, innerWidth])
      .nice();
    
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(flatData, d => d.share) * 1.1])
      .range([innerHeight, 0])
      .nice();
    
    // Define line generator
    const line = d3.line()
      .x(d => xScale(d.year))
      .y(d => yScale(d.share))
      .curve(d3.curveMonotoneX);
    
    // Add X axis
    g.append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(xScale).tickFormat(d => d))
      .call(g => g.select(".domain").attr("stroke", "#ccc"))
      .call(g => g.selectAll(".tick line").attr("stroke", "#ccc"))
      .call(g => g.selectAll(".tick text")
        .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
        .attr("font-size", "12px")
        .attr("fill", "#666")
      );
    
    // Add Y axis
    g.append("g")
      .call(d3.axisLeft(yScale).tickFormat(d => d + "%"))
      .call(g => g.select(".domain").attr("stroke", "#ccc"))
      .call(g => g.selectAll(".tick line").attr("stroke", "#ccc"))
      .call(g => g.selectAll(".tick text")
        .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
        .attr("font-size", "12px")
        .attr("fill", "#666")
      );
    
    // Add X axis label
    g.append("text")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 40)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "14px")
      .attr("fill", "#555")
      .text("Year");
    
    // Add Y axis label
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -40)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-size", "14px")
      .attr("fill", "#555")
      .text("Market Share (%)");
    
    // Add horizontal reference lines with labels
    const referenceLines = [
      { value: 1, label: "1% Market Share", color: "#e74c3c" },
      { value: 20, label: "20% Market Share", color: "#2ecc71" }
    ];
    
    referenceLines.forEach(line => {
      g.append("line")
        .attr("x1", 0)
        .attr("x2", innerWidth)
        .attr("y1", yScale(line.value))
        .attr("y2", yScale(line.value))
        .attr("stroke", line.color)
        .attr("stroke-width", 1.5)
        .attr("stroke-dasharray", "4");
      
      g.append("text")
        .attr("x", 5)
        .attr("y", yScale(line.value) - 5)
        .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
        .attr("font-size", "11px")
        .attr("fill", line.color)
        .text(line.label);
    });
    
    // Add lines for each company
    companiesData.forEach(company => {
      // Draw the line
      g.append("path")
        .datum(company.timeline)
        .attr("fill", "none")
        .attr("stroke", company.color)
        .attr("stroke-width", 3)
        .attr("stroke-opacity", selectedCompany ? (selectedCompany === company.name ? 1 : 0.3) : 0.7)
        .attr("d", line);
      
      // Add points
      g.selectAll(`.point-${company.name.replace(/\s+/g, '-')}`)
        .data(company.timeline)
        .enter()
        .append("circle")
        .attr("class", `point-${company.name.replace(/\s+/g, '-')}`)
        .attr("cx", d => xScale(d.year))
        .attr("cy", d => yScale(d.share))
        .attr("r", 5)
        .attr("fill", company.color)
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .attr("opacity", selectedCompany ? (selectedCompany === company.name ? 1 : 0.3) : 0.7)
        .attr("cursor", "pointer")
        .on("mouseover", function(event, d) {
          // Show tooltip
          tooltip
            .style("visibility", "visible")
            .html(`
              <strong>${company.name}</strong><br>
              Year: ${d.year}<br>
              Market Share: ${d.share}%<br>
              ${d.event}
            `)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 30) + "px");
        })
        .on("mouseout", function() {
          // Hide tooltip
          tooltip.style("visibility", "hidden");
        })
        .on("click", function() {
          setSelectedCompany(selectedCompany === company.name ? null : company.name);
        });
      
      // Add company name at the end of the line
      const lastPoint = company.timeline[company.timeline.length - 1];
      g.append("text")
        .attr("x", xScale(lastPoint.year) + 10)
        .attr("y", yScale(lastPoint.share))
        .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
        .attr("font-size", "12px")
        .attr("font-weight", "bold")
        .attr("fill", company.color)
        .attr("opacity", selectedCompany ? (selectedCompany === company.name ? 1 : 0.3) : 0.7)
        .text(company.name);
    });
    
    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width - margin.right - 30}, ${margin.top + 10})`);
    
    companiesData.forEach((company, i) => {
      const legendRow = legend.append("g")
        .attr("transform", `translate(0, ${i * 25})`)
        .attr("cursor", "pointer")
        .on("click", () => {
          setSelectedCompany(selectedCompany === company.name ? null : company.name);
        });
      
      legendRow.append("line")
        .attr("x1", 0)
        .attr("x2", 20)
        .attr("y1", 5)
        .attr("y2", 5)
        .attr("stroke", company.color)
        .attr("stroke-width", 3)
        .attr("opacity", selectedCompany ? (selectedCompany === company.name ? 1 : 0.3) : 0.7);
      
      legendRow.append("text")
        .attr("x", 25)
        .attr("y", 9)
        .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
        .attr("font-size", "12px")
        .attr("fill", "#333")
        .attr("opacity", selectedCompany ? (selectedCompany === company.name ? 1 : 0.3) : 1)
        .text(company.name);
    });
    
    // Add tooltip div
    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("border", "1px solid #ddd")
      .style("border-radius", "4px")
      .style("padding", "8px")
      .style("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .style("font-size", "12px")
      .style("z-index", 1000);
    
    // Add footnote
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 15)
      .attr("text-anchor", "middle")
      .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
      .attr("font-style", "italic")
      .attr("font-size", "11px")
      .attr("fill", "#777")
      .text("Source: Industry reports, company financial disclosures, and market research data (2000-2023)");
      
    // Clean up tooltip on unmount
    return () => {
      d3.select("body").selectAll(".tooltip").remove();
    };
  }, [selectedCompany]);

  return (
    <div className="w-full flex flex-col items-center">
      <svg ref={svgRef} className="w-full max-w-4xl"></svg>
      
      {selectedCompany && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md w-full max-w-3xl">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold" style={{ color: companiesData.find(c => c.name === selectedCompany)?.color }}>
              {selectedCompany} Growth Journey
            </h3>
            <button 
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedCompany(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <h4 className="font-medium text-gray-800 mb-2">Timeline Highlights</h4>
            <ul className="space-y-2">
              {companiesData.find(c => c.name === selectedCompany)?.timeline.map((point, i) => (
                <li key={i} className="flex items-start">
                  <div className="min-w-[60px] font-bold text-gray-700">{point.year}:</div>
                  <div className="flex-1">
                    <span className="font-medium">{point.share}% market share</span> - {point.event}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Key Success Factors</h4>
              <p className="text-gray-600 text-sm">{companiesData.find(c => c.name === selectedCompany)?.keyFactors}</p>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Strategic Lessons</h4>
              <p className="text-gray-600 text-sm">{companiesData.find(c => c.name === selectedCompany)?.lessons}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GrowthTimelineComparison; 