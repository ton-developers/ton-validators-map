import { useRef, useEffect, useState } from 'react'
import { MapConverter } from '@/features/validators-map/utils/MapConverter'
import { useTonValidators } from '@/features/validators-map/hooks/useTonValidators'

import WorldShape from '../features/validators-map/ui/WorldShape'
import Validators from '../features/validators-map/ui/Validators'
import ValidatorsStats from '../features/validators-map/ui/ValidatorsStats'
import styles from '../features/validators-map/ui/ValidatorsMap.module.css'

type ScreenSizeMode = 'sm' | 'md' | 'lg'

export default function ValidatorsMap() {
  const { data, loading } = useTonValidators();
  const [screenSizeMode, setScreenSizeMode] = useState<ScreenSizeMode>('lg')
  const converter = new MapConverter(930, 900)

  useEffect(() => {
    setScreenSizeMode(getScreenSizeMode())
    const resizeListener = () => {
      setScreenSizeMode(getScreenSizeMode())
    }
    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  return (
    <>
      <h1 className={styles.mapTitle}>
        Validator nodes are distributed all around the world
      </h1>
      <div className={styles.mapContainer}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={screenSizeMode === 'sm' ? "120 150 765.625 500" : "120 200 753 400"} className={styles.map}>
          <WorldShape mapConverter={converter} />
          <Validators mapConverter={converter} data={data} screenSizeMode={screenSizeMode} />
        </svg>
        <ValidatorsStats data={data} />
      </div>
    </>
  )
}

function getScreenSizeMode(): ScreenSizeMode {
  const width: number = window.innerWidth
  if (width < 600) {
    return 'sm'
  } else if (width < 1220) {
    return 'md'
  } else {
    return 'lg'
  }
}