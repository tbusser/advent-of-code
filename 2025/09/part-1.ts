import { pairs } from '@helpers/pairs.js';
import { type Input, parseInput } from './helpers/parse-input.js';
import { Coordinate } from '@helpers/grid.js';

/* ========================================================================== */

function calculateSurfaceArea([a, b]: readonly [Coordinate, Coordinate]): number {
	return Math.max(a.x - b.x + 1) * Math.max(a.y - b.y + 1);
}

function solver(input: string): number {
	const data: Input = parseInput(input);

	return pairs(data).reduce<number>((max, pair) => Math.max(max, calculateSurfaceArea(pair)), 0);
}

/* ========================================================================== */

export default {
	prompt: 'Largest area of any rectangle',
	solver
} satisfies Solution;
