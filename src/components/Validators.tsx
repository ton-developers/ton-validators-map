import { useState, useEffect } from "react";
import { useTonValidators } from "@/hooks/useTonValidators";
import type { MapConverter } from "@/utils/MapConverter";
import { clusterizeValidators } from "@/utils/clusterizeValidators";
import styles from "@/styles/ValidatorsMap.module.css";

export interface ValidatorsMapProps {
  mapConverter: MapConverter;
}

export default function Validators({ mapConverter }: ValidatorsMapProps) {
  const { data, loading } = useTonValidators();
  const [clusters, setClusters] = useState<ReturnType<typeof clusterizeValidators>>([]);

  useEffect(() => {
    if (data) {
      const clusters = clusterizeValidators(data, 1);
      setClusters(clusters);
    }
  }, [data]);

  return (
    <>
      {
        clusters.map((item, index) => {
          const count = item.properties.point_count || 1;
          const coords = mapConverter.svgCoordsFromGeoCoords(item.geometry.coordinates);
          const radius = 5 + Math.log(count) * 2;
          const fontSize = 7 + Math.log(count) / 3;
          return (
            <>
              <circle
                key={`dot-${index}`}
                cx={coords[0]}
                cy={coords[1]}
                r={radius}
                className={styles.validatorDot}
              />
              <text
                key={`count-${index}`}
                x={coords[0]}
                y={coords[1]}
                dy={fontSize / 6}
                fontSize={fontSize}
                className={styles.validatorText}
              >{count}</text>
            </>
          )
        })
      }
    </>
  )
}