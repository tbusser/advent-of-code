import { type Input, parseInput } from './helpers/parse-input.js';
import { getWinningScore } from './helpers/get-winning-score.list.js';

/* ========================================================================== */

function solver(input: string): number {
	const data: Input = parseInput(input);

	// Return the highest score of all players.
	return getWinningScore(data.players, data.maxValue);
}

/* ========================================================================== */

export default {
	prompt: 'Score of the winning Elf',
	solver
} satisfies Solution;
