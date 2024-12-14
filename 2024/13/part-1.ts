import { Machine, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function playMachine(machine: Machine): number {
	for (let pushes = 100; pushes >= 1; pushes--) {
		const x: number = machine.aX * pushes;
		const y: number = machine.aY * pushes;

		if (x > machine.pX || y > machine.pY) continue;

		const remainingX = machine.pX - x;
		const remainingY = machine.pY - y;

		const bXPushes = remainingX / machine.bX;
		const bYPushes = remainingY / machine.bY;

		if (bXPushes == bYPushes) {
			return (pushes * 3) + bXPushes;
		}
	}

	return 0;
}

/* ========================================================================== */

function solver(input: string): number {
	const machines = parseInput(input);

	return machines.reduce<number>((total, machine) => total + playMachine(machine), 0);
}

/* ========================================================================== */

export default {
	prompt: 'Fewest tokens you can spend to win all prices',
	solver
} satisfies Solution;
