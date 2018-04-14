export default (gap) => {
  if (gap <= -5000) return [50, -40];
  if (gap <= -400) return [45, -36];
  if (gap <= -300) return [40, -32];
  if (gap <= -200) return [35, -28];
  if (gap <= -150) return [30, -24];
  if (gap <= -100) return [20, -16];
  if (gap <= -50) return [13, -10];
  if (gap <= 25) return [8, -7];
  if (gap <= 50) return [7, -6];
  if (gap <= 100) return [6, -5];
  if (gap <= 150) return [5, -4];
  if (gap <= 200) return [4, -3];
  if (gap <= 300) return [3, -2];
  if (gap <= 400) return [2, -1];
  return [1, 0];
};
