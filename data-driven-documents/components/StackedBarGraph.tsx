import { useScale } from "@lib/hooks";
import { useColors } from "@lib/hooks/use-colors";
import * as d3 from "d3";
import { FC, useEffect, useRef } from "react";

interface StackedBarGraphProps {
  background: string[];
  foreground: string;
  data: Record<string, any>[];
  width?: number;
  height?: number;
}

export const StackedBarGraph: FC<StackedBarGraphProps> = ({
  data,
  background,
  foreground,
  width = 250,
  height = 250,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // define colors
  const colors = useColors(background, Object.keys(data));

  // task : enter the param using maximum value found in the data prop
  const mathMax = 140;
  const scale = useScale(mathMax, height);

  useEffect(() => {
    if (svgRef.current) {
      // define svg
      const svg = d3.select(svgRef.current);

      // define stack
      const stack = d3
        .stack()
        .keys(["a", "b", "c"])
        .order(d3.stackOrderReverse)(data);

      // define x and y

      const y = d3.scaleLinear().rangeRound([100, 0]).domain([0, mathMax]);

      // options
      svg.attr("width", width).attr("height", height);

      // define y axis

      const yAxis = svg
        .append("g")
        .attr("class", "axis axis__y")
        .call(d3.axisLeft(y));

      let maxWidth = 0;
      yAxis.selectAll(".tick>text").each(function () {
        if (this instanceof SVGSVGElement) {
          const width = this.getBBox().width;
          if (width > maxWidth) maxWidth = width;
        }
      });
      yAxis.remove();

      // define plot margins
      const margins = {
        top: 16,
        right: 16,
        bottom: 32,
        left: maxWidth + 8,
      };
      const plotWidth =
        svgRef.current.getBoundingClientRect().width -
        margins.left -
        margins.right;
      const plotHeight =
        svgRef.current.getBoundingClientRect().height -
        margins.top -
        margins.bottom;

      // define datum
      const datum = svg
        .selectAll("g")
        .data(stack)
        .enter()
        .append("g")
        .attr("transform", `translate(${margins.left}, ${margins.top})`)
        .attr("fill", (d, i) => String(colors(d.key)))
        .selectAll("rect")
        .data((d) => d)
        .enter()
        .append("rect");

      y.range([plotHeight, 0]);

      const x = d3
        .scaleBand()
        .paddingInner(0.25)
        .paddingOuter(0.25)
        .align(1)
        .range([0, plotWidth])
        .padding(0.1)
        .domain(data.map((d) => d.name));

      const xAxis = svg
        .append("g")
        .attr("class", "axis axis__x")
        .call(d3.axisBottom(x));

      xAxis.attr("transform", `translate(0, ${plotHeight})`);

      // init datum
      datum
        .attr("height", (d, i) => plotHeight - y(d[1]))
        .attr("width", x.bandwidth())
        .attr("x", (d, i) => Number(x(String(d.data.name))))
        .attr("y", (d, i) => y(d[1]));
    }
  }, [colors, data, foreground, height, scale, width]);

  return <svg ref={svgRef} />;
};
