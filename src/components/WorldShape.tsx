import type { MapConverter } from "@/utils/MapConverter"
import { useContinents } from '@/hooks/useContinents'
import styles from '@/styles/ValidatorsMap.module.css'

export interface WorldShapeProps {
  mapConverter: MapConverter
}

export default function WorldShape({ mapConverter }: WorldShapeProps) {
  const {data, loading} = useContinents()

  return (
    <g>
      {
        data?.features.flatMap((continent, featureIndex) => {
          const continentName = continent.properties?.CONTINENT
          if (continentName === "Antarctica") return null
          const geometry = continent.geometry
          if (geometry.type === 'MultiPolygon') {
            return geometry.coordinates.map((coords1, coordsIndex) => {
              return coords1.map((coords2, coords1Index) => {
                if (coords1Index > 0) return null
                return (<>
                  <polygon
                    key={`${continentName}-${featureIndex}-${coordsIndex}-${coords1Index}`}
                    points={coords2.map((coords3) => mapConverter.svgCoordsFromGeoCoords(coords3).join(',')).join(' ')}
                    className={styles.continent}
                  />
                </>)
              })
            })
          }
          return null
        })
      }
    </g>
  )

}