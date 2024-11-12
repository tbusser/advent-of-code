import {
	AndOrInstruction,
	AssignmentInstruction,
	BitwiseComplementInstruction,
	Instruction,
	ShiftInstruction,
	SignalInput,
} from './types.js';

/* ========================================================================== */

const maxSignal = 65535;

/* ========================================================================== */

export class Circuit {
	constructor() {
		//
	}

	/* ====================================================================== */

	private wires: Record<string, number> = {};

	/* ====================================================================== */

	private keepSignalInBounds(signal: number): number {
		if (signal < 0) return maxSignal + signal + 1;
		if (signal > maxSignal) return signal % maxSignal;

		return signal;
	}

	private processInstruction(instruction: Instruction): boolean {
		switch (instruction.type) {
			case 'and':
				return this.processAndInstruction(instruction);

			case 'assignment':
				return this.processAssignmentInstruction(instruction);

			case 'lshift':
				return this.processLeftShiftInstruction(instruction);

			case 'not':
				return this.processBitwiseComplementInstruction(instruction);

			case 'or':
				return this.processOrInstruction(instruction);

			case 'rshift':
				return this.processRightShiftInstruction(instruction);
		}
	}

	private processAndInstruction(instruction: AndOrInstruction): boolean {
		const signalA = this.getWireSignal(instruction.input.at(0));
		const signalB = this.getWireSignal(instruction.input.at(1));
		if (signalA === undefined || signalB === undefined) {
			return false;
		}

		this.setWireSignal(instruction.output, signalA & signalB);

		return true;
	}

	private processBitwiseComplementInstruction(instruction: BitwiseComplementInstruction) {
		const signal = this.getWireSignal(instruction.input);
		if (signal === undefined) {
			return false;
		}

		this.setWireSignal(instruction.output, ~signal);

		return true;
	}

	private processLeftShiftInstruction(instruction: ShiftInstruction) {
		const signal = this.getWireSignal(instruction.input);
		if (signal === undefined) {
			return false;
		}

		this.setWireSignal(instruction.output, signal << instruction.positions);

		return true;
	}

	private processOrInstruction(instruction: AndOrInstruction) {
		const signalA = this.getWireSignal(instruction.input.at(0));
		const signalB = this.getWireSignal(instruction.input.at(1));
		if (signalA === undefined || signalB === undefined) {
			return false;
		}

		this.setWireSignal(instruction.output, signalA | signalB);

		return true;
	}

	private processRightShiftInstruction(instruction: ShiftInstruction) {
		const signal = this.getWireSignal(instruction.input);
		if (signal === undefined) {
			return false;
		}

		this.setWireSignal(instruction.output, signal >> instruction.positions);

		return true;
	}

	private processAssignmentInstruction(instruction: AssignmentInstruction) {
		const signal = this.getWireSignal(instruction.input);
		if (signal === undefined) {
			return false;
		}

		this.setWireSignal(instruction.output, signal);

		return true;
	}

	private setWireSignal(wire: string, signal: number) {
		this.wires[wire] = this.keepSignalInBounds(signal);
	}

	/* ---------------------------------------------------------------------- */

	public followInstructions(instructions: Instruction[]) {
		const queue = new Set(instructions);

		while (queue.size > 0) {
			for (const instruction of queue) {
				const isProcessed = this.processInstruction(instruction);
				if (isProcessed) {
					queue.delete(instruction);
				}
			}
		}
	}

	public logSignals() {
		console.table(this.wires);
	}

	public getWireSignal(signalInput: SignalInput): number | undefined {
		return Number.isFinite(signalInput)
			? signalInput as number
			: this.wires[signalInput];
	}

	public reset() {
		this.wires = {};
	}
}
