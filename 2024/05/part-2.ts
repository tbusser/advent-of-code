import { getApplicableRules } from './helpers/get-applicable-rules.js';
import { isValid } from './helpers/is-valid.js';
import { parseInput } from './helpers/parse-input.js';
import { Rule, Update } from './helpers/types.js';

/* ========================================================================== */

function swapPositions(update: Update, source: number, destination: number) {
	const temp = update[source];
	update[source] = update[destination];
	update[destination] = temp;
}

function reorderPages(update: Update, rules: Rule[]) {
	const applicableRules = getApplicableRules(update, rules);

	// Keep swapping items in invalid positions until all the rules validate.
	while (!isValid(update, applicableRules, false)) {
		for (const rule of applicableRules) {
			const indexA = update.indexOf(rule[0]);
			const indexB = update.indexOf(rule[1]);

			// When the rule is not met, swap the items so they do follow the
			// rule and stop processing the remaining rules.
			if (indexA > indexB) {
				swapPositions(update, indexA, indexB);

				break;
			}
		}
	}
}

/* -------------------------------------------------------------------------- */

async function solver(input: string): Promise<number> {
	const { rules, updates } = parseInput(input);
	const invalidUpdates = updates.filter(update => !isValid(update, rules));

	return invalidUpdates.reduce((total, update) => {
		reorderPages(update, rules);

		return total + update[Math.floor(update.length / 2)];
	}, 0);
}

/* ========================================================================== */

export default {
	prompt: 'The sum of the middle pages of the reordered updates is',
	solver
} satisfies Solution;
