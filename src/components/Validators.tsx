import { useState, useEffect } from "react";
import { useTonValidators } from "@/hooks/useTonValidators";
import type { MapConverter } from "@/utils/MapConverter";
import { clusterizeValidators } from "@/utils/clusterizeValidators";
import { connectDots } from "@/utils/connectDots";
import styles from "@/styles/ValidatorsMap.module.css";

export interface ValidatorsMapProps {
  mapConverter: MapConverter;
}

export default function Validators({ mapConverter }: ValidatorsMapProps) {
  const { data, loading } = useTonValidators();
  const [clusters, setClusters] = useState<ReturnType<typeof clusterizeValidators>>([]);
  const [lines, setLines] = useState<number[][][]>([]);

  useEffect(() => {
    if (data) {
      const clusters = clusterizeValidators(data, 1);
      setClusters(clusters);
      const lines = connectDots(clusters.map(item => {
        const coords = mapConverter.svgCoordsFromGeoCoords(item.geometry.coordinates);
        return {
          coords: {
            x: coords[0],
            y: coords[1]
          }
        }
      }));
      
      setLines(lines.map(pointPair => [
        [pointPair[0].coords.x, pointPair[0].coords.y],
        [pointPair[1].coords.x, pointPair[1].coords.y]
      ]));
    }
  }, [data]);

  return (
    <>
      <g>
        <defs>
          <linearGradient 
            id="connection-linear-gradient"
            gradientTransform="rotate(145 .5 .5)">
              <stop offset="0" stopColor="#FFF" />
              <stop offset="1" stopColor="#FFF" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        {
          lines.map((pointPair, index) => {
            const middlePoint = [
              (pointPair[0][0] + pointPair[1][0]) / 2 + 10,
              (pointPair[0][1] + pointPair[1][1]) / 2 - 20
            ];
            return (
              <path
                key={`line-${index}`}
                d={`M${pointPair[0][0]} ${pointPair[0][1]} Q ${middlePoint[0]} ${middlePoint[1]} ${pointPair[1][0]} ${pointPair[1][1]}`}
                className={styles.validatorsLink}
              />
            )
          })
        }
      </g>
      <g>
        {
          clusters.map((item, index) => {
            const count = item.properties.point_count || 1;
            const coords = mapConverter.svgCoordsFromGeoCoords(item.geometry.coordinates);
            const radius = 5 + Math.log(count) * 2;
            const fontSize = 7 + Math.log(count) / 3;
            return (
              <g key={`validator-${index}`}>
                <circle
                  cx={coords[0]}
                  cy={coords[1]}
                  r={radius}
                  className={styles.validatorDot}
                />
                <text
                  x={coords[0]}
                  y={coords[1]}
                  dy={fontSize / 6}
                  fontSize={fontSize}
                  className={styles.validatorText}
                >{count}</text>
              </g>
            )
          })
        }
      </g>
    </>
  )
}