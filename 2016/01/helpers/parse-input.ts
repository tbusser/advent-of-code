import { Instruction } from './types.js';

/* ========================================================================== */

export function parseInput(input: string): Instruction[] {
	const lines = input.split(', ');

	return lines.map(line => {
		const turn = line.charAt(0) as 'R' | 'L';
		const steps = Number(line.substring(1));

		return {
			steps,
			turn: turn === 'R' ? 1 : -1
		};
	});
}
