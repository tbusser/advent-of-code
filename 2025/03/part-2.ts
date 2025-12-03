import { type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

const targetBatteryCount: number = 12;

/* -------------------------------------------------------------------------- */

/**
 * The function will find the maximum joltage by taking a candidate group from
 * which to pick the highest joltage while making sure it leaves enough
 * batteries to fill out the result to reach the target battery count.
 *
 * @example
 * findJoltage(234234234234278, 12);
 * iteration 1:
 *   remaining:234234234234278, candidates:2342, winner:4 (discard 23)
 *   By taking the first 4 batteries there are 11 batteries left. If the highest
 *   joltage is the last battery in the candidate group, we still have enough
 *   batteries left to fill the target number.
 * iteration 2:
 *   remaining:234234234278, candidates:23, winner:3 (discard 2)
 * iteration 3:
 *   remaining:4234234278, done
 *   The length of the remaining batteries equals the number needed to reach the
 *   target battery count.
 */
function findMaxJoltage(bank: number[]): number {
	const result: number[] = [];
	const remainingBatteries: number[] = [...bank];

	// Keep looping as long as the following two conditions are met:
	// - The number of remaining batteries can't be equal to the number of
	//   batteries we still need for the desired number of batteries in
	//   the result. When it is equal we can simply assign the remaining
	//   batteries to the result.
	// - The number of batteries in the result can't be equal to the desired
	//   number of batteries.
	while (
		remainingBatteries.length !== targetBatteryCount - result.length &&
		result.length !== targetBatteryCount
	) {
		// From the remaining batteries, take the first X batteries while making
		// sure the remaining battery pool is large enough to fill the result to
		// the target battery count.
		const candidates: number[] =
			remainingBatteries.splice(0, remainingBatteries.length - (targetBatteryCount - 1 - result.length));

		// Find the battery with the highest joltage in the list of candidates
		// and keep track of its index in the list.
		const battery: { joltage: number, index: number } = candidates.reduce((highestCapacity, joltage, index) => {
			return (joltage > highestCapacity.joltage)
				? { joltage, index }
				: highestCapacity;
		}, { joltage: -Infinity, index: -1 });

		result.push(battery.joltage);
		// Any candidates after the battery with the highest joltage should be
		// re-added to the front of the remaining batteries.
		remainingBatteries.unshift(...candidates.slice(battery.index + 1));
	}

	if (result.length !== targetBatteryCount) result.push(...remainingBatteries);

	return Number(result.join(''));
}

/* -------------------------------------------------------------------------- */

function solver(input: string): number {
	const banks: Input = parseInput(input);

	// Return the sum of the max joltage per battery bank.
	return banks.reduce((totalJoltage, bank) => totalJoltage += findMaxJoltage(bank), 0);
}

/* ========================================================================== */

export default {
	prompt: 'Total output of joltage',
	solver
} satisfies Solution;
