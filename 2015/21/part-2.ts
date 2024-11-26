import { fight } from './helpers/fight.js';
import { getPlayerEquipment } from './helpers/items.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

/**
 * The number of hit points for the player.
 */
const hitPoints = 100;

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const boss = parseInput(input);
	let mostExpensiveEquipmentCosts = -Infinity;

	for (const equipment of getPlayerEquipment()) {
		if (fight({ hitPoints, armor: equipment.armor, damage: equipment.damage }, boss) === 'boss') {
			mostExpensiveEquipmentCosts = Math.max(mostExpensiveEquipmentCosts, equipment.cost);
		}
	}

	return mostExpensiveEquipmentCosts;
}

/* ========================================================================== */

export default {
	prompt: 'The most expensive equipment set which still loses costs',
	solver
} satisfies Solution;
