export type Schematics = {
	keys: number[][];
	locks: number[][];
};

/* ========================================================================== */

const idRow = '#####';

/* ========================================================================== */

function convertSchemaToHeights(schema: string): number[] {
	const result = [];
	const rows = schema.split('\n');

	for (let column = 0; column < 5; column++) {
		// Start with -1 to offset the counting the ID row with all '#'.
		result.push(rows.reduce((height, row) => height + (row[column] === '#' ? 1 : 0), -1));
	}

	return result;
}

function isLock(schema: string): boolean {
	return schema.startsWith(idRow);
}

/* -------------------------------------------------------------------------- */

export function parseInput(input: string): Schematics {
	const items = input.split('\n\n');

	const result: Schematics = {
		keys: [],
		locks: []
	};

	items.forEach(item => {
		const itemType: keyof Schematics = isLock(item) ? 'locks' : 'keys';
		result[itemType].push(convertSchemaToHeights(item));
	});

	return result;
}
