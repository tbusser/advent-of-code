import { Report } from './parse-input.js';

/* ========================================================================== */

export function isReportSafe(report: Report): boolean {
	// If the difference between item 0 and 1 is negative, all the deltas should
	// be negative. Same for when the first delta is positive, they all should
	// be positive.
	const deltaCheck = report[0] < report[1]
		? (difference: number) => difference < 0
		: (difference: number) => difference > 0;

	for (let index = 0; index < report.length - 1; index++) {
		// Calculating the difference per check is faster than calculating it
		// once and storing it in a const.
		if (Math.abs(report[index] - report[index + 1]) < 1) return false;
		if (Math.abs(report[index] - report[index + 1]) > 3) return false;
		if (!deltaCheck(report[index] - report[index + 1])) return false;
	}

	return true;
}
