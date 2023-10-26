import { FeatureCollection } from 'geojson'
import { useEffect, useState } from 'react'
import { continents as continentsAsset } from '../assets/continents'

export function useContinents() {
  const [continents, setContinents] = useState<FeatureCollection>()
  const [error, setError] = useState<Error>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setContinents(continentsAsset as FeatureCollection)
    setLoading(false)
  }, [])

  return { data: continents, loading, error }
}