import { parseInput } from './helpers/parse-input.js';
import { Profile, profile } from './helpers/profile.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const aunts = parseInput(input);

	for (const [index, aunt] of aunts.entries()) {
		const isMatch = Object.keys(aunt).every((key: keyof Profile) => {
			switch (key) {
				case 'cats':
				case 'trees':
					return aunt[key] > profile[key];

				case 'goldfish':
				case 'pomeranians':
					return aunt[key] < profile[key];

				default:
					return aunt[key] === profile[key];
			}
		});
		if (isMatch) return index + 1;
	}

	return -1;
}

/* ========================================================================== */

export default {
	prompt: 'The number of the real Sue that got me the gift is',
	solver
} satisfies Solution;
