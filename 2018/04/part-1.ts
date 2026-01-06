import { type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const guards: Input = parseInput(input);

	const sleepiestGuard = { id: 0, index: 0, timeAsleep: 0, };
	for (let index: number = 0; index < guards.length; index++) {
		const guard = guards[index];
		if (guard.timeAsleep > sleepiestGuard.timeAsleep) {
			sleepiestGuard.id = guard.id;
			sleepiestGuard.index = index;
			sleepiestGuard.timeAsleep = guard.timeAsleep;
		}
	}

	const sleepiestMinute = { count: 0, index: 0 };
	const minutes = guards[sleepiestGuard.index].minutes;
	for (let index: number = 0; index < 60; index++) {
		if (minutes[index] > sleepiestMinute.count) {
			sleepiestMinute.count = minutes[index];
			sleepiestMinute.index = index;
		}
	}

	return sleepiestGuard.id * sleepiestMinute.index;
}

/* ========================================================================== */

export default {
	prompt: 'The result is',
	solver
} satisfies Solution;
