import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './Heatmap.scss'; // Import CSS file for styling

const Heatmap = ({ data }) => {
  const svgRef = useRef(null);
  const margin = { top: 30, right: 30, bottom: 30, left: 30 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  useEffect(() => {
    if (!data || data.length === 0) return;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const colorScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range(['lightblue', 'darkblue']);

    const rectWidth = width / data.length;

    svg.selectAll('.heatmap-rect')
      .data(data)
      .enter()
      .append('rect')
      .classed('heatmap-rect', true)
      .attr('x', (d, i) => i * rectWidth)
      .attr('y', 0)
      .attr('width', rectWidth)
      .attr('height', height)
      .style('fill', d => colorScale(d.value));

    svg.selectAll('.heatmap-label')
      .data(data)
      .enter()
      .append('text')
      .classed('heatmap-label', true)
      .attr('x', (d, i) => i * rectWidth + rectWidth / 2)
      .attr('y', 20)
      .text(d => d.label);
  }, [data, height, margin.left, margin.top, width]);

  return (
    <div className="heatmap-container">
      <svg ref={svgRef} className="heatmap-svg"></svg>
    </div>
  );
};

export default Heatmap;