import { LazyMap } from './LazyMap.js';
import { Point } from './Point.js';

/* ========================================================================== */

/**
 * Represents a polygon defined by a sequence of Point vertices.
 *
 * Provides methods for geometric operations such as:
 * - containsPoint to check whether a point lies inside the polygon
 * - containsPolygon to check whether another polygon is fully contained
 *
 * This class uses a caching mechanism (LazyMap) to efficiently store results of
 * point-in-polygon checks for repeated queries.
 *
 * Derived from code by Robin Malfait:
 * @see https://github.com/RobinMalfait/advent-of-code/blob/main/src/aoc-utils/src/index.ts
 */
export class Polygon {
	constructor(public vertices: Point[]) {
		//
	}

	/* ---------------------------------------------------------------------- */

	static fromPoints(points: Point[]): Polygon {
		return new Polygon(points);
	}

	static #pointInPolygonCache = new LazyMap((polygon: Polygon) => {
		return new LazyMap((point: Point) => {
			let isInside: boolean = false;

			for (
				let current = 0, previous = polygon.vertices.length - 1;
				current < polygon.vertices.length;
				previous = current++
			) {
				const start: Point = polygon.vertices[previous];
				const end: Point = polygon.vertices[current];

				if (point.isOnSegment(start, end)) return true;

				if (point.rayIntersectsSegment(start, end)) isInside = !isInside;
			}

			return isInside;
		});
	});

	/* ---------------------------------------------------------------------- */

	public containsPoint(point: Point): boolean {
		return Polygon.#pointInPolygonCache.get(this).get(point);
	}

	public containsPolygon(other: Polygon): boolean {
		const myVertices = this.vertices;
		const theirVertices = other.vertices;

		// Make sure all the vertices of the other polygon are within
		// this polygon.
		for (const point of theirVertices) {
			if (!this.containsPoint(point)) return false;
		}

		for (let currA = 0, prevA = theirVertices.length - 1; currA < theirVertices.length; prevA = currA++) {
			const theirStart = theirVertices[prevA];
			const theirEnd = theirVertices[currA];

			for (let currB = 0, prevB = myVertices.length - 1; currB < myVertices.length; prevB = currB++) {
				const myStart = myVertices[prevB];
				const myEnd = myVertices[currB];

				// Check orientations to detect proper intersections
				if (
					theirStart.orientation(myStart, myEnd) * theirEnd.orientation(myStart, myEnd) >= 0
				) continue;

				if (
					myStart.orientation(theirStart, theirEnd) * myEnd.orientation(theirStart, theirEnd) >= 0
				) continue;

				// Proper intersection detected
				return false;
			}
		}

		return true;
	}

	/* ---------------------------------------------------------------------- */

	[Symbol.dispose]() {
		Polygon.#pointInPolygonCache.delete(this);
	}
}
