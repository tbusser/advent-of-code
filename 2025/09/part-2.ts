import { parseInput } from './helpers/parse-input.js';
import { Point } from './helpers/Point.js';
import { Polygon } from './helpers/Polygon.js';

/* ========================================================================== */

/**
 * Creates a rectangular polygon defined by two opposite corner points. The
 * rectangle is axis-aligned (edges parallel to the x and y axes).
 *
 * @param a - One corner of the rectangle
 * @param b - The opposite corner of the rectangle
 * @returns A Polygon instance representing the rectangle.
 */
function createRectangularPolygon(a: Point, b: Point): Polygon {
	const vertices = [
		Point.create(Math.min(a.x, b.x), Math.min(a.y, b.y)),
		Point.create(Math.max(a.x, b.x), Math.min(a.y, b.y)),
		Point.create(Math.max(a.x, b.x), Math.max(a.y, b.y)),
		Point.create(Math.min(a.x, b.x), Math.max(a.y, b.y))
	];

	return Polygon.fromPoints(vertices);
}

/**
 * Calculates the area of an axis-aligned rectangular polygon.
 *
 * Assumes that `poly.vertices[0]` and `poly.vertices[2]` are opposite corners
 * of the rectangle, and that coordinates are on a discrete grid (inclusive),
 * hence the `+1` in width and height.
 *
 * @param poly - A rectangular polygon with vertices in the expected order
 * @returns The area of the rectangle
 */
function calculateArea(poly: Polygon): number {
	return (poly.vertices[2].x - poly.vertices[0].x + 1) * (poly.vertices[2].y - poly.vertices[0].y + 1);
}

function solver(input: string): number {
	const points = parseInput(input).map(point => Point.create(point.x, point.y));
	const theatrePolygon = Polygon.fromPoints(points);

	let maxArea: number = 0;

	for (let outer = 0; outer < points.length; outer++) {
		for (let inner = outer + 1; inner < points.length; inner++) {
			if (
				points[outer].x === points[inner].x ||
				points[outer].y === points[inner].y
			) continue;

			const poly = createRectangularPolygon(points[inner], points[outer]);

			if (theatrePolygon.containsPolygon(poly)) {
				maxArea = Math.max(maxArea, calculateArea(poly));
			}
		}
	}

	return maxArea;
}

/* ========================================================================== */

export default {
	prompt: 'Area of largest valid rectangle',
	solver
} satisfies Solution;
