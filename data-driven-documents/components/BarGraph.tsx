import { barGraph } from "@data/bar-graph";
import * as d3 from "d3";
import { FC, useEffect, useRef } from "react";

interface Item {
  value: number;
  name: string;
}

// interface BarGraphProps {
//   data: Item[];
//   background: string;
//   foreground: string;
//   width?: number;
//   height?: number;
// }

export const BarGraph: FC = ({}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  // const scale = useScale(mathMax, height);

  useEffect(() => {
    if (svgRef.current) {
      const mathMax = Math.max(...barGraph.data.map((d) => d.value));
      const background = "dodgerblue";
      const foreground = "black";
      const width = 300;
      const height = 300;
      const margin = {
        top: 16,
        right: 16,
        bottom: 16,
        left: 16,
      };
      // const scale = height / Math.log(mathMax);
      const svg = d3.select(svgRef.current);

      const y = d3.scaleLinear().range([height, 0]).domain([0, mathMax]);

      // define x and y axis

      svg.append("g").call(d3.axisLeft(y)).attr("class", "axis__y");

      // init svg
      svg.attr("width", width).attr("height", height);

      // define datum
      const datum = svg
        .append("g")
        .selectAll("rect")
        .data(barGraph.data)
        .enter()
        .append("rect")
        .attr("class", "datum");

      const x = d3
        .scaleBand()
        .padding(0.1)
        .range([0, width])
        .domain(barGraph.data.map((d) => d.name));
      svg
        .append("g")
        .call(d3.axisBottom(x))
        .attr("class", "axis__x")
        .attr("transform", `translate(0, ${height})`);

      // init datum
      datum
        .attr("height", (d, i) => {
          console.log(d.value);
          return Math.log(d.value) * scale;
        })
        .attr("width", x.bandwidth())
        .attr("x", (d, i) => Number(x(d.name)))
        .attr("y", (d, i) => height - Math.log(d.value) * scale)
        .attr("fill", background);
    }
  }, []);

  return <svg ref={svgRef} />;
};
