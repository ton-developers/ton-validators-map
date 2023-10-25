import { MapConverter } from "../utils/MapConverter";
import { Line, getLineMidpoint, getPerpendicularVector, addVectors, getLineLength, Point, Vector, reverseVector } from "../utils/lineUtils";
import styles from "./ValidatorsMap.module.css";

export interface ValidatorsConnectionProps {
  line: Line;
  mapConverter: MapConverter;
}

export default function ValidatorsConnection({ line, mapConverter }: ValidatorsConnectionProps) {
  let middlePoint = getLineMidpoint(line);
  const middleDelta = getPerpendicularVector(line, 5 + (getLineLength(line) / 30) ** 1.5 );
  middlePoint = addVectors(middlePoint, isDeltaShouldBeReversed(middlePoint, middleDelta) ? reverseVector(middleDelta) : middleDelta);
  return (
    <>
      <path
        style={{
          // @ts-ignore
          '--animation-delay': `${Math.random() * 20}s`
        }}
        d={`M${line[0][0]} ${line[0][1]} Q ${middlePoint[0]} ${middlePoint[1]} ${line[1][0]} ${line[1][1]}`}
        className={styles.validatorsLink}
      />
    </>
  )
  function isDeltaShouldBeReversed(middlePoint: Point, delta: Vector): boolean {
    const lat = mapConverter.y2lat(middlePoint[1]);
    return (lat > 0 && delta[1] > 0) || (lat < 0 && delta[1] < 0);
  }
}