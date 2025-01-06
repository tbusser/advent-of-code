import { generateSecret } from './helpers/generate-secret.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const buyers = parseInput(input);
	const deltaGroups = new Map<string, number>();

	for (const secret of buyers) {
		let previousPrice = secret % 10;
		const deltas: number[] = [];
		const buyerPairs = new Set<string>();

		for (let index = 0, value = secret; index < 2000; index++) {
			// Generate the next secret.
			value = generateSecret(value);
			// Push the difference in price between the new value and the
			// previous value;
			deltas.push(value % 10 - previousPrice);
			// Remember the price of the current value, we need this for the
			// next iteration.
			previousPrice = value % 10;

			// Once we reach index 3 generated at least 4 price deltas which
			// means it is possible to create a group of 4 deltas and see how
			// many bananas it will give us.
			if (index >= 3) {
				// Create a key for this group of price deltas.
				const key = `${deltas[index - 3]},${deltas[index - 2]},${deltas[index - 1]},${deltas[index]}`;
				// Check if this combination of price deltas has not yet been
				// encountered. We only want to process the value of the first
				// time a key is encountered per buyer.
				if (!buyerPairs.has(key)) {
					// Mark the key as processed.
					buyerPairs.add(key);
					// Add the price to the total for this combination of keys.
					deltaGroups.set(key, (deltaGroups.get(key) ?? 0) + previousPrice);
				}
			}
		}
	}

	// Return the highest value of all the price chance groups.
	return Math.max(...deltaGroups.values());
}

/* ========================================================================== */

export default {
	prompt: 'The most bananas you can get is',
	solver
} satisfies Solution;
