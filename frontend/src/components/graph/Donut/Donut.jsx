import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import "./Donut.scss"

const DonutChart = ({ data, width, height,heading }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const radius = Math.min(width, height) / 2;

    // Create arc generator
    const arc = d3.arc()
      .innerRadius(radius * 0.45)
      .outerRadius(radius * 0.8)
      .cornerRadius(1)
      .padAngle(1/radius);

    // Create pie generator
    const pie = d3.pie()
      .sort(null)
      .value(d => d.value);

    // Create color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Generate pie chart data
    const pieData = pie(data);

    // Append g element for each arc
    const g = svg.selectAll('.arc')
      .data(pieData)
      .enter().append('g')
      .attr('class', 'arc')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Append path elements for each arc
    g.append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.label));

    // Append text elements for labels
    g.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '0.15em')
      .attr('text-anchor', 'middle')
      .style('font-size', '10px') // Set label font size
      .text(d => d.data.label);
  }, [data, width, height]);

  return <svg ref={svgRef}></svg>;
};

export default DonutChart;