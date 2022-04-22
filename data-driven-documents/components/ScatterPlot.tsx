/* eslint-disable react-hooks/exhaustive-deps */
import { createAxis, createY } from "@lib/helpers";
import { Dimensions, Headers } from "@types";
import * as d3 from "d3";
import { scaleLinear, ScaleOrdinal, select } from "d3";
import { FC, useEffect, useRef } from "react";

interface ScatterPlotProps {
  color: ScaleOrdinal<string, string, never>;
  data: {
    category: string;
    x: number;
    y: number;
  }[];
  dimensions: Dimensions;
  headers: Headers;
  shape: ScaleOrdinal<string, string | null, never>;
}

export const ScatterPlot: FC<ScatterPlotProps> = ({
  color,
  data,
  dimensions,
  headers,
  shape,
}) => {
  const graphRef = useRef<SVGSVGElement>(null);
  const legendRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // build legend

    const categories = new Map(data.map((d) => [d.category, 1]));

    const legend = select(legendRef.current);
    legend.selectAll("*").remove();
    legend.attr("width", dimensions.width).attr("height", categories.size * 32);
    legend
      .selectAll()
      .data(categories.keys())
      .enter()
      .append("rect")
      .attr("height", 32)
      .attr("width", 32)
      .attr("y", (d, i) => 32 * i)
      .attr("class", "legend__color")
      .attr("fill", (d) => color(d));
    legend
      .selectAll()
      .data(categories.keys())
      .enter()
      .append("text")
      .attr("x", 40)
      .attr("y", (d, i) => 32 * i + 23)
      .attr("class", "legend__label")
      .text((d) => d);

    //build graph
    const graph = select(graphRef.current);
    graph.selectAll("*").remove();
    graph
      .attr("height", dimensions.height)
      .attr("width", dimensions.width)
      .attr("viewbox", [0, 0, dimensions.width, dimensions.height]);

    const [minX, maxX] = [
      Math.min(...data.map((d) => d.x)),
      Math.max(...data.map((d) => d.x)),
    ];
    const [minY, maxY] = [
      Math.min(...data.map((d) => d.y)),
      Math.max(...data.map((d) => d.y)),
    ];

    const { margin, maxWidth, height, width, yScale } = createY(
      dimensions,
      maxY,
      graph
    );

    const xScale = scaleLinear().domain([minX, maxX]).range([0, width]);
    yScale.domain([minY, maxY]).range([height, 0]);

    const { xAxis, yAxis, grid } = createAxis({
      headers,
      height,
      margin,
      maxWidth,
      width,
      xScale,
      yScale,
    });

    const g = graph
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    g.append("g").call(xAxis);
    g.append("g").call(yAxis);
    g.append("g").call(grid);

    g.append("g")
      .attr("stroke-width", 1.5)
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll("path")
      .data(data)
      .join("path")
      .attr("transform", (d) => `translate(${xScale(d.x)}, ${yScale(d.y)})`)
      .attr("fill", (d) => color(d.category))
      .attr("d", (d) => String(shape(d.category)));
  }, []);

  return (
    <>
      <svg ref={legendRef} />
      <svg ref={graphRef} />
    </>
  );
};
