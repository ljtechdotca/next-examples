import { Headers, Margin } from "@types";
import { axisBottom, axisLeft, Selection } from "d3";

interface Options {
  headers: Headers;
  margin: Margin;
  width: number;
  maxWidth: number;
  height: number;
  xScale: any;
  yScale: any;
}

export const createAxis = ({
  headers,
  margin,
  width,
  maxWidth,
  height,
  xScale,
  yScale,
}: Options) => {
  const xAxis = (g: Selection<SVGGElement, unknown, null, undefined>) =>
    g
      .attr("class", "axis axis__x")
      .attr("transform", `translate(0, ${height})`)
      .call(axisBottom(xScale))
      .call((g) =>
        g
          .append("text")
          .attr("x", width / 2)
          .attr("y", 32)
          .attr("fill", "currentColor")
          .attr("text-anchor", "middle")
          .text(headers.x)
      );

  const yAxis = (g: Selection<SVGGElement, unknown, null, undefined>) =>
    g
      .attr("class", "axis axis__y")
      .call(axisLeft(yScale))
      .call((g) =>
        g
          .append("text")
          .attr("x", -maxWidth - 16)
          .attr("y", height / 2)
          .attr("fill", "currentColor")
          .attr("writing-mode", "vertical-lr")
          .attr("text-anchor", "middle")
          .text(headers.y)
      );

  const grid = (g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
    g
      .attr("stroke", "currentColor")
      .attr("stroke-opacity", 0.1)
      .call((g) => {
        try {
          const blah = g
            .append("g")
            .selectAll("line")
            .data(xScale.ticks())
            .join("line")
            .attr("x1", (d) => 0.5 + xScale(d))
            .attr("x2", (d) => 0.5 + xScale(d))
            .attr("y1", 0)
            .attr("y2", height);
          return blah;
        } catch (error) {
          console.error("No can do chief.");
        }
      })
      .call((g) =>
        g
          .append("g")
          .selectAll("line")
          .data(yScale.ticks())
          .join("line")
          .attr("y1", (d) => 0.5 + yScale(d))
          .attr("y2", (d) => 0.5 + yScale(d))
          .attr("x1", (d) => 0)
          .attr("x2", (d) => width)
      );

  return { xAxis, yAxis, grid };
};
