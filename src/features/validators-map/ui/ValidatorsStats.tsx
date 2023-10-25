import type { useTonValidators } from '../hooks/useTonValidators';
import styles from './ValidatorsStats.module.css';

export interface ValidatorsStatsProps {
  data: ReturnType<typeof useTonValidators>["data"];
}

export default function ValidatorsStats({ data }: ValidatorsStatsProps) {
  if (!data) return null;

  const tonString = formatBigNumber(toTON(data.totalStake));
  const tonStringSmall = formatNumberInHigherUnits(toTON(data.totalStake));

  const cards = [
    { value: `${tonString} TON`, label: 'Total stake' },
    { value: `${data.count}+`, label: 'Nodes' },
    { value: `${data.countriesCount}+`, label: 'Countries' },
  ]

  return (
    <>
      <div className={styles.statsCardsContainer}>
        <div key="total-stake" className={styles.statsCard}>
          <div className={styles.statsCard__value}>
            <span className={styles.statsCard__value__big}>{tonString} TON</span>
            <span className={styles.statsCard__value__small}>{tonStringSmall}+ TON</span>
          </div>
          <div className={styles.statsCard__label}>Total stake</div>
        </div>
        <div key="nodes" className={styles.statsCard}>
          <div className={styles.statsCard__value}>{data.count}+</div>
          <div className={styles.statsCard__label}>Nodes</div>
        </div>
        <div key="countries" className={styles.statsCard}>
          <div className={styles.statsCard__value}>{data.countriesCount}+</div>
          <div className={styles.statsCard__label}>Countries</div>
        </div>
      </div>
    </>
  )
}

function formatBigNumber(num: number) {
  return Math.floor(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatNumberInHigherUnits(num: number) {
  if (num < 1_000) return num;
  if (num < 1_000_000) return `${Math.floor(num / 1_000)}K`;
  if (num < 1_000_000_000) return `${Math.floor(num / 1_000_000)}M`;
  return `${Math.floor(num / 1_000_000_000)}B`;
}

function toTON(num: number) {
  return num / 1_000_000_000;
}