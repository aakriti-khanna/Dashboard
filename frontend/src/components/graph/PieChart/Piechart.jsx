
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './Piechart.scss'; // Import SCSS file

const PieChart = ({ data, width = 600, height = 300 }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();
  const legendContain=useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(d3.schemeCategory10);

    const pie = d3.pie()
      .value(d => d.value);

    const arcs = pie(data);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2 - 1);

    svg.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('fill', d => color(d.data.label))
      .attr('d', arc)
      .on("mouseover", function(event, d) {
        const pointerPosition = d3.pointer(event, svgRef.current); // Get pointer position relative to SVG
        const chartRect = svgRef.current.getBoundingClientRect(); // Get SVG element's bounding rectangle

        const tooltipX = chartRect.left + pointerPosition[0];
        const tooltipY = chartRect.top + pointerPosition[1];

        tooltipRef.current.style.opacity = 0.9;
        tooltipRef.current.style.left = `${tooltipX}px`;
        tooltipRef.current.style.top = `${tooltipY - 28}px`;

        tooltipRef.current.innerHTML = `${d.data.label}: ${d.data.value}`;
      })
      .on("mouseout", function() {
        tooltipRef.current.style.opacity = 0;
      });

      const legend = svg.selectAll('.legend')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(-${width / 2 - 10}, ${i * 20 - height / 2 + 10})`);

    legend.append('rect')
    .attr('class','rect')
      .attr('width', 10)
      .attr('height', 10)
      .attr('margin',50)
      .attr('fill', d => color(d.label));

    legend.append('text')
    .attr("class", "legend-text")
      .attr('x', 15)
      .attr('y', 8)
      .text(d => d.label);

  }, [data, width, height]);

  return (
    <div className="container">
    <div className="pie-chart-container">
      <svg ref={svgRef}></svg>
      
    </div>
    <div ref={tooltipRef} className="tooltip"></div>

    <div ref={legendContain} className='legend'></div>
    </div>
  );
};

export default PieChart;


// import React, { useRef, useEffect } from 'react';
// import * as d3 from 'd3';
// import './Piechart.scss'; // Import SCSS file

// const PieChart = ({ data, width = 300, height = 300 }) => {
//   const svgRef = useRef();
//   const tooltipRef = useRef();
//   const legendRef = useRef();

//   useEffect(() => {
//     const svg = d3.select(svgRef.current)
//       .attr('width', width)
//       .attr('height', height)
//       .append('g')
//       .attr('transform', `translate(${width / 2}, ${height / 2})`);

//     const color = d3.scaleOrdinal()
//       .domain(data.map(d => d.label))
//       .range(d3.schemeCategory10);

//     const pie = d3.pie()
//       .value(d => d.value);

//     const arcs = pie(data);

//     const arc = d3.arc()
//       .innerRadius(0)
//       .outerRadius(Math.min(width, height) / 2 - 1);

//     svg.selectAll('path')
//       .data(arcs)
//       .enter()
//       .append('path')
//       .attr('fill', d => color(d.data.label))
//       .attr('d', arc)
//       .on("mouseover", function(event, d) {
//         const pointerPosition = d3.pointer(event, svgRef.current); // Get pointer position relative to SVG
//         const chartRect = svgRef.current.getBoundingClientRect(); // Get SVG element's bounding rectangle

//         const tooltipX = chartRect.left + pointerPosition[0];
//         const tooltipY = chartRect.top + pointerPosition[1];

//         tooltipRef.current.style.opacity = 0.9;
//         tooltipRef.current.style.left = `${tooltipX}px`;
//         tooltipRef.current.style.top = `${tooltipY - 28}px`;

//         tooltipRef.current.innerHTML = `${d.data.label}: ${d.data.value}`;
//       })
//       .on("mouseout", function() {
//         tooltipRef.current.style.opacity = 0;
//       });

//     const legend = d3.select(legendRef.current)
//       .selectAll('.legend')
//       .data(data)
//       .enter()
//       .append('div')
//       .attr('class', 'legend');

//     legend.append('div')
//       .attr('class', 'legend-color')
//       .style('background-color', d => color(d.label));

//     legend.append('div')
//       .attr('class', 'legend-label')
//       .text(d => d.label);

//   }, [data, width, height]);

//   return (
//     <div className="container">
//       <div className="pie-chart-container">
//         <svg ref={svgRef}></svg>
//         <div ref={tooltipRef} className="tooltip"></div>
//       </div>
//       <div ref={legendRef} className='legend-container'></div>
//     </div>
//   );
// };

// export default PieChart;


// import React, { useRef, useEffect } from 'react';
// import * as d3 from 'd3';
// import './Piechart.scss'; // Import SCSS file

// const PieChart = ({ data, width = 400, height = 400 }) => {
//   const svgRef = useRef();
//   const tooltipRef = useRef();
//   const legendRef = useRef();

//   useEffect(() => {
//     const svg = d3.select(svgRef.current)
//       .attr('width', width)
//       .attr('height', height)
//       .append('g')
//       .attr('transform', `translate(${width / 2}, ${height / 2})`);

//     const color = d3.scaleOrdinal()
//       .domain(data.map(d => d.label))
//       .range(d3.schemeCategory10);

//     const pie = d3.pie()
//       .value(d => d.value);

//     const arcs = pie(data);

//     const arc = d3.arc()
//       .innerRadius(0)
//       .outerRadius(Math.min(width, height) / 2 - 1);

//     svg.selectAll('path')
//       .data(arcs)
//       .enter()
//       .append('path')
//       .attr('fill', d => color(d.data.label))
//       .attr('d', arc)
//       .on("mouseover", function(event, d) {
//         const pointerPosition = d3.pointer(event, svgRef.current); // Get pointer position relative to SVG
//         const chartRect = svgRef.current.getBoundingClientRect(); // Get SVG element's bounding rectangle

//         const tooltipX = chartRect.left + pointerPosition[0];
//         const tooltipY = chartRect.top + pointerPosition[1];

//         tooltipRef.current.style.opacity = 0.9;
//         tooltipRef.current.style.left = `${tooltipX}px`;
//         tooltipRef.current.style.top = `${tooltipY - 28}px`;

//         tooltipRef.current.innerHTML = `${d.data.label}: ${d.data.value}`;
//       })
//       .on("mouseout", function() {
//         tooltipRef.current.style.opacity = 0;
//       });

//     const legend = d3.select(legendRef.current)
//       .selectAll('.legend')
//       .data(data)
//       .enter()
//       .append('div')
//       .attr('class', 'legend');

//     legend.append('div')
//       .attr('class', 'legend-color')
//       .style('background-color', d => color(d.label));

//     legend.append('div')
//       .attr('class', 'legend-label')
//       .text(d => d.label);

//   }, [data, width, height]);

//   return (
//     <div className="container" style={{ width: width + 200, height: height }}>
//       <div className="pie-chart-container" style={{ width: width, height: height }}>
//         <svg ref={svgRef}></svg>
//         <div ref={tooltipRef} className="tooltip"></div>
//       </div>
//       <div ref={legendRef} className='legend-container'></div>
//     </div>
//   );
// };

// export default PieChart;

