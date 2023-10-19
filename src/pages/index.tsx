import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { MapSVG } from '@/components/MapSVG'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
