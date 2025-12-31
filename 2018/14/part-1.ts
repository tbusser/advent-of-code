function solver(input: string): string {
	const limit: number = Number(input) + 10;
	const recipes = new Uint8Array(limit);

	// Seed the recipes array with the initial scores
	recipes[0] = 3;
	recipes[1] = 7;

	let endIndex = 1;
	let elfOneIndex = 0;
	let elfTwoIndex = 1;

	while (endIndex < limit) {
		const sum: number = recipes[elfOneIndex] + recipes[elfTwoIndex];
		if (sum > 9) recipes[++endIndex] = 1;

		if (endIndex === limit) break;

		recipes[++endIndex] = sum % 10;

		elfOneIndex = (elfOneIndex + recipes[elfOneIndex] + 1) % (endIndex + 1);
		elfTwoIndex = (elfTwoIndex + recipes[elfTwoIndex] + 1) % (endIndex + 1);
	}

	return recipes.slice(limit - 10).join('');
}

/* ========================================================================== */

export default {
	prompt: 'Scores of the final 10 recipes',
	solver
} satisfies Solution<string>;
