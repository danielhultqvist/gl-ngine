import {Boundary, Map} from "./Map";
import {Coordinate} from "../geometry/Coordinate";
import {MapObject} from "./MapObject";
import {Polygon} from "../geometry/Polygon";
import {PolygonDecomposer} from "../collisiondetection/PolygonDecomposer";

export function MAP_4(decomposer: PolygonDecomposer) {
  return new Map(
    new Boundary(
      new Coordinate(0, 0),
      new Coordinate(5000, 11000)
    ),
    [
      new MapObject(new Polygon([
        new Coordinate(131, 582),
        new Coordinate(315, 614),
        new Coordinate(576, 601),
        new Coordinate(759, 560),
        new Coordinate(946, 555),
        new Coordinate(1099, 589),
        new Coordinate(1157, 675),
        new Coordinate(1057, 785),
        new Coordinate(775, 836),
        new Coordinate(448, 819),
        new Coordinate(127, 753),
        new Coordinate(74, 681),
      ]), decomposer),
      new MapObject(new Polygon([
        new Coordinate(1000, 300),
        new Coordinate(1200, 300),
        new Coordinate(1200, 400),
        new Coordinate(1000, 400),
      ]), decomposer),
      new MapObject(new Polygon([
        new Coordinate(370, 1054),
        new Coordinate(625, 1108),
        new Coordinate(905, 1124),
        new Coordinate(1217, 1101),
        new Coordinate(1337, 1183),
        new Coordinate(1311, 1266),
        new Coordinate(1112, 1342),
        new Coordinate(720, 1327),
        new Coordinate(399, 1142),
      ]), decomposer),
      new MapObject(new Polygon([
        new Coordinate(1512, 1142),
        new Coordinate(1681, 1097),
        new Coordinate(1812, 1019),
        new Coordinate(1941, 899),
        new Coordinate(2022, 835),
        new Coordinate(2044, 952),
        new Coordinate(1996, 1156),
        new Coordinate(1778, 1253),
        new Coordinate(1604, 1270),
      ]), decomposer),
      new MapObject(new Polygon([
        new Coordinate(410, 400),
        new Coordinate(410, 420),
        new Coordinate(350, 460),
        new Coordinate(100, 440),
        new Coordinate(0, 350),
        new Coordinate(240, 380),
        new Coordinate(360, 390),
      ]) , decomposer),
      new MapObject(new Polygon([
        new Coordinate(2196, 765),
        new Coordinate(2430, 759),
        new Coordinate(2606, 751),
        new Coordinate(2711, 746),
        new Coordinate(2732, 843),
        new Coordinate(2593, 868),
        new Coordinate(2407, 862),
        new Coordinate(2221, 838),
      ]) , decomposer),
      new MapObject(new Polygon([
        new Coordinate(2706, 747),
        new Coordinate(2860, 743),
        new Coordinate(2960, 763),
        new Coordinate(3033, 826),
        new Coordinate(3059, 872),
        new Coordinate(3071, 902),
        new Coordinate(3158, 992),
        new Coordinate(3139, 1074),
        new Coordinate(3050, 1100),
        new Coordinate(2957, 1031),
        new Coordinate(2886, 947),
        new Coordinate(2817, 878),
        new Coordinate(2767, 846),
        new Coordinate(2720, 840),
      ]) , decomposer),
      new MapObject(new Polygon([
        // new Coordinate(898, 2026),
        // new Coordinate(1602, 6983),
        // new Coordinate(1598, 7089),
        new Coordinate(500, 1448),
        new Coordinate(866, 1475),
        new Coordinate(1244, 1477),
        new Coordinate(1588, 1490),
        new Coordinate(1957, 1441),
        new Coordinate(2015, 1497),
        new Coordinate(1969, 1519),
        new Coordinate(1671, 1522),
        new Coordinate(1268, 1521),
        new Coordinate(813, 1513),
        new Coordinate(729, 1485),
      ]) , decomposer),
    ]);
}
