import { Points } from './parse-input.js';

/* ========================================================================== */

export function isTriangle([pointA, pointB, pointC]: Points): boolean {
	return (
		pointA + pointB > pointC &&
		pointA + pointC > pointB &&
		pointB + pointC > pointA
	);
}
