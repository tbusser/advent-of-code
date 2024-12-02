import { parseInput, Report } from './helpers/parse-input.js';

/* ========================================================================== */

function isReportSafe(report: Report): boolean {
	const directionCheck = report[0] < report[1]
		? (difference) => difference < 0
		: (difference) => difference > 0;

	for (let index = 0; index < report.length - 1; index++) {
		const difference = report[index] - report[index + 1];
		if (Math.abs(difference) < 0 || Math.abs(difference) > 3) return false;
		if (!directionCheck(difference)) return false;
	}

	return true;
}

/* -------------------------------------------------------------------------- */

async function solver(input: string): Promise<number> {
	const reports = parseInput(input);

	return reports.filter(isReportSafe).length;
}

/* ========================================================================== */

export default {
	prompt: 'Number of safe reports',
	solver
} satisfies Solution;
