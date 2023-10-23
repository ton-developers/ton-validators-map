import type { Point } from './lineUtils'
import type { Position } from 'geojson';

export class MapConverter {
  constructor(
    private mapWidth: number,
    private mapHeight: number
  ) {}

  public svgCoordsFromGeoCoords(geoCoords: Point | Position): Point {
    const [lon, lat] = geoCoords;
    const x = (lon + 180) * (this.mapWidth / 360);
    const y = ((lat * -1) + 90) * (this.mapHeight / 180);
    return [this.roundTo(x), this.roundTo(y)];
  }

  private roundTo(num: number, places = 2) {
    return Math.round(num * 10 ** places) / 10 ** places;
  }
}