import { LazyMap } from './LazyMap.js';

/* ========================================================================== */

/**
 * Represents a point in 2D space with immutable coordinates.
 *
 * Points are created using a caching mechanism to ensure that each (x, y)
 * coordinate pair corresponds to a single Point instance. This uses a nested
 * LazyMap internally to provide efficient reuse.
 *
 * This class also provides geometric helper methods:
 *  - rayIntersectsSegment for ray-casting intersection tests
 *  - isOnSegment to test if the point lies on a line segment
 *  - orientation to determine the relative position of the point
 *   to a line defined by two other points
 *
 * Derived from code by Robin Malfait:
 * @see https://github.com/RobinMalfait/advent-of-code/blob/main/src/aoc-utils/src/index.ts
 */
export class Point {
	private constructor(public readonly x: number, public readonly y: number) {
		//
	}

	/* ---------------------------------------------------------------------- */

	static readonly #points = new LazyMap<number, LazyMap<number, Point>>(
		(x: number) => new LazyMap((y: number) => new Point(x, y))
	);

	static create(x: number, y: number): Point {
		return Point.#points.get(x).get(y);
	}

	/* ---------------------------------------------------------------------- */

	/**
	 * Tests whether a horizontal ray extending to the right from this point
	 * intersects the line segment defined by points a and b.
	 *
	 * This method is typically used as part of a ray-casting (odd–even rule)
	 * point-in-polygon test. It returns true if the segment crosses the
	 * horizontal line at this point’s y-coordinate and the intersection
	 * occurs to the right of the point.
	 *
	 * @param a The first endpoint of the line segment
	 * @param b The second endpoint of the line segment
	 * @returns true if the ray from this point intersects the segment;
	 *          otherwise false
	 */
	public rayIntersectsSegment(a: Point, b: Point): boolean {
		return (
			// Check if point A is above the point and if point B is above it.
			// When both checks give the same result A and B are either above
			// or below the point and thus can't intersect.
			a.y > this.y !== b.y > this.y &&
			// Compute the x-coordinate where the segment intersects the
			// horizontal line at this.y and check whether that intersection
			// lies to the right of the point.
			this.x < ((b.x - a.x) * (this.y - a.y)) / (b.y - a.y) + a.x
		);
	}

	/**
	 * Checks whether this point lies on the line segment formed by points
	 * A and B. The point must be collinear with A and B and within the bounds
	 * of the segment.
	 *
	 * @param a - First endpoint of the segment
	 * @param b - Second endpoint of the segment
	 * @returns true if this point lies on segment AB; otherwise false.
	 */
	public isOnSegment(a: Point, b: Point): boolean {
		// Reject immediately if the point is not collinear with segment AB.
		if (this.orientation(a, b) !== 0) return false;

		// Check that the point lies within the segment's bounding box
		return (
			this.x >= Math.min(a.x, b.x) &&
			this.x <= Math.max(a.x, b.x) &&
			this.y >= Math.min(a.y, b.y) &&
			this.y <= Math.max(a.y, b.y)
		);
	}

	/**
	 * Checks whether this point is to the left of, to the right of, or directly
	 * on (collinear with) the line formed by points A and B.
	 *
	 * @param a - First endpoint of the segment
	 * @param b - Second endpoint of the segment
	 * @returns
	 *  - A positive number if the point is to the left of the line AB
	 *  - A negative number if the point is to the right of the line AB
	 *  - Zero if the point lies exactly on the line AB
	 */
	public orientation(a: Point, b: Point): number {
		return (b.x - a.x) * (this.y - a.y) - (b.y - a.y) * (this.x - a.x);
	}
}
