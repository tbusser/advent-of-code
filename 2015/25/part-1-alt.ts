import { parseInput } from './helpers/parse-input.js';
import { powerMod } from './helpers/power-mod.js';

/* ========================================================================== */

const startValue = 20151125;
const base = 252533;
const divisor = 33554393;

/* ========================================================================== */

/**
 * After finishing my brute force solution I had this feeling there must be a
 * more elegant solution to the problem. This solution is not my own, it is a
 * JavaScript version of the solution provided by Askalski on Reddit. It is
 * infinitely more elegant and a whole lot faster than brute forcing
 * the problem.
 *
 * @see {@link https://www.reddit.com/r/adventofcode/comments/3y5jco/comment/cyaqp5t}
 */
function solver(input: string): number {
	const { column, row } = parseInput(input);

	const exponent = (row + column - 2) * (row + column - 1) / 2 + column - 1;

	return powerMod(base, exponent, divisor) * startValue % divisor;
}

/* ========================================================================== */

export default {
	prompt: 'The code to give to the machine is',
	solver
} satisfies Solution;
