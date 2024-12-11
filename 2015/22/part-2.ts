import { fight } from './helpers/fight.js';
import { initializeGame } from './helpers/game-state.js';
import { parseInput } from './helpers/parse-input.js';
import { PlayerStats } from './helpers/types.js';

/* ========================================================================== */

const player: PlayerStats = {
	hitPoints: 50,
	manaPool: 500
};

/* ========================================================================== */

function solver(input: string): number {
	const boss = parseInput(input);

	const initialGameState = initializeGame(boss, player);

	return fight(initialGameState, true);
}

/* ========================================================================== */

export default {
	prompt: 'Least amount of mana needed to win the fight on hard mode',
	solver
} satisfies Solution;
