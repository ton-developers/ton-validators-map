import { useEffect, useState } from 'react'

type TonValidatorsCollection = {
  count: number,
  items: {
    id: string,
    stake: number,
    country: string,
    latitude: number,
    longitude: number
  }[]
}

export function useTonValidators() {
  const [data, setData] = useState<TonValidatorsCollection>()
  const [error, setError] = useState<Error>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('https://wtfomotydwju2q6x6zjjhlswmi0cczub.lambda-url.eu-central-1.on.aws/')
      .then(res => res.json())
      .then((validators: TonValidatorsCollection) => {
        setData(validators)
      })
      .catch((error: Error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}