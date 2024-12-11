import { parseInput } from './helpers/parse-input.js';
import { solveEquation } from './helpers/solve-equation.js';

/* ========================================================================== */

function solver(input: string): number {
	const equations = parseInput(input);

	return equations.reduce((total, equation) => total + (solveEquation(equation, true) ? equation.testValue : 0), 0);
}

/* ========================================================================== */

export default {
	prompt: 'Total calibration result',
	solver
} satisfies Solution;
