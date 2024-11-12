function parseDimensions(input: string): number[] {
	return input.split('x').map(Number);
}

/* ========================================================================== */
export async function partOne(input: string): Promise<number> {
	const gifts = input.split('\n');

	const squareFeet = gifts.reduce((total, gift) => {
		const [l, w, h] = parseDimensions(gift);

		const sides = [l * w, w * h, h * l];
		const smallestSide = Math.min(...sides);

		const squareFeet =
			sides.reduce((total, side) => total + 2 * side, 0) + smallestSide;

		return total + squareFeet;
	}, 0);

	return squareFeet;
}

export async function partTwo(input: string): Promise<number> {
	const gifts = input.split('\n');

	const feetOfRibbon = gifts.reduce((total, gift) => {
		const [l, w, h] = parseDimensions(gift);

		// Sort the sides in ascending order, this way the smallest sides are at
		// the front of the array.
		const sides = [l, w, h].sort((a, b) => a - b);

		// Calculate the volume and the length of ribbon needed for the bow.
		const volume = l * w * h;
		const ribbonLength = sides.at(0) * 2 + sides.at(1) * 2;

		return total + ribbonLength + volume;
	}, 0);

	return feetOfRibbon;
}
