import { LazyMap } from '@helpers/LazyMap.js';

/* ========================================================================== */

export type Guard = {
	id: number;
	minutes: Uint16Array;
	timeAsleep: number;
};

export type Input = Guard[];

/* ========================================================================== */

const regexGuardId = /#(\d+)/;
const regexAction = /(\d{2})\]/;

/* ========================================================================== */

export function parseInput(input: string): Input {
	const lines = input.split('\n');
	lines.sort();

	const guards: LazyMap<number, Guard> = new LazyMap(id => (
		{ id, minutes: new Uint16Array(60), timeAsleep: 0 } satisfies Guard
	));
	let guard: Guard;
	let start: number;

	for (let index: number = 0; index < lines.length; index++) {
		const line = lines[index];
		const guardId = line.match(regexGuardId)?.[1];
		// When the line contains "Guard" it's the start of a new shift.
		if (guardId) {
			start = undefined;
			guard = guards.get(Number(guardId));
			continue;
		}

		const [, minutes] = line.match(regexAction).map(Number);
		if (start === undefined) {
			start = minutes;
		} else {
			guard.timeAsleep += minutes - start;
			for (let minuteIndex: number = start; minuteIndex < minutes; minuteIndex++) {
				guard.minutes[minuteIndex]++;
			}
			start = undefined;
		}
	}

	return guards.values().toArray();
}
