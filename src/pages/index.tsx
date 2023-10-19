import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { MapSVG } from '@/components/MapSVG'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

const inter = Inter({ subsets: ['latin'] })

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
  count?: number,
  latitude?: number,
  longitude?: number,
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
      <MapSVG 
        viewBoxHeight={595}
        viewBoxWidth={1120}
      />
    </div>
  )
}
