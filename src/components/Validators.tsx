import { useState, useEffect } from "react";
import { useTonValidators } from "@/hooks/useTonValidators";
import type { MapConverter } from "@/utils/MapConverter";
import { clusterizeValidators } from "@/utils/clusterizeValidators";
import { Line, Point, areLinesIntersecting, getLineLength } from "@/utils/lineUtils";

import ValidatorsConnection from "./ValidatorsConnection";
import Validator from "./Validator";

export interface ValidatorsMapProps {
  mapConverter: MapConverter;
}

export default function Validators({ mapConverter }: ValidatorsMapProps) {
  const { data, loading } = useTonValidators();
  const [clusters, setClusters] = useState<ReturnType<typeof clusterizeValidators>>([]);
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    if (data) {
      const clusters = clusterizeValidators(data, 1);
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
  }, [data]);

  return (
    <>
      <g id="connections">
        <defs>
          <linearGradient 
            id="connection-linear-gradient"
            gradientTransform="rotate(145 .5 .5)">
              <stop offset="0" stopColor="#FFF" />
              <stop offset="1" stopColor="#FFF" stopOpacity={0.05} />
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