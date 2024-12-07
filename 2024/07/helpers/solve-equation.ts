import { Equation } from './types.js';

/* ========================================================================== */

export function solveEquation(equation: Equation, allowConcats: boolean = false): boolean {
	const operationLimit = allowConcats ? 3 : 2;

	function solve(intermediate: number, numbersRemaining: number[]): boolean {
		const currentNumber = numbersRemaining[0];
		const leftover = numbersRemaining.slice(1);

		for (let index = 0; index < operationLimit; index++) {
			const total = index === 0
				? intermediate + currentNumber
				: index == 1
					? intermediate * currentNumber
					: Number(`${intermediate}${currentNumber}`);

			if (total === equation.testValue && leftover.length === 0) return true;
			if (total > equation.testValue) continue;
			if (leftover.length === 0) continue;

			if (solve(total, leftover)) return true;
		}
	}

	return solve(equation.numbers[0], equation.numbers.slice(1));
}
