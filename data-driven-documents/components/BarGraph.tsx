import * as d3 from "d3";
import { FC, useEffect, useRef } from "react";

interface BarGraphProps {
  data: { name: string; value: number }[];
  background: string;
  dimensions: {
    width: number;
    height: number;
    margin: [number, number, number, number];
  };
}

export const BarGraph: FC<BarGraphProps> = ({
  data,
  background,
  dimensions,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // define, cleanup, and initialize svg attributes
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", dimensions.width).attr("height", dimensions.height);

    // mock yAxis and find maximum width to add to left margin
    const mathMax = Math.max(...data.map((d) => d.value));
    const yScale = d3.scaleLinear().range([100, 0]).domain([0, mathMax]);
    const yAxis = svg
      .append("g")
      .call(d3.axisLeft(yScale))
      .attr("class", "axis__y");
    let mw = 0;
    yAxis.selectAll(".tick>text").each(function (d) {
      const w = (this as SVGTextElement).getBBox().width;
      if (w > mw) mw = w;
    });
    yAxis.remove();

    // define plot dimensions
    const margin = {
      top: dimensions.margin[0],
      right: dimensions.margin[1],
      bottom: dimensions.margin[2],
      left: mw + dimensions.margin[3],
    };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;
    // set x and y axis ranges using new plot dimensions
    yScale.range([height, 0]);
    const xScale = d3
      .scaleBand()
      .padding(0.1)
      .range([0, width])
      .domain(data.map((d) => d.name));

    // define the base
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // append axis x
    g.append("g")
      .call(d3.axisBottom(xScale))
      .attr("class", "axis__x")
      .attr("transform", `translate(0, ${height})`);

    // append axis y
    g.append("g").call(d3.axisLeft(yScale)).attr("class", "axis__y");

    // append rect.bar
    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.name) ?? 0)
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.value))
      .attr("fill", background);
  }, [
    background,
    data,
    dimensions.height,
    dimensions.margin,
    dimensions.width,
  ]);

  return <svg ref={svgRef} />;
};
