import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function isDesignPossible(design: string, patterns: string[]): boolean {
	const queue: string[] = [design];

	while (queue.length > 0) {
		const currentDesign = queue.pop();

		for (const pattern of patterns) {
			if (currentDesign === pattern) return true;
			if (currentDesign.startsWith(pattern)) queue.push(currentDesign.substring(pattern.length));
		}
	}

	return false;
}

/* -------------------------------------------------------------------------- */

function solver(input: string): number {
	const { designs, patterns } = parseInput(input);

	return designs.reduce<number>(
		(possibleDesigns, design) => possibleDesigns + (isDesignPossible(design, patterns) ? 1 : 0)
		, 0
	);
}

/* ========================================================================== */

export default {
	prompt: 'Number of possible designs',
	solver
} satisfies Solution;
