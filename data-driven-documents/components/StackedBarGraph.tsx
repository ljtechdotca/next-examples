import { useColors } from "@lib/hooks/use-colors";
import * as d3 from "d3";
import { FC, useEffect, useRef } from "react";

interface StackedBarGraphProps {
  background: string[];
  data: Record<string, any>[];
  dimensions: {
    width: number;
    height: number;
    margin: [number, number, number, number];
  };
}

export const StackedBarGraph: FC<StackedBarGraphProps> = ({
  data,
  background,
  dimensions,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // define colors
  const colors = useColors(background, Object.keys(data));

  useEffect(() => {
    // define, cleanup and init svg attributes
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", dimensions.width).attr("height", dimensions.height);

    // mock yAxis and find maximum width to add to left margin
    const stack = d3.stack().keys(["a", "b", "c"]).order(d3.stackOrderReverse)(
      data
    );
    const mathMax = d3.max(Object.values(stack[0]).map((d) => d[1] ?? 0)) ?? 0;
    console.log(mathMax);
    const yScale = d3.scaleLinear().rangeRound([100, 0]).domain([0, mathMax]);
    const yAxis = svg
      .append("g")
      .call(d3.axisLeft(yScale))
      .attr("class", "axis axis__y");
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
    const xScale = d3
      .scaleBand()
      .padding(0.1)
      .range([0, width])
      .domain(data.map((d) => d.name));
    yScale.range([height, 0]);

    // define the base
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // append x-axis
    g.append("g")
      .call(d3.axisBottom(xScale))
      .attr("class", "axis axis__x")
      .attr("transform", `translate(0, ${height})`);

    // append y-axis
    g.append("g").call(d3.axisLeft(yScale)).attr("class", "axis__y");

    // append stacked bar group
    const bars = g
      .selectAll()
      .data(stack)
      .enter()
      .append("g")
      .attr("fill", (d) => String(colors(d.key)));

    bars
      .selectAll(".bar")
      .data((d) => d)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(String(d.data.name)) ?? 0)
      .attr("y", (d) => yScale(d[1]))
      .attr("width", (d) => xScale.bandwidth())
      .attr("height", (d) => height - yScale(d[1]));
  }, [colors, data, dimensions.height, dimensions.margin, dimensions.width]);

  return <svg ref={svgRef} />;
};
