import { Rule, Update } from './types.js';

/* ========================================================================== */

export function getApplicableRules(update: Update, rules: Rule[]): Rule[] {
	const updateSet = new Set(update);

	// When the intersection between the update and the rule is 2 items it means
	// all the items in the rule are present in the update.
	return rules.filter(rule => new Set(rule).intersection(updateSet).size === 2);
}
