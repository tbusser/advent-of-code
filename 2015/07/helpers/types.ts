export type SignalInput = number | string;

/* -------------------------------------------------------------------------- */

export type AndOrInstruction = {
	type: 'and' | 'or'
	input: SignalInput[];
	output: string;
};

export type AssignmentInstruction = {
	type: 'assignment',
	input: SignalInput;
	output: string;
};

export type BitwiseComplementInstruction = {
	type: 'not',
	input: SignalInput;
	output: string;
};

export type ShiftInstruction = {
	type: 'lshift' | 'rshift';
	input: SignalInput;
	output: string;
	positions: number;
};

export type Instruction =
	AssignmentInstruction |
	AndOrInstruction |
	BitwiseComplementInstruction |
	ShiftInstruction;
