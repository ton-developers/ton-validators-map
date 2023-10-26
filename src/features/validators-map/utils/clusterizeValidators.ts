
import Supercluster from 'supercluster'
import type { TonValidatorsCollection } from "@/features/validators-map/hooks/useTonValidators";
import type { Feature, Point } from "geojson";

export function clusterizeValidators(data: TonValidatorsCollection, zoom: number) {
  const supercluster = new Supercluster();
  supercluster.load(featuresFromValidators(data.items));
  return supercluster.getClusters([-180, -85, 180, 85], zoom);
}

function featuresFromValidators(validators: TonValidatorsCollection['items']): Feature<Point, any>[] {
  return validators.map(validator => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [validator.longitude, validator.latitude]
      },
      properties: {}
    }
  })
}