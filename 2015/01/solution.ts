const symbolUp = '(';

/* ========================================================================== */

export async function partOne(input: string): Promise<number> {
	const moveUp = input.match(/\(/g)?.length || 0;
	const moveDown = input.match(/\)/g)?.length || 0;

	return Promise.resolve(moveUp - moveDown);
}

export async function partTwo(input: string): Promise<number> {
	let currentFloor = 0;

	for (let step = 0; step < input.length; step++) {
		const char = input[step];

		currentFloor += char === symbolUp ? 1 : -1;

		if (currentFloor === -1) {
			return step + 1;
		}
	}
}
