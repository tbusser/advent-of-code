import {
	AndOrInstruction,
	AssignmentInstruction,
	BitwiseComplementInstruction,
	Instruction,
	ShiftInstruction,
	SignalInput
} from './types.js';

/* ========================================================================== */

const regexAssignment = /^(?<input>\w+) -> (?<output>\w+)$/;
const regexAndOr = /(?<inputA>\w+) (?<operation>AND|OR) (?<inputB>\w+) -> (?<output>\w+)/;
const regexLRShift = /(?<input>\w+) (?<operation>(?:L|R)SHIFT) (?<positions>\d+) -> (?<output>\w+)/;
const regexBitwiseComplement = /NOT (?<input>\w+) -> (?<output>\w+)/;

/* ========================================================================== */

function parseValue(value: string): SignalInput {
	const valueAsNumber = Number(value);

	return isNaN(valueAsNumber) ? value : valueAsNumber;
}

/* ========================================================================== */

function parseAndOrInstruction(instruction: string): AndOrInstruction {
	const { inputA, inputB, operation, output } = regexAndOr.exec(instruction).groups;

	return {
		type: operation.toLowerCase() as AndOrInstruction['type'],
		input: [parseValue(inputA), parseValue(inputB)],
		output
	};
}

function parseAssignmentInstruction(instruction: string): AssignmentInstruction {
	const { input, output } = regexAssignment.exec(instruction).groups;

	return {
		type: 'assignment',
		input: parseValue(input),
		output
	};
}

function parseBitwiseComplementInstruction(instruction: string): BitwiseComplementInstruction {
	const { input, output } = regexBitwiseComplement.exec(instruction).groups;

	return {
		type: 'not',
		input: parseValue(input),
		output
	};
}

function parseShiftInstruction(instruction: string): ShiftInstruction {
	const { input, operation, positions, output } = regexLRShift.exec(instruction).groups;

	return {
		type: operation.toLowerCase() as ShiftInstruction['type'],
		input: parseValue(input),
		output,
		positions: Number(positions)
	};
}

/* ========================================================================== */

export function parseInput(input: string): Instruction[] {
	const instructions = input.split('\n');

	return instructions.map(instruction => {
		if (regexAssignment.test(instruction)) return parseAssignmentInstruction(instruction);
		if (regexAndOr.test(instruction)) return parseAndOrInstruction(instruction);
		if (regexLRShift.test(instruction)) return parseShiftInstruction(instruction);
		if (regexBitwiseComplement.test(instruction)) return parseBitwiseComplementInstruction(instruction);

		throw `Found unknown instruction ${instruction}`;
	});
}
