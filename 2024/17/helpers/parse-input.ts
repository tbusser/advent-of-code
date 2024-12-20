export type Computer = {
	registers: {
		a: number;
		b: number;
		c: number;
	};
	program: number[];
};

/* ========================================================================== */

const numberRegex = /\d+/gm;

/* ========================================================================== */

export function parseInput(input: string): Computer {
	const groups = input.split('\n\n');

	const [a, b, c] = groups[0].match(numberRegex).map(Number);

	return {
		registers: { a, b, c },
		program: groups[1].match(numberRegex).map(Number)
	};
}
