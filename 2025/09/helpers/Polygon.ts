import { LazyMap } from './LazyMap.js';
import { Point } from './Point.js';

/* ========================================================================== */

/**
 * This class can be used for Advent of Code (AoC) problems that require working
 * with polygons. It is specialized for AoC and is not intended to be a
 * general-purpose polygon class. The following assumptions apply:
 * - Polygons are axis-aligned; all edges are parallel to the X or Y axis.
 * - Polygons do not have holes.
 * - All vertices are integer points.
 * - Polygons are static; their vertices don't change after creation.
 * - The Y coordinates are flipped. The top row has index 0, the further down
 *   you go, the larger the Y coordinate gets.
 *
 * The following derived data is cached for optimization purposes:
 * - area
 * - containsPoint
 *
 * Derived from code by Robin Malfait:
 * @see https://github.com/RobinMalfait/advent-of-code/blob/main/src/aoc-utils/src/index.ts
 */
export class Polygon {
	constructor(public vertices: Point[]) {
		//
	}

	/* ---------------------------------------------------------------------- */

	/**
	 * Computes the total number of unit grid cells that make up this polygon,
	 * including both interior and boundary cells. Uses the Shoelace formula
	 * to calculate geometric area, then applies Pick's theorem to account for
	 * discrete grid points. This gives the count of all unit squares that the
	 * polygon covers.
	 *
	 * @param vertices - The polygon vertices in clockwise or
	 *        counter-clockwise order.
	 * @returns The total count of unit grid cells covered by the polygon.
	 */
	static calculateArea(vertices: Point[]): number {
		let area: number = 0;
		let perimeter: number = 0;

		for (
			let current = 0, previous = vertices.length - 1;
			current < vertices.length;
			previous = current++
		) {
			area +=
				vertices[previous].x * vertices[current].y -
				vertices[current].x * vertices[previous].y;
			perimeter +=
				Math.abs(vertices[current].x - vertices[previous].x) +
				Math.abs(vertices[current].y - vertices[previous].y);
		}

		return (Math.abs(area) + perimeter) / 2 + 1;
	}

	/**
	 * Creates a rectangular polygon from two opposite corners. The input points
	 * may be provided in any order.
	 *
	 * @param a - One corner of the rectangle.
	 * @param b - The opposite corner of the rectangle.
	 * @returns A rectangular polygon defined by the two corners.
	 */
	static fromCorners(a: Point, b: Point): Polygon {
		const maxX = Math.max(a.x, b.x);
		const minX = Math.min(a.x, b.x);
		const minY = Math.min(a.y, b.y);
		const maxY = Math.max(a.y, b.y);

		return Polygon.fromPoints([
			Point.create(minX, minY),
			Point.create(maxX, minY),
			Point.create(maxX, maxY),
			Point.create(minX, maxY)
		]);
	}

	static fromPoints(points: Point[]): Polygon {
		return new Polygon(points);
	}

	/* ---------------------------------------------------------------------- */

	static readonly #areaCache = new LazyMap<Polygon, number>(
		(polygon: Polygon) => Polygon.calculateArea(polygon.vertices)
	);

	static readonly #pointInPolygonCache = new LazyMap<Polygon, LazyMap<Point, boolean>>((polygon: Polygon) => {
		return new LazyMap((point: Point) => {
			let isInside: boolean = false;

			// Iterate over the polygon edges. The first edge connects the last
			// vertex to the first. Each iteration advances one vertex forward.
			for (
				let current = 0, previous = polygon.vertices.length - 1;
				current < polygon.vertices.length;
				previous = current++
			) {
				// If the point lies exactly on the current edge, it is
				// considered inside the polygon.
				if (
					point.isOnSegment(polygon.vertices[previous], polygon.vertices[current])
				) return true;

				// If a ray cast from the point intersects the current edge,
				// toggle the inside state (ray-casting algorithm).
				if (
					point.rayIntersectsSegment(polygon.vertices[previous], polygon.vertices[current])
				) isInside = !isInside;
			}

			return isInside;
		});
	});

	/* ---------------------------------------------------------------------- */

	/**
	 * The grid-based area of this polygon. This represents the number of unit
	 * grid cells enclosed by the polygon, including boundary cells.
	 *
	 * @returns The grid area of the polygon.
	 */
	public get area(): number {
		return Polygon.#areaCache.get(this);
	}

	/* ---------------------------------------------------------------------- */

	/**
	 * Determines if a point lies inside this polygon using ray casting.
	 * Points on the boundary are considered inside.
	 *
	 * @param point - The point to check if it's inside the polygon.
	 * @returns true when the provided point is inside the polygon;
	 *          otherwise false.
	 */
	public containsPoint(point: Point): boolean {
		return Polygon.#pointInPolygonCache.get(this).get(point);
	}

	/**
	 * Checks whether the given polygon is completely contained within
	 * this polygon.
	 *
	 * Containment is defined as:
	 * - All vertices of the other polygon lie inside this polygon, and
	 * - No edges of the two polygons properly intersect.
	 *
	 * @param other - The polygon to test for containment.
	 * @returns true if the other polygon is fully contained; otherwise false.
	 */
	public containsPolygon(other: Polygon): boolean {
		const myVertices = this.vertices;
		const theirVertices = other.vertices;

		// First ensure every vertex of the other polygon lies inside this
		// polygon. This is a necessary but not sufficient condition for
		// containment.
		for (const point of theirVertices) {
			if (!this.containsPoint(point)) return false;
		}

		// Even though all vertices of the other polygon are inside this
		// polygon, the polygons could still intersect if their edges cross each
		// other. We need to check every edge of the other polygon against every
		// edge of this polygon to ensure no proper intersections exist.

		// Iterate over the polygon edges of the given polygon and this polygon.
		// The first edge connects the last vertex to the first. Each iteration
		// advances one vertex forward.
		for (let currA = 0, prevA = theirVertices.length - 1; currA < theirVertices.length; prevA = currA++) {
			const theirStart = theirVertices[prevA];
			const theirEnd = theirVertices[currA];

			for (let currB = 0, prevB = myVertices.length - 1; currB < myVertices.length; prevB = currB++) {
				const myStart = myVertices[prevB];
				const myEnd = myVertices[currB];

				// This checks whether both endpoints of the "other" polygon's
				// edge (theirStart and theirEnd) are on the same side of "this"
				// polygon's edge (myStart to myEnd). Only when the other's
				// points are on different sides of the edge will the result be
				// negative and a proper intersection has been detected.
				if (
					theirStart.orientation(myStart, myEnd) * theirEnd.orientation(myStart, myEnd) >= 0
				) continue;

				// This does the same only now with the points of this polygon
				// compared against the edge of the other polygon.
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
		Polygon.#areaCache.delete(this);
		Polygon.#pointInPolygonCache.delete(this);
	}
}
