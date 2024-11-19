type Dimensions = {
	height: number;
	length: number;
	width: number;
};

/* ========================================================================== */

function parseDimensions(input: string): number[] {
	return input.split('x').map(Number);
}

/* ========================================================================== */

export function parseInput(input: string): Dimensions[] {
	const gifts = input.split('\n');

	return gifts.map<Dimensions>(gift => {
		const [length, width, height] = parseDimensions(gift);

		return { length, width, height };
	});
}
