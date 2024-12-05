import { Rule, Update } from './types.js';

/* ========================================================================== */

export function parseInput(input: string): { rules: Rule[], updates: Update[] } {
	const lines = input.split('\n');
	const rules: Rule[] = [];
	const updates: Update[] = [];

	let section: number = 0;
	for (const line of lines) {
		if (line === '') {
			section = 1;
			continue;
		}

		if (section === 0) {
			rules.push(line.split('|').map(Number) as Rule);
		} else {
			updates.push(line.split(',').map(Number));
		}
	}

	return {
		rules,
		updates
	};
}
