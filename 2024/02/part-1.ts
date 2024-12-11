import { isReportSafe } from './helpers/is-report-safe.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const reports = parseInput(input);

	return reports.filter(isReportSafe).length;
}

/* ========================================================================== */

export default {
	prompt: 'Number of safe reports',
	solver
} satisfies Solution;
