import { FC, ReactNode } from "react";
import styles from "./styles.module.css";
import { Container } from "../Container";
import classNames from "classnames";

interface Props {
  backgroundColor?: string;
  value: string;
  title: string;
  className?: string;
}

export const Card: FC<Props> = function Card({ value, title, className }) {
  return (
    <Container className={classNames(styles.card, className)}>
      <span className={styles.value}>{value}</span>
      <span className={styles.title}>{title}</span>
    </Container>
  );
};
