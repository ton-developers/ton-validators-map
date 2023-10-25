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
  const countDigits = count.toString().length;

  const digitsToStyle: Record<number, string> = {
    [1]: styles.validator1Digits,
    [2]: styles.validator2Digits,
    [3]: styles.validator3Digits,
    [4]: styles.validator4Digits,
    [5]: styles.validator5Digits,
  }

  return (
    <g 
      className={`${styles.validator} ${digitsToStyle[countDigits]}`}
      style={{
        // @ts-ignore
        '--animation-delay':  `${Math.random() * 20}s`
      }}>
      <circle
        cx={coords[0]}
        cy={coords[1]}
        transform-origin={`${coords[0]} ${coords[1]}`}
        className={styles.validatorDotPulse}
      />
      <circle
        cx={coords[0]}
        cy={coords[1]}
        className={styles.validatorDot}
      />
      <text
        x={coords[0]}
        y={coords[1]}
        dy="0.12em"
        className={styles.validatorText}
      >{count}</text>
    </g>
  )
}