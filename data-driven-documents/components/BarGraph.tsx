import { createAxis, createY } from "@lib/helpers";
import { Dimensions, Headers } from "@types";
import * as d3 from "d3";
import { ScaleOrdinal } from "d3";
import { FC, useEffect, useRef } from "react";

interface BarGraphProps {
  color: ScaleOrdinal<string, string, never>;
  data: { name: string; value: number }[];
  dimensions: Dimensions;
  headers: Headers;
}

export const BarGraph: FC<BarGraphProps> = ({
  color,
  data,
  dimensions,
  headers,
}) => {
  const graphRef = useRef<SVGSVGElement>(null);
  const legendRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // build legend
    const legend = d3.select(legendRef.current);
    legend.selectAll("*").remove();
    legend.attr("width", dimensions.width).attr("height", data.length * 32);
    legend
      .selectAll()
      .data(data.map((d) => d.name))
      .enter()
      .append("rect")
      .attr("height", 32)
      .attr("width", 32)
      .attr("y", (d, i) => 32 * i)
      .attr("class", "legend__color")
      .attr("fill", (d) => color(d));
    legend
      .selectAll()
      .data(data.map((d) => d.name))
      .enter()
      .append("text")
      .attr("x", 40)
      .attr("y", (d, i) => 32 * i + 23)
      .attr("class", "legend__label")
      .text((d) => d);

    // build graph
    const graph = d3.select(graphRef.current);
    graph.selectAll("*").remove();
    graph.attr("width", dimensions.width).attr("height", dimensions.height);
    const max = Math.max(...data.map((d) => d.value));
    const { margin, maxWidth, height, width, yScale } = createY(
      dimensions,
      max,
      graph
    );

    const xScale = d3
      .scaleBand()
      .padding(0.1)
      .range([0, width])
      .domain(data.map((d) => d.name));
    yScale.range([height, 0]);

    const { xAxis, yAxis, grid } = createAxis({
      headers,
      margin,
      maxWidth,
      width,
      height,
      xScale,
      yScale,
    });

    const g = graph
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    g.append("g").call(xAxis);
    g.append("g").call(yAxis);
    g.append("g").call(grid);

    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.name) ?? 0)
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d.value))
      .attr("fill", (d) => color(d.name));
  }, [color, data, dimensions, headers]);

  return (
    <>
      <svg ref={legendRef} />
      <svg ref={graphRef} />
    </>
  );
};
