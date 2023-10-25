import { useState, useEffect } from "react";
import type { useTonValidators } from "@/features/validators-map/hooks/useTonValidators";
import type { MapConverter } from "@/features/validators-map/utils/MapConverter";
import { clusterizeValidators } from "@/features/validators-map/utils/clusterizeValidators";
import { Line, Point, areLinesIntersecting, getLineLength, getDistanceBetweenLines } from "@/features/validators-map/utils/lineUtils";

import ValidatorsConnection from "./ValidatorsConnection";
import Validator from "./Validator";

type ScreenSizeMode = 'sm' | 'md' | 'lg'

export interface ValidatorsMapProps {
  mapConverter: MapConverter;
  data: ReturnType<typeof useTonValidators>["data"];
  screenSizeMode?: ScreenSizeMode;
}

export default function Validators({ mapConverter, data, screenSizeMode = 'lg' }: ValidatorsMapProps) {
  const [clusters, setClusters] = useState<ReturnType<typeof clusterizeValidators>>([]);
  const [lines, setLines] = useState<Line[]>([]);

  const screenSizeModeToZoom: Record<ScreenSizeMode, number> = {
    sm: 1,
    md: 1,
    lg: 2,
  }

  useEffect(() => {
    if (data) {
      const clusters = clusterizeValidators(data, screenSizeModeToZoom[screenSizeMode]);
      setClusters(clusters);
      const lines = connectDots(clusters.map(item => {
        const coords = mapConverter.svgCoordsFromGeoCoords(item.geometry.coordinates);
        return [coords[0], coords[1]];
      }));
      
      setLines(lines.map(pointPair => [
        [pointPair[0][0], pointPair[0][1]],
        [pointPair[1][0], pointPair[1][1]]
      ]));
    }
  }, [data, screenSizeMode]);

  return (
    <>
      <g id="connections">
        <defs>
          <linearGradient 
            id="connection-linear-gradient"
            gradientTransform="rotate(145 .5 .5)">
              <stop offset="0" stopColor="#FFF" stopOpacity="0.1" />
              <stop offset="1" stopColor="#FFF" />
          </linearGradient>
        </defs>
        {
          lines.map((pointPair, index) => (<>
            <ValidatorsConnection key={`line-${index}`} line={pointPair} />
          </>))
        }
      </g>
      <g id="validators">
        {
          clusters.map((item, index) => (<>
            <Validator key={`validator-${index}`} mapConverter={mapConverter} item={item} />
          </>))
        }
      </g>
    </>
  )
}

function connectDots(points: Point[]) {
  let lines = connectAllToAll(points)
  let linesToRemove: number[] = []
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

  lines = lines.filter((_, i) => !linesToRemove.includes(i))
  linesToRemove = []

  for (let i = 0; i < lines.length - 1; i++) {
    for (let j = i + 1; j < lines.length; j++) {
      if (linesToRemove.includes(j) || linesToRemove.includes(i)) {
        continue
      }
      const lineJLength = getLineLength(lines[j])
      const lineILength = getLineLength(lines[i])
      const distance = getDistanceBetweenLines(lines[i], lines[j])
      if (distance < Math.min(lineILength, lineJLength) / 50) {
        if (lineILength > lineJLength) {
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