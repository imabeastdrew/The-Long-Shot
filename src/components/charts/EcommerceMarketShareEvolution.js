import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const EcommerceMarketShareEvolution = () => {
  const svgRef = useRef();
  const [selectedYear, setSelectedYear] = useState(2023);
  const [yearData, setYearData] = useState(null);
  const [error, setError] = useState(null);
  
  const ecommerceData = [
    {
      year: 2005,
      totalShare: 2.5,
      companies: [
        { name: "Amazon", share: 0.4, color: "#ff9900" },
        { name: "eBay", share: 0.6, color: "#e43137" },
        { name: "Walmart", share: 0.1, color: "#0071ce" },
        { name: "Other US", share: 0.7, color: "#7cb5ec" },
        { name: "International", share: 0.7, color: "#90ed7d" }
      ]
    },
    {
      year: 2010,
      totalShare: 4.2,
      companies: [
        { name: "Amazon", share: 1.2, color: "#ff9900" },
        { name: "eBay", share: 0.8, color: "#e43137" },
        { name: "Walmart", share: 0.3, color: "#0071ce" },
        { name: "Other US", share: 1.0, color: "#7cb5ec" },
        { name: "International", share: 0.9, color: "#90ed7d" }
      ]
    },
    {
      year: 2015,
      totalShare: 7.4,
      companies: [
        { name: "Amazon", share: 2.8, color: "#ff9900" },
        { name: "eBay", share: 0.9, color: "#e43137" },
        { name: "Walmart", share: 0.6, color: "#0071ce" },
        { name: "Other US", share: 1.5, color: "#7cb5ec" },
        { name: "International", share: 1.6, color: "#90ed7d" }
      ]
    },
    {
      year: 2020,
      totalShare: 14.0,
      companies: [
        { name: "Amazon", share: 5.6, color: "#ff9900" },
        { name: "eBay", share: 1.1, color: "#e43137" },
        { name: "Walmart", share: 1.3, color: "#0071ce" },
        { name: "Other US", share: 2.5, color: "#7cb5ec" },
        { name: "International", share: 3.5, color: "#90ed7d" }
      ]
    },
    {
      year: 2023,
      totalShare: 19.7,
      companies: [
        { name: "Amazon", share: 7.8, color: "#ff9900" },
        { name: "eBay", share: 1.2, color: "#e43137" },
        { name: "Walmart", share: 1.9, color: "#0071ce" },
        { name: "Other US", share: 3.6, color: "#7cb5ec" },
        { name: "International", share: 5.2, color: "#90ed7d" }
      ]
    }
  ];
  
  useEffect(() => {
    try {
      // Find the data for the selected year
      const selectedYearData = ecommerceData.find(d => d.year === selectedYear);
      if (selectedYearData) {
        setYearData(selectedYearData);
      }
      
      if (!svgRef.current) return;
      
      // Clear any previous rendering
      d3.select(svgRef.current).selectAll("*").remove();
      
      // Set up dimensions
      const width = 900;
      const height = 600;
      const margin = { top: 60, right: 120, bottom: 60, left: 80 };
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
        .text("E-commerce Market Share Evolution (2005-2023)");
      
      // Create chart group
      const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
      
      // Define scales
      const xScale = d3.scaleBand()
        .domain(ecommerceData.map(d => d.year))
        .range([0, innerWidth])
        .padding(0.3);
      
      const yScale = d3.scaleLinear()
        .domain([0, 22]) // Set max a bit higher than the highest total share
        .range([innerHeight, 0]);
      
      // Stack the data
      ecommerceData.forEach(yearData => {
        let cumulative = 0;
        yearData.companies.forEach(company => {
          company.start = cumulative;
          cumulative += company.share;
          company.end = cumulative;
        });
        yearData.total = cumulative;
      });
      
      // Add X axis
      g.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(xScale).tickSize(0))
        .call(g => g.select(".domain").attr("stroke", "#ccc"))
        .call(g => g.selectAll(".tick text")
          .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
          .attr("font-size", "14px")
          .attr("fill", "#666")
        );
      
      // Add Y axis
      g.append("g")
        .call(d3.axisLeft(yScale).tickFormat(d => d + "%").ticks(5))
        .call(g => g.select(".domain").attr("stroke", "#ccc"))
        .call(g => g.selectAll(".tick line")
          .attr("stroke", "#ccc")
          .attr("stroke-dasharray", "2,2")
          .attr("x2", innerWidth)
        )
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
        .attr("y", -50)
        .attr("text-anchor", "middle")
        .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
        .attr("font-size", "14px")
        .attr("fill", "#555")
        .text("Percentage of Total Retail Sales");
      
      // Add horizontal reference line at 20%
      g.append("line")
        .attr("x1", 0)
        .attr("x2", innerWidth)
        .attr("y1", yScale(20))
        .attr("y2", yScale(20))
        .attr("stroke", "#e74c3c")
        .attr("stroke-width", 1.5)
        .attr("stroke-dasharray", "4");
      
      g.append("text")
        .attr("x", 5)
        .attr("y", yScale(20) - 5)
        .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "#e74c3c")
        .text("20% Market Share");
      
      // Add stacked bars
      ecommerceData.forEach(yearData => {
        const barGroup = g.append("g")
          .attr("class", "year-group")
          .attr("transform", `translate(${xScale(yearData.year)}, 0)`)
          .attr("opacity", yearData.year === selectedYear ? 1 : 0.7)
          .on("click", () => setSelectedYear(yearData.year));
        
        // Add company segments
        yearData.companies.forEach(company => {
          barGroup.append("rect")
            .attr("x", 0)
            .attr("y", yScale(company.end))
            .attr("width", xScale.bandwidth())
            .attr("height", yScale(company.start) - yScale(company.end))
            .attr("fill", company.color)
            .attr("stroke", "#fff")
            .attr("stroke-width", 1);
        });
        
        // Add total label on top
        barGroup.append("text")
          .attr("x", xScale.bandwidth() / 2)
          .attr("y", yScale(yearData.total) - 10)
          .attr("text-anchor", "middle")
          .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
          .attr("font-size", "12px")
          .attr("font-weight", "bold")
          .attr("fill", "#333")
          .text(`${yearData.total.toFixed(1)}%`);
        
        // Highlight selected year
        if (yearData.year === selectedYear) {
          barGroup.append("rect")
            .attr("x", -3)
            .attr("y", 0)
            .attr("width", xScale.bandwidth() + 6)
            .attr("height", innerHeight)
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "5,5")
            .attr("opacity", 0.7)
            .lower();
        }
      });
      
      // Add legend
      const legend = svg.append("g")
        .attr("transform", `translate(${width - margin.right + 20}, ${margin.top + 10})`);
      
      const companies = ecommerceData[0].companies;
      
      companies.forEach((company, i) => {
        const legendRow = legend.append("g")
          .attr("transform", `translate(0, ${i * 25})`);
        
        legendRow.append("rect")
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", company.color)
          .attr("stroke", "#fff")
          .attr("stroke-width", 0.5);
        
        legendRow.append("text")
          .attr("x", 25)
          .attr("y", 12)
          .attr("font-family", "'Segoe UI', Roboto, Arial, sans-serif")
          .attr("font-size", "12px")
          .attr("fill", "#333")
          .text(company.name);
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
        .text("Source: Public.com, Visual Capitalist, eMarketer reports, company financial disclosures (2005-2023)");
    } catch (err) {
      console.error("Error in EcommerceMarketShareEvolution:", err);
      setError(err.toString());
    }
  }, [selectedYear]);
  
  if (error) {
    return (
      <div className="error-message p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <h3 className="font-bold">Error in E-commerce Market Share chart:</h3>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <svg ref={svgRef} className="w-full max-w-4xl"></svg>
      
      {yearData && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md w-full max-w-3xl">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-gray-800">
              E-commerce Market Share in {selectedYear}
            </h3>
            <div className="flex space-x-2">
              <button 
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                onClick={() => {
                  const currentIndex = ecommerceData.findIndex(d => d.year === selectedYear);
                  if (currentIndex > 0) {
                    setSelectedYear(ecommerceData[currentIndex - 1].year);
                  }
                }}
                disabled={selectedYear === ecommerceData[0].year}
              >
                ◄ Previous
              </button>
              <button 
                className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                onClick={() => {
                  const currentIndex = ecommerceData.findIndex(d => d.year === selectedYear);
                  if (currentIndex < ecommerceData.length - 1) {
                    setSelectedYear(ecommerceData[currentIndex + 1].year);
                  }
                }}
                disabled={selectedYear === ecommerceData[ecommerceData.length - 1].year}
              >
                Next ►
              </button>
            </div>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <div className="flex justify-between items-center">
              <div className="text-gray-700">Total E-commerce Share of Retail:</div>
              <div className="text-xl font-bold text-blue-800">
                {yearData.totalShare ? yearData.totalShare.toFixed(1) : '0'}%
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div className="h-2.5 rounded-full bg-blue-600" 
                   style={{ width: `${((yearData.totalShare || 0)/22)*100}%` }}></div>
            </div>
          </div>
          
          <div className="overflow-hidden bg-gray-50 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Share</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% of E-commerce</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {yearData.companies && yearData.companies.map((company, i) => (
                  <tr key={i} className="hover:bg-gray-100">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-3 h-3 mr-2" style={{ backgroundColor: company.color }}></div>
                        <div className="font-medium text-gray-900">{company.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                      {company && company.share !== undefined ? company.share.toFixed(1) : '0'}%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                      {company && company.share !== undefined && yearData.totalShare ? 
                        ((company.share / yearData.totalShare) * 100).toFixed(1) : '0'}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-sm text-gray-600 italic">
            Click on any year bar in the chart to see its detailed breakdown
          </div>
        </div>
      )}
    </div>
  );
};

export default EcommerceMarketShareEvolution; 