import { Instruction, InstructionName, RegisterName } from './types.js';

/* ========================================================================== */

export function parseInput(input: string): Instruction[] {
	const lines = input.split('\n');

	return lines.map<Instruction>(line => {
		const [instruction, partB, partC] = line.split(/[\s,]+/g) as [InstructionName, RegisterName | string, string];

		switch (instruction) {
			case 'hlf':
			case 'tpl':
			case 'inc':
				return { instruction, register: partB as RegisterName };

			case 'jmp':
				return { instruction, offset: Number(partB) };

			case 'jie':
			case 'jio':
				return { instruction, register: partB as RegisterName, offset: Number(partC) };
		}
	});
}
