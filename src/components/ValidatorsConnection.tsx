import { Line, getLineMidpoint, getPerpendicularVector, addVectors, getLineLength } from "@/utils/lineUtils";
import styles from "@/styles/ValidatorsMap.module.css";

export interface ValidatorsConnectionProps {
  line: Line;
}

export default function ValidatorsConnection({ line }: ValidatorsConnectionProps) {
  let middlePoint = getLineMidpoint(line);
  const middleDelta = getPerpendicularVector(line, 5 + Math.log(getLineLength(line)));
  middlePoint = addVectors(middlePoint, middleDelta);
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

}