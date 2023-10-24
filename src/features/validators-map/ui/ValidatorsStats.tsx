import type { useTonValidators } from '@/features/validators-map/hooks/useTonValidators'

export interface ValidatorsStatsProps {
  data: ReturnType<typeof useTonValidators>["data"];
}

export default function ValidatorsStats({ data }: ValidatorsStatsProps) {
  if (!data) return null;

  console.log(data);

  return (
    <>
      <div>
        {formatBigNumber(data.totalStake)} TON staked
      </div>
    </>
  )
}

function formatBigNumber(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}