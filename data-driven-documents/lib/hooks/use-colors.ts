import { scaleOrdinal } from "d3";
import { useMemo } from "react";

export const useColors = (
  background: string[],
  keys: string[]
) => {
  const colors = useMemo(() => {
    return scaleOrdinal().domain(keys).range(background);
  }, [background, keys]);

  return colors;
};
