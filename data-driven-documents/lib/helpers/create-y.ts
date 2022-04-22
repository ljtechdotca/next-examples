import { Dimensions, Margin } from "@types";
import { axisLeft, scaleLinear } from "d3";

export const createY = (
  dimensions: Dimensions,
  max: number,
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>
) => {
  const yScale = scaleLinear().rangeRound([100, 0]).domain([0, max]);
  const yAxis = svg.append("g").call(axisLeft(yScale)).attr("class", "axis__y");
  let maxWidth = 0;
  yAxis.selectAll(".tick>text").each(function (d) {
    const boxWidth = (this as SVGTextElement).getBBox().width;
    if (boxWidth > maxWidth) maxWidth = boxWidth;
  });
  yAxis.remove();
  const margin: Margin = {
    top: dimensions.margin[0],
    right: dimensions.margin[1],
    bottom: dimensions.margin[2],
    left: maxWidth + dimensions.margin[3],
  };
  const width = dimensions.width - margin.left - margin.right;
  const height = dimensions.height - margin.top - margin.bottom;


  return {
    height,
    margin,
    maxWidth,
    width,
    yScale,
  };
};
