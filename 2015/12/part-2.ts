function count(source: unknown): number {
	if (typeof source === 'string') return 0;

	if (Number.isInteger(source)) return source as number;

	if (Array.isArray(source)) {
		return source.reduce((total, item) => total + count(item), 0);
	}

	if (typeof source === 'object') {
		if (Object.values(source).includes('red')) return 0;

		return Object.keys(source).reduce<number>((total, key) => total + count(source[key]), 0);
	}
}

/* -------------------------------------------------------------------------- */

async function solver(input: string): Promise<number> {
	const source = JSON.parse(input);

	return count(source);
}

/* ========================================================================== */

export default {
	prompt: 'The sum of all the numbers in the document is',
	solver
} satisfies Solution;
