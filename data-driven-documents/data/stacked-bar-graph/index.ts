import { scaleOrdinal, schemePastel2 } from "d3";
import data from "./data.json";

export const stackedBarGraph = {
  color: scaleOrdinal(
    data.map((d) => d.name),
    schemePastel2
  ),
  data,
};
