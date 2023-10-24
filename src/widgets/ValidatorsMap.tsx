import { useRef, useEffect, useState } from 'react'
import { MapConverter } from '@/features/validators-map/utils/MapConverter'
import { useTonValidators } from '@/features/validators-map/hooks/useTonValidators'

import WorldShape from '../features/validators-map/ui/WorldShape'
import Validators from '../features/validators-map/ui/Validators'
import ValidatorsStats from '../features/validators-map/ui/ValidatorsStats'
import styles from '../features/validators-map/ui/ValidatorsMap.module.css'

export default function ValidatorsMap() {
  const { data, loading } = useTonValidators();
  const [isMobile, setIsMobile] = useState(checkIfMobile())
  const converter = isMobile ? new MapConverter(1000, 700) : new MapConverter(1000, 600)

  useEffect(() => {
    const resizeListener = () => {
      setIsMobile(checkIfMobile())
    }
    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  return (
    <>
      <h1 className={`${styles.mapTitle} ${isMobile ? styles.mapTitleMobile : ''}`}>
        Validator nodes are distributed all around the world
      </h1>
      <div className={styles.mapContainer}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={isMobile ? "140 70 800 500" : "140 70 800 400"} className={styles.map}>
          <WorldShape mapConverter={converter} />
          <Validators mapConverter={converter} data={data} isMobile={isMobile} />
        </svg>
        <ValidatorsStats data={data} isMobile={isMobile} />
      </div>
    </>
  )
}

function checkIfMobile() {
  return window.innerWidth < 1100
}