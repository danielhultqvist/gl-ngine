import {Map} from "./Map";
import {Coordinate} from "../geometry/Coordinate";
import {MapObject} from "./MapObject";
import {Polygon} from "../geometry/Polygon";
import {PolygonDecomposer} from "../collisiondetection/PolygonDecomposer";

// export function MAP_1(decomposer: PolygonDecomposer) {
//   return new Map([
//     new MapObject(new Polygon([
//       new Coordinate(50, 50),
//       new Coordinate(150, 50),
//       new Coordinate(198, 93),
//       new Coordinate(198, 124),
//       new Coordinate(181, 135),
//       new Coordinate(158, 141),
//       new Coordinate(157, 159),
//       new Coordinate(174, 169),
//       new Coordinate(208, 175),
//       new Coordinate(225, 196),
//       new Coordinate(211, 217),
//       new Coordinate(160, 220),
//       new Coordinate(111, 224),
//       new Coordinate(76, 207),
//       new Coordinate(45, 179),
//       new Coordinate(14, 143),
//       new Coordinate(16, 100),
//     ]), decomposer),
//     new MapObject(new Polygon([
//       new Coordinate(147, 284),
//       new Coordinate(207, 266),
//       new Coordinate(180, 311),
//       new Coordinate(222, 311),
//       new Coordinate(271, 281),
//       new Coordinate(228, 343),
//       new Coordinate(273, 391),
//       new Coordinate(202, 354),
//       new Coordinate(141, 401),
//       new Coordinate(168, 347),
//       new Coordinate(88, 270),
//     ]), decomposer),
//   ]);
// }
//
// export function MAP_2(decomposer: PolygonDecomposer) {
//   return new Map([
//     new MapObject(new Polygon([
//       new Coordinate(500, 500),
//       new Coordinate(550, 500),
//       new Coordinate(550, 640),
//       new Coordinate(500, 640),
//     ]), decomposer),
//     new MapObject(new Polygon([
//       new Coordinate(400, 300),
//       new Coordinate(650, 300),
//       new Coordinate(650, 340),
//       new Coordinate(400, 340),
//     ]), decomposer)
//   ]);
// }
//
// export function MAP_3(decomposer: PolygonDecomposer) {
//   return new Map([
//     new MapObject(new Polygon([
//       new Coordinate(400, 500),
//       new Coordinate(650, 500),
//       new Coordinate(650, 501),
//       new Coordinate(400, 501),
//     ]), decomposer)
//   ]);
// }

export function MAP_4(decomposer: PolygonDecomposer) {
  return new Map([
    new MapObject(new Polygon([
      new Coordinate(0, 700),
      new Coordinate(1200, 700),
      new Coordinate(1200, 800),
      new Coordinate(0, 900),
    ]), decomposer),
    new MapObject(new Polygon([
      new Coordinate(710, 700),
      new Coordinate(910, 610),
      new Coordinate(1200, 610),
      new Coordinate(1200, 750),
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
  ],
    1024, 768);
}
