import { parseInput } from './helpers/parse-input.js';
import { Point } from './helpers/Point.js';
import { Polygon } from './helpers/Polygon.js';

/* ========================================================================== */

function solver(input: string): number {
	const points = parseInput(input).map(point => Point.create(point.x, point.y));
	const theatrePolygon = Polygon.fromPoints(points);

	// Generate all possible rectangles from pairs of corner points, then sort
	// by area (largest first) for greedy optimization.
	const rectangles: Polygon[] = [];
	for (let outer = 0; outer < points.length; outer++) {
		for (let inner = outer + 1; inner < points.length; inner++) {
			rectangles.push(Polygon.fromCorners(points[outer], points[inner]));
		}
	}
	rectangles.sort((a, b) => b.area - a.area);

	// Find the largest rectangle that fits within the theatre.
	for (const rectangle of rectangles) {
		if (theatrePolygon.containsPolygon(rectangle)) return rectangle.area;
	}

	// In case none of the rectangles fit, return -1.
	return -1;
}

/* ========================================================================== */

export default {
	prompt: 'Area of largest valid rectangle',
	solver
} satisfies Solution;
