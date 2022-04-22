import styles from "@assets/Home.module.scss";
import { BarGraph } from "@components/BarGraph";
import { LineChart } from "@components/LineChart";
import { ScatterPlot } from "@components/ScatterPlot";
import { StackedBarGraph } from "@components/StackedBarGraph";
import { barGraph } from "@data/bar-graph";
import { lineChart } from "@data/line-chart";
import { scatterPlot } from "@data/scatter-plot";
import { stackedBarGraph } from "@data/stacked-bar-graph";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <LineChart
        {...lineChart}
        headers={{
          x: "Time",
          y: "Close",
        }}
        dimensions={{ width: 800, height: 400, margin: [16, 16, 32, 32] }}
      />
      <ScatterPlot
        {...scatterPlot}
        headers={{
          x: "Sepal width (cm)",
          y: "Sepal length (cm)",
        }}
        dimensions={{ width: 800, height: 400, margin: [16, 16, 32, 32] }}
      />
      <BarGraph
        {...barGraph}
        headers={{
          x: "Three Letter Words",
          y: "Popularity",
        }}
        dimensions={{ width: 800, height: 400, margin: [16, 16, 32, 32] }}
      />
      <StackedBarGraph
        {...stackedBarGraph}
        headers={{
          x: "Country",
          y: "Population",
        }}
        dimensions={{ width: 800, height: 400, margin: [16, 16, 32, 32] }}
        keys={["a", "b", "c"]}
      />
    </div>
  );
};

export default Home;
