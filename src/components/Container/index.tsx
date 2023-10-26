import { FC, ReactNode } from "react";
import classnames from "classnames";
import styles from "./styles.module.css";

interface Props {
  children: ReactNode;
  backgroundColor?: string;
  withPaddings?: boolean;
  className?: string;
}

export const Container: FC<Props> = function Container({
  children,
  backgroundColor = "#2D2D32",
  className,
}) {
  return (
    <div
      className={classnames(styles.container, className)}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      {children}
    </div>
  );
};
