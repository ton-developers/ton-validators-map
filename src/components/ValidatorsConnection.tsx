import type { Line, Point } from "@/utils/lineUtils";
import styles from "@/styles/ValidatorsMap.module.css";

export interface ValidatorsConnectionProps {
  line: Line;
}

export default function ValidatorsConnection({ line }: ValidatorsConnectionProps) {
  const middlePoint: Point = [
    (line[0][0] + line[1][0]) / 2 + 10,
    (line[0][1] + line[1][1]) / 2 - 20
  ];
  return (
    <path
      d={`M${line[0][0]} ${line[0][1]} Q ${middlePoint[0]} ${middlePoint[1]} ${line[1][0]} ${line[1][1]}`}
      className={styles.validatorsLink}
    />
  )

}