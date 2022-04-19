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
        background={barGraph.colors.background}
        foreground={barGraph.colors.foreground}
        data={barGraph.data}
      />
      {/* <br />
      <h2>Stacked Bar Graph</h2>
      <StackedBarGraph
        height={320}
        background={stackedBarGraph.colors.background}
        foreground={stackedBarGraph.colors.foreground}
        data={stackedBarGraph.data}
      /> */}
    </div>
  );
};

export default Home;
