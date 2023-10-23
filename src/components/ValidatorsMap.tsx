import { MapConverter } from '@/utils/MapConverter'
import styles from '@/styles/ValidatorsMap.module.css'
import WorldShape from './WorldShape'

export default function ValidatorsMap() {


  const converter = new MapConverter(1000, 700)

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="90 90 910 500" className={styles.map}>
        <WorldShape converter={converter} />
      </svg>
    </>
  )
}