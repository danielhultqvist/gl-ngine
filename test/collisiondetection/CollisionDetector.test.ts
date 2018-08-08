import {Polygon} from "../../src/geometry/Polygon";
import {Coordinate} from "../../src/geometry/Coordinate";
import {CollisionDetector} from "../../src/collisiondetection/CollisionDetector";
import {Player} from "../../src/player/Player";
import {MapObject} from "../../src/map/MapObject";
import {KeilDecomposer} from "../../src/collisiondetection/KeilDecomposer";
import {CollisionVector} from "../../src/collisiondetection/CollisionVector";
import {Axis} from "../../src/geometry/Axis";

test('push player to the left of colliding object', () => {
  const decomposer = new KeilDecomposer();
  const detector = new CollisionDetector();
  const player = new Player(100, 100, 0, 0);
  const mapObjects: MapObject[] = [
    new MapObject(new Polygon([
      new Coordinate(100, -500),
      new Coordinate(200, -500),
      new Coordinate(200, 500),
      new Coordinate(100, 500),
    ]), decomposer)
  ];

  const detection: CollisionVector[] = detector.detect(player, mapObjects);

  expect(detection)
    .toEqual([
      new CollisionVector(new Axis(-1, 0), player.width)
    ]);
});

test('push player to the right of colliding object', () => {
  const decomposer = new KeilDecomposer();
  const detector = new CollisionDetector();
  const player = new Player(160, 100, 0, 0);
  const mapObjects: MapObject[] = [
    new MapObject(new Polygon([
      new Coordinate(100, -500),
      new Coordinate(200, -500),
      new Coordinate(200, 500),
      new Coordinate(100, 500),
    ]), decomposer)
  ];

  const detection: CollisionVector[] = detector.detect(player, mapObjects);

  expect(detection)
    .toEqual([
      new CollisionVector(new Axis(1, 0), 40)
    ]);
});

test('push player upwards of colliding object', () => {
  const decomposer = new KeilDecomposer();
  const detector = new CollisionDetector();
  const player = new Player(100, 100, 0, 0);
  const mapObjects: MapObject[] = [
    new MapObject(new Polygon([
      new Coordinate(-500, 100 + player.height * 4 / 5),
      new Coordinate(500, 100 + player.height * 4 / 5),
      new Coordinate(500, 300),
      new Coordinate(-500, 300),
    ]), decomposer)
  ];

  const detection: CollisionVector[] = detector.detect(player, mapObjects);

  expect(detection)
    .toEqual([
      new CollisionVector(new Axis(0, -1), 5)
    ]);
});

test('push player downwards of colliding object', () => {
  const decomposer = new KeilDecomposer();
  const detector = new CollisionDetector();
  const player = new Player(100, 100, 0, 0);
  const mapObjects: MapObject[] = [
    new MapObject(new Polygon([
      new Coordinate(-500, -300),
      new Coordinate(500, -300),
      new Coordinate(500, 100 + player.height / 5),
      new Coordinate(-500, 100 + player.height / 5),
    ]), decomposer)
  ];

  const detection: CollisionVector[] = detector.detect(player, mapObjects);

  expect(detection)
    .toEqual([
      new CollisionVector(new Axis(0, 1), 5)
    ]);
});

test('push player diagonally of colliding object', () => {
  const decomposer = new KeilDecomposer();
  const detector = new CollisionDetector();
  const player = new Player(140, 140, 0, 0);
  const mapObjects: MapObject[] = [
    new MapObject(new Polygon([
      new Coordinate(100, 100),
      new Coordinate(200, 100),
      new Coordinate(100, 200),
    ]), decomposer)
  ];

  const detection: CollisionVector[] = detector.detect(player, mapObjects);
  const expectedAxis = new Axis(1, 1).normalized();
  const expectedMagnitude = (10 / expectedAxis.dx).toFixed(5);

  expect(detection.length).toBe(1);
  expect(detection[0].vector).toEqual(expectedAxis);
  expect(detection[0].magnitude.toFixed(5)).toEqual(expectedMagnitude);
});
