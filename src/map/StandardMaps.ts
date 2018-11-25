import {Boundary, Map} from "./Map";
import {Coordinate} from "../geometry/Coordinate";
import {MapObject} from "./MapObject";
import {Polygon} from "../geometry/Polygon";
import {PolygonDecomposer} from "../collisiondetection/PolygonDecomposer";

export function MAP_4(decomposer: PolygonDecomposer) {
  return new Map(
    new Boundary(
      new Coordinate(0, 0),
      new Coordinate(2000, 3000)
    ),
    [
      new MapObject(new Polygon([
        new Coordinate(0, 700),
        new Coordinate(1200, 700),
        new Coordinate(1200, 800),
        new Coordinate(0, 900),
      ]), decomposer),
      new MapObject(new Polygon([
        new Coordinate(710, 700),
        new Coordinate(910, 610),
        new Coordinate(10000, 610),
        new Coordinate(10000, 750),
        new Coordinate(810, 750),
      ]), decomposer),
      new MapObject(new Polygon([
        new Coordinate(410, 400),
        new Coordinate(660, 400),
        new Coordinate(660, 420),
        new Coordinate(410, 420),
      ]), decomposer),
      new MapObject(new Polygon([
        new Coordinate(410, 400),
        new Coordinate(410, 420),
        new Coordinate(350, 460),
        new Coordinate(100, 440),
        new Coordinate(0, 350),
        new Coordinate(240, 380),
        new Coordinate(360, 390),
      ]), decomposer),
    ]);
}
