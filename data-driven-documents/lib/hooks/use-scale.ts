import { Options } from "@types";
import { useMemo } from "react";

export const useScale = (max: number, height: number) => {
  const scale = useMemo(
    () => height / Math.log(max),
    [height, max]
  );

  return scale;
};
