const symbolUp = '(';

/* ========================================================================== */

export async function solver(input: string): Promise<number> {
	let currentFloor = 0;

	for (let step = 0; step < input.length; step++) {
		const char = input[step];

		currentFloor += char === symbolUp ? 1 : -1;

		if (currentFloor === -1) {
			return step + 1;
		}
	}
}

/* -------------------------------------------------------------------------- */

export default {
	prompt: 'The position of the character that causes Santa to first enter the basement is',
	solver,
} satisfies Solution;
