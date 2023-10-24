import type { useTonValidators } from '../hooks/useTonValidators';
import styles from './ValidatorsStats.module.css';

export interface ValidatorsStatsProps {
  data: ReturnType<typeof useTonValidators>["data"];
  isMobile?: boolean;
}

export default function ValidatorsStats({ data, isMobile = false }: ValidatorsStatsProps) {
  if (!data) return null;

  const tonString = isMobile ? formatNumberInHigherUnits(toTON(data.totalStake)) + '+' : formatBigNumber(toTON(data.totalStake));

  const cards = [
    { value: `${tonString} TON`, label: 'Total stake' },
    { value: `${data.count}+`, label: 'Nodes' },
    { value: `${data.countriesCount}+`, label: 'Countries' },
  ]

  return (
    <>
      <div className={`${styles.statsCardsContainer} ${isMobile ? styles.statsCardsContainerMobile : ''}`}>
        {
          cards.map((card, index) => (
            <div key={`card-${index}`} className={`${styles.statsCard} ${isMobile ? styles.statsCardMobile : ''}`}>
              <div className={`${styles.statsCard__value} ${isMobile ? styles.statsCardMobile__value : ''}`}>{card.value}</div>
              <div className={`${styles.statsCard__label} ${isMobile ? styles.statsCardMobile__label : ''}`}>{card.label}</div>
            </div>
          ))
        }
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