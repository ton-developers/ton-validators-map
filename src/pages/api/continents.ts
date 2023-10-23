import * as fs from 'fs/promises'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { FeatureCollection } from 'geojson'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FeatureCollection>
) {
  const continentsJson = await fs.readFile('./src/assets/continents.json', 'utf-8')
  const continents = JSON.parse(continentsJson) as FeatureCollection
  res.status(200).json(continents)
}
