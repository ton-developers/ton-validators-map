import { MapConverter } from '@/utils/MapConverter'
import { useTonValidators } from '@/hooks/useTonValidators'

import WorldShape from './WorldShape'
import Validators from './Validators'
import ValidatorsStats from './ValidatorsStats'
import styles from '@/styles/ValidatorsMap.module.css'

export default function ValidatorsMap() {
  const { data, loading } = useTonValidators();
  const converter = new MapConverter(1000, 600)

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="90 70 910 400" className={styles.map}>
        <WorldShape mapConverter={converter} />
        <Validators mapConverter={converter} data={data} />
      </svg>
      <ValidatorsStats data={data} />
    </>
  )
}