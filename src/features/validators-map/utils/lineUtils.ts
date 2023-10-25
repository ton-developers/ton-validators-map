export type Point = [number, number]
export type Line = [Point, Point]
export type Vector = Point

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

export function getLineMidpoint(line: Line): Point {
  const [p1, p2] = line
  return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2]
}

export function getPerpendicularVector(line: Line, length: number): Point {
  const [p1, p2] = line
  const vector: Vector = [p2[0] - p1[0], p2[1] - p1[1]]

  const knownX = 1

  const perpendicularVector: Vector = [knownX, -vector[0] / vector[1] * knownX]

  return getVectorOfLength(perpendicularVector, length)
}

export function getVectorOfLength(vector: Vector, length: number): Vector {
  const [x, y] = vector
  const ratio = length / Math.sqrt(x * x + y * y)
  return [x * ratio, y * ratio]
}

export function addVectors(v1: Vector, v2: Vector): Vector {
  return [v1[0] + v2[0], v1[1] + v2[1]]
}

export function reverseVector(vector: Vector): Vector {
  return [-vector[0], -vector[1]]
}

export function getDistanceBetweenLineAndPoint(line: Line, point: Point): number {
  const [[x1, y1], [x2, y2]] = line
  const [x0, y0] = point

  return Math.abs((x2 - x1) * (y1 - y0) - (x1 - x0) * (y2 - y1)) / Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

export function getDistanceBetweenPoints(p1: Point, p2: Point): number {
  const [x1, y1] = p1
  const [x2, y2] = p2

  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

export function getLineAngle(line: Line) {
  const [p1, p2] = line
  const dx = p2[0] - p1[0]
  const dy = p2[1] - p1[1]
  return Math.abs(Math.atan(dy / dx))
}

export function areLinesClose(line1: Line, line2: Line): boolean {
  const line1Angle = getLineAngle(line1)
  const line2Angle = getLineAngle(line2)

  if (Math.abs(line1Angle - line2Angle) > Math.PI / 10) {
    return false
  }

  const distances = [
    getDistanceBetweenLineAndPoint(line1, line2[0]),
    getDistanceBetweenLineAndPoint(line1, line2[1]),
    getDistanceBetweenLineAndPoint(line2, line1[0]),
    getDistanceBetweenLineAndPoint(line2, line1[1]),
  ]

  if (Math.max(...distances) > 5) {
    return false
  }

  return true
}