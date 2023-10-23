type Point = [number, number]
type Line = [Point, Point]

export function connectDots(points: Point[]) {
  const lines = connectAllToAll(points)
  const linesToRemove: number[] = []
  for (let i = 0; i < lines.length - 1; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      if (linesToRemove.includes(j) || linesToRemove.includes(i)) {
        continue
      }
      if (areIntersecting(lines[i], lines[j])) {
        if (getLineLength(lines[i]) > getLineLength(lines[j])) {
          linesToRemove.push(i)
        } else {
          linesToRemove.push(j)
        }
      }
    }
  }
  return lines.filter((_, i) => !linesToRemove.includes(i))
}

function connectAllToAll(points: Point[]) {
  const lines: Line[] = []
  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      lines.push([points[i], points[j]])
    }
  }
  return lines
}

function getLineLength(line: Line) {
  const [p1, p2] = line
  const x = p1[0] - p2[0]
  const y = p1[1] - p2[1]
  return Math.sqrt(x * x + y * y)
}

function areIntersecting(line1: Line, line2: Line): boolean {
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