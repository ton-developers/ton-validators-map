import { MapConverter } from '@/features/validators-map/utils/MapConverter'
import { useTonValidators } from '@/features/validators-map/hooks/useTonValidators'

import WorldShape from '../features/validators-map/ui/WorldShape'
import Validators from '../features/validators-map/ui/Validators'
import ValidatorsStats from '../features/validators-map/ui/ValidatorsStats'
import styles from '../features/validators-map/ui/ValidatorsMap.module.css'

export default function ValidatorsMap() {
  const { data, loading } = useTonValidators();
  const converter = new MapConverter(1000, 600)

  return (
    <div className={styles.mapContainer}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="90 70 910 400" className={styles.map}>
        <WorldShape mapConverter={converter} />
        <Validators mapConverter={converter} data={data} />
      </svg>
      <ValidatorsStats data={data} />
    </div>
  )
}