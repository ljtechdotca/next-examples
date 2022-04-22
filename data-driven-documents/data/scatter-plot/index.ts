import * as d3 from "d3";
import { scaleOrdinal, schemePastel2, symbol, symbols } from "d3";
import data from "./data.json";

export const scatterPlot = {
  shape: scaleOrdinal(
    data.map((d) => d.category),
    symbols.map((s) => symbol().type(s)())
  ),
  color: scaleOrdinal(
    data.map((d) => d.category),
    schemePastel2
  ),
  data,
};
