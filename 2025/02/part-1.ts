import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const ranges = parseInput(input);
	let total: number = 0;

	for (const [start, end] of ranges) {
		for (let id = start; id <= end; id++) {
			const idAsString = id.toString();
			if (idAsString.length % 2 === 1) continue;

			if (idAsString.substring(0, idAsString.length / 2) === idAsString.substring(idAsString.length / 2)) {
				total += id;
			}
		}
	}

	return total;
}

/* ========================================================================== */

export default {
	prompt: 'Sum of the invalid IDs',
	solver
} satisfies Solution;
