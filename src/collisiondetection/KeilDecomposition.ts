import {PolygonDecompositor} from "./PolygonDecompositor";
import {Polygon} from "../geometry/Polygon";
import {Coordinate} from "../geometry/Coordinate";

class KeilDecomposition implements PolygonDecompositor {

  /*
  diags = decomp(poly)
	min, tmp : EdgeList
	ndiags : Integer
	for each reflex vertex i
		for every other vertex j
			if i can see j
				left = the polygon given by vertices i to j
				right = the polygon given by vertices j to i
				tmp = decomp(left) + decomp(right)
				if(tmp.size < ndiags)
					min = tmp
					ndiags = tmp.size
					min += the diagonal i to j
	return min
   */

  decompose(polygon: Polygon): Array<Polygon> {
    // let min: EdgeList;
    // let tmp: EdgeList;
    // let numberOfDiagonals: number = Number.MAX_VALUE;
    //
    // const coordinates = polygon.coordinates;
    // for(let i: number = 0; i < coordinates.length; ++i) {
    //   for (let j: number = 0; j < coordinates.length; ++j) {
    //     if (this.isReflex(coordinates[i])){
    //       if (this.verticesCanSeeEachOther(coordinates, i, j)) {
    //
    //       }
    //     }
    //   }
    // }
    console.log(polygon);


    return [];
  }

  // private verticesCanSeeEachOther(coordinates: Array<Coordinate>, i: number, j: number) {
  //
  // }

  public static isReflex(coordinates: Array<Coordinate>, indexToTest: number): boolean {
    return KeilDecomposition.determinate(coordinates, indexToTest) < 0;
  }

  private static determinate(coordinates: Array<Coordinate>, indexToTest: number): number {
    let a: Coordinate = KeilDecomposition.at(coordinates, indexToTest - 1);
    let b: Coordinate = coordinates[indexToTest];
    let c: Coordinate = KeilDecomposition.at(coordinates, indexToTest + 1);

    return (b.x - a.x) * (c.y - b.y) - (c.x - b.x) * (b.y - a.y);
  }

  private static at(coordinates: Array<Coordinate>, index: number): Coordinate {
    if (index < 0) {
      return coordinates[coordinates.length - 1];
    } else if (index == coordinates.length) {
      return coordinates[0];
    }
    return coordinates[index]
  }
}

export {KeilDecomposition}
