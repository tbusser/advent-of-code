import { Instruction, RegisterName } from './types.js';

/* ========================================================================== */

export class Simulator {
	constructor(initialAValue: number = 0) {
		this.registers.a = initialAValue;
	}

	/* ---------------------------------------------------------------------- */

	private registers: Record<RegisterName, number> = { a: 0, b: 0 };

	public get a(): number { return this.registers.a; }

	public get b(): number { return this.registers.b; }

	/* ---------------------------------------------------------------------- */

	private hlf(register: RegisterName): number {
		this.registers[register] = this.registers[register] / 2;

		return 1;
	}

	private tpl(register: RegisterName): number {
		this.registers[register] = this.registers[register] * 3;

		return 1;
	}

	private inc(register: RegisterName): number {
		this.registers[register] = this.registers[register] + 1;

		return 1;
	}

	private jmp(offset: number): number {
		return offset;
	}

	private jie(register: RegisterName, offset: number): number {
		return this.registers[register] % 2 === 0
			? offset
			: 1;
	}

	private jio(register: RegisterName, offset: number): number {
		return this.registers[register] === 1
			? offset
			: 1;
	}

	private execute(instruction: Instruction) {
		switch (instruction.instruction) {
			case 'hlf':
				return this.hlf(instruction.register);

			case 'tpl':
				return this.tpl(instruction.register);

			case 'inc':
				return this.inc(instruction.register);

			case 'jmp':
				return this.jmp(instruction.offset);

			case 'jie':
				return this.jie(instruction.register, instruction.offset);

			case 'jio':
				return this.jio(instruction.register, instruction.offset);
		}
	}

	/* ---------------------------------------------------------------------- */

	public runProgram(instructions: Instruction[]) {
		const numberOfInstructions = instructions.length;
		let index = 0;

		while (index < numberOfInstructions) {
			const instruction = instructions[index];

			index += this.execute(instruction);
		}
	}
}
