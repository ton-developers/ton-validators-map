import { Inter } from 'next/font/google'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Map } from '@/components'

const inter = Inter({ subsets: ['latin'] })

const mockNodes = [
  {
    latitude: 51.1878,
    longitude: 6.8607,
    count: 20,
  },
  {
    latitude: 49.405,
    longitude: 11.1617,
    count: 20,
  },
];

interface Validator {
  stake?: number,
  country?: string,
  latitude?: number,
  id?: string,
  longitude?: number
}
interface DataList {
  countriesCount?: number,
  count?: number,
  items?: Validator[],
}

interface Node {
  count: number,
  latitude: number,
  longitude: number,
}

export const getServerSideProps = (async () => {
  const res = await fetch('https://wtfomotydwju2q6x6zjjhlswmi0cczub.lambda-url.eu-central-1.on.aws/')
  const data: DataList = await res.json()
  const count = data?.count;
  const countries = data?.countriesCount
  const validators: Record<string, Node> = {}
  const validatorsArray = []
  let totalStake = 0;
  if (data.items){
    data.items.forEach((node) => {
      totalStake += node.stake || 0,
      validators[`${node.latitude}-${node.longitude}`] = {
        count: (validators[`${node.latitude}-${node.longitude}`]?.count || 0) + 1,
        latitude: node.latitude,
        longitude: node.longitude
      }
    })
  }

  return { 
    props: { 
      validators: Object.values(validators),
      totalStake,
    } 
}
}) satisfies GetServerSideProps<{
  validators: Node[],
  totalStake: number,
}>;

export default function Home({
  validators,
  totalStake,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div
      style={{
        height: '40%',
        width: '60%'
      }}
    >
      <Map nodes={validators} />
    </div>
  )
}
