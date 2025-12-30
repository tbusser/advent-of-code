import { getWinningScore } from './helpers/get-winning-score.list.js';
import { type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const data: Input = parseInput(input);

	return getWinningScore(data.players, data.maxValue * 100);
}

/* ========================================================================== */

export default {
	prompt: 'Score of the winning Elf',
	solver
} satisfies Solution;
