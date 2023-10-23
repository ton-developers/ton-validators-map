import { MapConverter } from '@/utils/MapConverter'
import styles from '@/styles/ValidatorsMap.module.css'
import WorldShape from './WorldShape'
import Validators from './Validators'

export default function ValidatorsMap() {
  const converter = new MapConverter(1000, 600)

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="90 70 910 400" className={styles.map}>
        <WorldShape converter={converter} />
        <Validators mapConverter={converter} />
      </svg>
    </>
  )
}