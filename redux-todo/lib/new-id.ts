export const newId = () => {
  return Math.floor(Math.random() * 0xffffff).toString(16);
};
