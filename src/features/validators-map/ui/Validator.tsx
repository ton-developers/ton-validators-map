import type { MapConverter } from "../utils/MapConverter";
import type { PointFeature, ClusterFeature, AnyProps } from "supercluster";
import styles from "./ValidatorsMap.module.css";

export interface ValidatorProps {
  mapConverter: MapConverter;
  item: PointFeature<AnyProps> | ClusterFeature<AnyProps>;
}

export default function Validator({ mapConverter, item }: ValidatorProps) {
  const count = item.properties.point_count || 1;
  const coords = mapConverter.svgCoordsFromGeoCoords(item.geometry.coordinates);
  const radius = 5 + Math.log(count) * 2;
  const fontSize = 7 + Math.log(count) / 3;

  return (
    <g style={{
      // @ts-ignore
      '--animation-delay':  `${Math.random() * 20}s`
    }}>
      <circle
        cx={coords[0]}
        cy={coords[1]}
        r={3 + radius * 2}
        transform-origin={`${coords[0]} ${coords[1]}`}
        className={styles.validatorDotPulse}
      />
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
}