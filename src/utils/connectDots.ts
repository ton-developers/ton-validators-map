import { Point, Line, areLinesIntersecting, getLineLength } from './lineUtils'

export function connectDots(points: Point[]) {
  const lines = connectAllToAll(points)
  const linesToRemove: number[] = []
  for (let i = 0; i < lines.length - 1; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      if (linesToRemove.includes(j) || linesToRemove.includes(i)) {
        continue
      }
      if (areLinesIntersecting(lines[i], lines[j])) {
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