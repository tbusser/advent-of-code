export type InitialState = {
	a: number;
	b: number;
	c: number;
};

/* ========================================================================== */

enum OpCode {
	Adv,
	Bxl,
	Bst,
	Jnz,
	Bxc,
	Out,
	Bdv,
	Cdv
};

/* ========================================================================== */

export class ChronospatialComputer {
	constructor(initialState: InitialState) {
		this.a = initialState.a;
		this.b = initialState.b;
		this.c = initialState.c;
	}

	/* ====================================================================== */

	private a: number;
	private b: number;
	private c: number;

	private instructionIndex: number = 0;
	private output: number[] = [];

	private instructions: Record<OpCode, () => void> = {
		[OpCode.Adv]: () => this.a = Math.trunc(this.a / Math.pow(2, this.getComboOperandValue())),
		[OpCode.Bxl]: () => this.b = ((this.b ^ this.getComboOperandValue(true)) >>> 0),
		[OpCode.Bst]: () => this.b = (this.getComboOperandValue() % 8),
		[OpCode.Jnz]: () => {
			if (this.a === 0) {
				this.instructionIndex++;

				return;
			};

			this.instructionIndex = this.getComboOperandValue(true) - 1;
		},
		[OpCode.Bxc]: () => { this.getComboOperandValue(); this.b = ((this.b ^ this.c) >>> 0); },
		[OpCode.Out]: () => this.output.push((this.getComboOperandValue() % 8)),
		[OpCode.Bdv]: () => this.b = Math.trunc(this.a / Math.pow(2, this.getComboOperandValue())),
		[OpCode.Cdv]: () => this.c = Math.trunc(this.a / Math.pow(2, this.getComboOperandValue())),
	};

	private program: number[] = [];

	/* ====================================================================== */

	private getComboOperandValue(literal: boolean = false): number {
		const operand = this.program[++this.instructionIndex];

		if (literal) return operand;

		switch (operand) {
			case 4: return this.a;
			case 5: return this.b;
			case 6: return this.c;
			case 7: throw 'Encountered operand 7';
			default: return operand;
		}
	}

	private isFinished(): boolean {
		if (this.instructionIndex < 0) return true;
		if (this.instructionIndex >= this.program.length) return true;

		if (
			this.program[this.instructionIndex] !== OpCode.Out &&
			this.instructionIndex >= this.program.length - 1
		) {
			return true;
		}

		return false;
	}

	/* ====================================================================== */

	public getRegisterValue(register: 'a' | 'b' | 'c'): number {
		return this[register];
	}

	public runProgram(program: number[]): string {
		this.program = program;
		this.instructionIndex = 0;
		this.output = [];

		while (!this.isFinished()) {
			this.instructions[this.program[this.instructionIndex] as OpCode]();
			this.instructionIndex++;
		}

		return this.output.join(',');
	}

	public setRegisters(state: Partial<InitialState>) {
		Object.keys(state).forEach(key => {
			this[key] = state[key];
		});
	}
}
