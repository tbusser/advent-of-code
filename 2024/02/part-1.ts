import { isReportSafe } from './helpers/is-report-safe.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const reports = parseInput(input);

	return reports.filter(isReportSafe).length;
}

/* ========================================================================== */

export default {
	prompt: 'Number of safe reports',
	solver
} satisfies Solution;
