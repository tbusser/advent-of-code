import { generateSecret } from './helpers/generate-secret.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const buyers = parseInput(input);
	const deltaGroups = new Map<number, number>();

	for (const secret of buyers) {
		let previousPrice = secret % 10;
		const deltas: number[] = [];
		const buyerPairs = new Set<number>();

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
				// Using a string as a key is very slow, using a number is a lot
				// faster. Since the maximum change is from -9 to 9 the numbers
				// in the deltas array will never exceed 18. By multiplying the
				// values with the powers of 18 we can ensure the resulting
				// number is unique for that set of price changes.
				const key =
					(deltas[index - 3] * 5832) + // 18^3=5832
					(deltas[index - 2] * 324) +  // 18^2=324
					(deltas[index - 1] * 18) +   // 18^1=18
					deltas[index];               // 18^0=1

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
