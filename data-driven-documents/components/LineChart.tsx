import { createAxis, createY } from "@lib/helpers";
import { Dimensions, Headers } from "@types";
import { line, scaleTime, select, timeParse } from "d3";
import { FC, useEffect, useRef } from "react";

interface LineChartProps {
  color: string;
  data: {
    date: string;
    value: number;
  }[];
  dimensions: Dimensions;
  headers: Headers;
}

export const LineChart: FC<LineChartProps> = ({
  color,
  data,
  dimensions,
  headers,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();
    svg.attr("width", dimensions.width).attr("height", dimensions.height);
    const parseTime = timeParse("%Y-%m-%d");
    const parsedData = data.map((d) => ({
      date: parseTime(d.date as string) as Date,
      value: Number(d.value) || 0,
    }));
    const max = Math.max(...data.map((d) => d.value));

    const { margin, maxWidth, height, width, yScale } = createY(
      dimensions,
      max,
      svg
    );

    const xScale = scaleTime()
      .range([0, width])
      .domain([parsedData[0].date, parsedData[parsedData.length - 1].date]);
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

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);
    g.append("g").call(xAxis);
    g.append("g").call(yAxis);
    g.append("g").call(grid);

    g.append("path")
      .data([parsedData])
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        line()
          .x((d: any) => xScale(d.date))
          .y((d: any) => yScale(d.value)) as any
      );
  }, [color, data, dimensions, headers]);

  return <svg ref={svgRef} />;
};
