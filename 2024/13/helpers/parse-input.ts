export type Machine = {
	aX: number;
	aY: number;
	bX: number;
	bY: number;
	pX: number;
	pY: number;
};

/* ========================================================================== */

const numberRegex = /-?(\d+)/g;

/* ========================================================================== */

export function parseInput(input: string, priceOffset: number = 1): Machine[] {
	const groups = input.split('\n\n');

	return groups.map(group => {
		const lines = group.split('\n');

		const [aX, aY] = lines[0].match(numberRegex).map(Number);
		const [bX, bY] = lines[1].match(numberRegex).map(Number);
		const [pX, pY] = lines[2].match(numberRegex).map(value => Number(value) + priceOffset);

		return { aX, aY, bX, bY, pX, pY } satisfies Machine;
	});
}
