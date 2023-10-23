
import { useState, useEffect } from "react";
import { useTonValidators, TonValidatorsCollection } from "./useTonValidators";
import type { MapConverter } from "@/utils/MapConverter";

export interface TonValidatorStats {
  count: number;
}

export interface UseTonValidatorsStatsProps {
  mapConverter: MapConverter;
}

export function useTonValidatorsStats({ mapConverter }: UseTonValidatorsStatsProps) {
  const { data, loading, error } = useTonValidators();
  const [stats, setStats] = useState<TonValidatorStats>();

  useEffect(() => {
    if (!data) return;

    const stats = getStats(data, mapConverter);
    setStats(stats);
  }, [data]);

  return { data: stats, loading, error };
}

function getStats(data: TonValidatorsCollection, mapConverter: MapConverter): TonValidatorStats {

  const validatorsWithSvgCoords = data.items.map(validator => {
    const [longitude, latitude] = mapConverter.svgCoordsFromGeoCoords([validator.longitude, validator.latitude]);
    return { ...validator,  longitude, latitude };
  });

  return {
    count: data.count
  }
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