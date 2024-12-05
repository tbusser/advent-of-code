import { getApplicableRules } from './get-applicable-rules.js';
import { Rule, Update } from './types.js';

/* ========================================================================== */

export function isValid(update: Update, rules: Rule[], filter = true): boolean {
	const applicableRules = filter
		? getApplicableRules(update, rules)
		: rules;

	return applicableRules.every(rule => update.indexOf(rule[0]) < update.indexOf(rule[1]));
}
