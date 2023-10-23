import { MapConverter } from '@/utils/MapConverter'
import { useContinents } from '@/hooks/useContinents'

export default function ValidatorsMap() {
  const {data, loading} = useContinents()

  const converter = new MapConverter(1000, 1000)

  if (!loading) {
    console.log(data)
  }

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
      </svg>
    </>
  )
}