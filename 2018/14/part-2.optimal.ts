function growArray(array: Uint8Array): Uint8Array {
	const newArray: Uint8Array = new Uint8Array(array.length * 2);
	newArray.set(array);

	return newArray;
}

/* ========================================================================== */

function solver(input: string): number {
	const lastDigit: number = Number(input) % 10;
	const sequence: number[] = input.split('').map(Number).reverse();
	let recipes: Uint8Array = new Uint8Array(1_000_000);

	// Seed the recipes array with the initial scores
	recipes[0] = 3;
	recipes[1] = 7;

	let endIndex = 1;
	let elfOneIndex = 0;
	let elfTwoIndex = 1;

	function isMatch(): boolean {
		// Index 0 can be skipped as this was already checked in the while.
		for (let index: number = 1; index < sequence.length; index++) {
			if (sequence[index] !== recipes[endIndex - index]) return false;
		}

		return true;
	}

	while (true) {
		const sum: number = recipes[elfOneIndex] + recipes[elfTwoIndex];

		if (sum > 9) {
			recipes[++endIndex] = 1;
			if (lastDigit === 1 && isMatch()) return endIndex - input.length + 1;
			if (endIndex + 1 === recipes.length) recipes = growArray(recipes);
		}

		recipes[++endIndex] = sum % 10;
		if (lastDigit === sum % 10 && isMatch()) return endIndex - input.length + 1;
		if (endIndex + 1 === recipes.length) recipes = growArray(recipes);

		elfOneIndex = (elfOneIndex + recipes[elfOneIndex] + 1) % (endIndex + 1);
		elfTwoIndex = (elfTwoIndex + recipes[elfTwoIndex] + 1) % (endIndex + 1);
	}
}

/* ========================================================================== */

export default {
	prompt: 'Recipes in front of input sequence',
	solver
} satisfies Solution;
