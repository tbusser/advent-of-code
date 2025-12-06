export type Input = {
	line1: number[];
	line2: number[];
	line3: number[];
	line4: number[];
	operator: string[];
};

/* ========================================================================== */

export function parseInput(input: string): Input {
	const lines = input.split('\n');

	return {
		line1: lines[0].trim().split(/\s+/).map(Number),
		line2: lines[1].trim().split(/\s+/).map(Number),
		line3: lines[2].trim().split(/\s+/).map(Number),
		line4: lines[3].trim().split(/\s+/).map(Number),
		operator: lines[4].trim().split(/\s+/),
	};
}
