import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

/**
 * My first solution was to take the letter 'e' as start and basically keep
 * applying the replacements like in part 1 till the medicine molecule has been
 * created. I was afraid it would create too many paths to follow and this soon
 * turned out to be true.
 *
 * My second solution was to work backwards, start from the medicine molecule
 * and reverse the replacements till it yields 'e' as a result. This seemed like
 * a valid strategy except it would never get to 'e'. At some point it would
 * reach a molecule which no longer contained parts which could be replaced.
 *
 * The current solution is not my own, it is based on a solution / explanation
 * found on Reddit. It works like magic.
 *
 * @see {@link https://www.reddit.com/r/adventofcode/comments/3xflz8/comment/cy4h7ji/}
 */
async function solver(input: string): Promise<number> {
	const { medicineMolecule } = parseInput(input);

	// A symbol starts with a capital letter.
	const symbolCount = medicineMolecule.match(/[A-Z]/g).length;

	// For each Rn is there is matching occurrence of Ar. When the number of
	// times Rn appears in the molecule is know, we also know the number of
	// times Ar should be present in the molecule.
	const rnCount = medicineMolecule.match(/Rn/g).length;

	// Count then number of times the letter Y is present in the molecule.
	const yCount = medicineMolecule.match(/Y/g).length;

	return (symbolCount - (rnCount * 2) - (2 * yCount)) - 1;
}

/* ========================================================================== */

export default {
	prompt: 'Minimum steps required to create medicine molecule',
	solver
} satisfies Solution;
