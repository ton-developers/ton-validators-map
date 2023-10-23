import { useTonValidators } from "@/hooks/useTonValidators";
import type { MapConverter } from "@/utils/MapConverter";
import styles from "@/styles/ValidatorsMap.module.css";

export interface ValidatorsMapProps {
  mapConverter: MapConverter;
}

export default function Validators({ mapConverter }: ValidatorsMapProps) {
  const { data, loading } = useTonValidators();

  return (
    <>
      {
        data?.items.map((validator, index) => {
          const coords = mapConverter.svgCoordsFromGeoCoords([validator.longitude, validator.latitude]);
          return (
            <circle
              key={index}
              cx={coords[0]}
              cy={coords[1]}
              r={5}
              className={styles.validator}
            />
          )
        })
      }
    </>
  )
}

function groupBy<T>(items: T[], key: keyof T): Map<string, T[]> {
  return items.reduce((map, item) => {
    const value = item[key];
    const group = map.get(value as string);
    if (!group) {
      map.set(value as string, [item]);
    } else {
      group.push(item);
    }
    return map;
  }, new Map<string, T[]>());
}