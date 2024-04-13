import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Histogram = ({ data, width, height }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const x = d3.scaleLinear()
      .domain(d3.extent(data))
      .range([0, innerWidth]);

    const bins = d3.histogram()
      .domain(x.domain())
      .thresholds(x.ticks(20))
      (data);

    const y = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length)])
      .nice()
      .range([innerHeight, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .selectAll('rect')
      .data(bins)
      .enter()
      .append('rect')
      .attr('x', d => x(d.x0) + 1)
      .attr('width', d => Math.max(0, x(d.x1) - x(d.x0) - 1))
      .attr('y', d => y(d.length))
      .attr('height', d => y(0) - y(d.length))
      .attr('fill', 'steelblue');

    svg.append('g')
      .attr('transform', `translate( ${margin.left},${margin.top})`)
      .call(yAxis);

    svg.append('g')
      .attr('transform', `translate(${margin.left},${innerHeight + margin.top})`)
      .call(xAxis);
  }, [data, width, height]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default Histogram;