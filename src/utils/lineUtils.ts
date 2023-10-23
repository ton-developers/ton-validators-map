export type Point = [number, number]
export type Line = [Point, Point]

export function getLineLength(line: Line) {
  const [p1, p2] = line
  const x = p1[0] - p2[0]
  const y = p1[1] - p2[1]
  return Math.sqrt(x * x + y * y)
}

export function areLinesIntersecting(line1: Line, line2: Line): boolean {
  const [[a, b], [c, d]] = line1;
  const [[p, q], [r, s]] = line2;

  const det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    const lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    const gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
  }
}