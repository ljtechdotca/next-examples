import styles from "@assets/Home.module.scss";
import { BarGraph } from "@components/BarGraph";
import { StackedBarGraph } from "@components/StackedBarGraph";
import { barGraph } from "@data/bar-graph";
import { stackedBarGraph } from "@data/stacked-bar-graph";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h2>Bar Graph</h2>
      <BarGraph
        background={barGraph.background}
        data={barGraph.data}
        dimensions={{ width: 300, height: 300, margin: [16, 16, 32, 16] }}
      />
      <br />
      <h2>Stacked Bar Graph</h2>
      <StackedBarGraph
        background={stackedBarGraph.background}
        data={stackedBarGraph.data}
        dimensions={{ width: 300, height: 300, margin: [16, 16, 32, 16] }}
      />
    </div>
  );
};

export default Home;
