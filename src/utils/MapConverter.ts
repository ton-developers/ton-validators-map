export class MapConverter {
  constructor(
    private mapWidth: number,
    private mapHeight: number
  ) {}

  public svgCoordsFromGeoCoords(geoCoords: number[]) {
    const [lat, lon] = geoCoords;
    const x = (lon + 180) * (this.mapWidth / 360);
    const y = ((lat * -1) + 90) * (this.mapHeight / 180);
    return [x, y];
  }
}