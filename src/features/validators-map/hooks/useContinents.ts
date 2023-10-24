import { FeatureCollection } from 'geojson'
import { useEffect, useState } from 'react'

export function useContinents() {
  const [continents, setContinents] = useState<FeatureCollection>()
  const [error, setError] = useState<Error>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('/api/continents')
      .then(res => res.json())
      .then((continents: FeatureCollection) => {
        setContinents(continents)
      })
      .catch((error: Error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { data: continents, loading, error }
}