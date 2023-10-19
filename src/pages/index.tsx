import { Inter } from 'next/font/google'
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

export default function Home() {
  return (
    <div
      style={{
        height: '40%',
        width: '60%'
      }}
    >
      <Map nodes={mockNodes} />
    </div>
  )
}
