import {Coordinate} from "../geometry/Coordinate";

export function right(a: Coordinate, b: Coordinate, c: Coordinate): boolean {
  return determinate(a, b, c) < 0;
}

export function rightOn(a: Coordinate, b: Coordinate, c: Coordinate): boolean {
  return determinate(a, b, c) <= 0;
}

export function left(a: Coordinate, b: Coordinate, c: Coordinate): boolean {
  return determinate(a, b, c) > 0;
}

export function leftOn(a: Coordinate, b: Coordinate, c: Coordinate): boolean {
  return determinate(a, b, c) >= 0;
}

export function determinate(a: Coordinate, b: Coordinate, c: Coordinate): number {
  return (b.x - a.x) * (c.y - b.y) - (c.x - b.x) * (b.y - a.y);
}

export function at(coordinates: Coordinate[], index: number): Coordinate {
  if (index < 0) {
    const offset = (-index) % coordinates.length;
    if (offset == 0) {
      return coordinates[0]
    }
    return coordinates[coordinates.length - offset];
  } else if (index >= coordinates.length) {
    const offset = index % coordinates.length;
    return coordinates[offset];
  }
  return coordinates[index]
}
