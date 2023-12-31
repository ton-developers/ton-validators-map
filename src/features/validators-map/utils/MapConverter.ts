import type { Point } from './lineUtils'
import type { Position } from 'geojson';

const PI = Math.PI;
const RAD2DEG = 180/PI;
const DEG2RAD = PI/180;
const R =  6378137.0

export class MapConverter {
  private calculatedXRange: number
  private calculatedYRange: number
  private minCalculatedX: number
  private maxCalculatedX: number
  private minCalculatedY: number
  private maxCalculatedY: number

  constructor(
    private mapWidth: number,
    private mapHeight: number
  ) {
    const minCalculatedX = this.lon2x(-180);
    const maxCalculatedX = this.lon2x(180);
    const minCalculatedY = this.lat2y(85);
    const maxCalculatedY = this.lat2y(-85);
    this.calculatedYRange = maxCalculatedY - minCalculatedY;
    this.calculatedXRange = maxCalculatedX - minCalculatedX;
    this.minCalculatedX = minCalculatedX;
    this.maxCalculatedX = maxCalculatedX;
    this.minCalculatedY = minCalculatedY;
    this.maxCalculatedY = maxCalculatedY;
  }

  public svgCoordsFromGeoCoords(geoCoords: Point | Position): Point {
    const [lon, lat] = geoCoords;
    const x = this.fitToMapWidth(this.lon2x(lon));
    const y = this.fitToMapHeight(this.lat2y(lat));
    return [this.roundTo(x), this.roundTo(y)];
  }

  public y2lat(y: number) {
    const intY = this.unfitFromMapHeight(y);
    return (2 * Math.atan( Math.exp(intY / R)) - PI/2 ) * RAD2DEG 
  }
  public x2lon(x: number) { 
    const intX = this.unfitFromMapWidth(x);
    return RAD2DEG * (intX/R); 
  }

  public lat2y(lat: number) { 
    return Math.log(Math.tan(PI/4 + lat * DEG2RAD / 2)) * R
  }
  public lon2x(lon: number) { 
    return lon * DEG2RAD * R; 
  }

  private fitToMapWidth(x: number): number {
    return (x - this.minCalculatedX) / this.calculatedXRange * this.mapWidth;
  }

  private unfitFromMapWidth(x: number): number {
    return x / this.mapWidth * this.calculatedXRange + this.minCalculatedX;
  }

  private unfitFromMapHeight(y: number): number {
    return y / this.mapHeight * this.calculatedYRange + this.minCalculatedY;
  }

  private fitToMapHeight(y: number): number {
    return (y - this.minCalculatedY) / this.calculatedYRange * this.mapHeight;
  }

  private roundTo(num: number, places = 2) {
    return Math.round(num * 10 ** places) / 10 ** places;
  }
}