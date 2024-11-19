import { Instruction, Range } from './types.js';

/* ========================================================================== */

const instructionRegex = /(?<action>.*?) (?<startx>\d+),(?<starty>\d+).*?(?<endx>\d+),(?<endy>\d+)/;

/* ========================================================================== */

export function parseInput(input: string): Instruction[] {
	const instructions = input.split('\n');

	return instructions.map<Instruction>(instruction => {
		const { action, endx, endy, startx, starty } = instructionRegex.exec(instruction).groups;

		return {
			action: action as Instruction['action'],
			range: {
				start: { x: Number(startx), y: Number(starty) },
				end: { x: Number(endx), y: Number(endy) }
			} satisfies Range
		};
	});
}
