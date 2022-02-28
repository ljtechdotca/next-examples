export const uuid = () => {
  const bit = () => {
    return ~~(Math.random() * 0xffffff);
  };
  return bit().toString(16).padEnd(6, "0");
};
