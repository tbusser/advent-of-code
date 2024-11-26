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
	let lowestEquipmentCost = Infinity;

	// Iterate over all the equipment combinations.
	for (const equipment of getPlayerEquipment()) {
		// Fight the boss using the current equipment.
		if (fight({ hitPoints, armor: equipment.armor, damage: equipment.damage }, boss) === 'player') {
			// The player has won the fight, keep the cost of the cheapest
			// winning equipment set.
			lowestEquipmentCost = Math.min(lowestEquipmentCost, equipment.cost);
		}
	}

	return lowestEquipmentCost;
}

/* ========================================================================== */

export default {
	prompt: 'The cheapest equipment set which can win costs',
	solver
} satisfies Solution;
