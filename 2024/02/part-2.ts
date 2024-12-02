import { isReportSafe } from './helpers/is-report-safe.js';
import { parseInput, Report } from './helpers/parse-input.js';

/* ========================================================================== */

function isReportOrModificationsSafe(report: Report): boolean {
	// Check if the report as-is is safe.
	if (isReportSafe(report)) return true;

	// Iterate over all the levels and each time leave out the current level
	// before rechecking the report.
	for (let index = 0; index < report.length; index++) {
		const modifiedReport = report.filter((_, filterIndex) => index !== filterIndex);

		if (isReportSafe(modifiedReport)) return true;
	}

	return false;
}

/* -------------------------------------------------------------------------- */

async function solver(input: string): Promise<number> {
	const reports = parseInput(input);

	return reports.filter(isReportOrModificationsSafe).length;
}

/* ========================================================================== */

export default {
	prompt: 'Number of safe reports',
	solver
} satisfies Solution;
