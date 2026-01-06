import { type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const guards: Input = parseInput(input);
	const sleepiestGuard = { id: 0, sleepiestMinute: 0, count: 0 };

	for (const guard of guards) {
		// If the total time the guard is asleep is less than the number of
		// times another guard was asleep at a single minute, there is no need
		// to process the guard.
		if (guard.timeAsleep < sleepiestGuard.count) continue;

		for (let index: number = 0; index < 60; index++) {
			if (guard.minutes[index] > sleepiestGuard.count) {
				sleepiestGuard.count = guard.minutes[index];
				sleepiestGuard.id = guard.id;
				sleepiestGuard.sleepiestMinute = index;
			}
		}
	}

	return sleepiestGuard.id * sleepiestGuard.sleepiestMinute;
}

/* ========================================================================== */

export default {
	prompt: 'The result is',
	solver
} satisfies Solution;
