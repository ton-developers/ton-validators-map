import { MapConverter } from '@/utils/MapConverter'
import { useContinents } from '@/hooks/useContinents'
import styles from '@/styles/ValidatorsMap.module.css'

export default function ValidatorsMap() {
  const {data, loading} = useContinents()

  const converter = new MapConverter(1000, 700)

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="90 90 910 500" className={styles.map}>
        {
          data?.features.flatMap((continent, featureIndex) => {
            if (continent.properties?.CONTINENT === "Antarctica") return null
            const geometry = continent.geometry
            if (geometry.type === 'MultiPolygon') {
              return geometry.coordinates.map((coords1, coordsIndex) => {
                return coords1.map((coords2, coords1Index) => {
                  if (coords1Index > 0) return null
                  return (<>
                    <polygon
                      key={`${featureIndex}-${coordsIndex}-${coords1Index}`}
                      points={coords2.map((coords3) => converter.svgCoordsFromGeoCoords(coords3).join(',')).join(' ')}
                      className={styles.continent}
                    />
                  </>)
                })
              })
            }
            return null
          })
        }
      </svg>
    </>
  )
}