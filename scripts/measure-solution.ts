/*
 |------------------------------------------------------------------------------
 | Measure solution
 |------------------------------------------------------------------------------
 |
 | This script will run the solution with the provided ID a number of times and
 | logs measurement statistics.
 |
 | ---------------------------------------------------------------------------
 |
 | Supported Arguments:
 | [1] Challenge ID (required)
 |     The first argument must be an ID in the format "yyyy/d|dd/*"
 | [2] Sample size (optional)
 |     The second argument can be used to provide the sample size to take for
 |     determining the averages and median times.
 |
 |*/

import { collectPerformanceData } from './utils/collect-performance-data.js';
import { resolveChallengeParamToPart } from './utils/resolve-challenge-param-to-part.js';

/* ========================================================================== */

const { day, path, year } = resolveChallengeParamToPart(process.argv[2]);
const sampleSize = isNaN(Number(process.argv[3])) ? undefined : Number(process.argv[3]);

const numberFormatter = new Intl.NumberFormat('en', {
	maximumFractionDigits: 5,
	minimumFractionDigits: 5
});

/* ========================================================================== */

function formatDuration(duration: number): string {
	return `${numberFormatter.format(duration)}ms`;
}

/* ========================================================================== */

const stats = await collectPerformanceData({
	day,
	path,
	year,
}, sampleSize);

console.log(`Fastest time: ${formatDuration(stats.sortedMeasurements.at(0))}`);
console.log(`Slowest time: ${formatDuration(stats.sortedMeasurements.at(-1))}`);

console.log(`Mean time to find the solution: ${formatDuration(stats.mean)}`);
console.log(`10% Trimmed mean time to find the solution: ${formatDuration(stats.trimmedMean)}`);
console.log(`Median time to find the solution: ${formatDuration(stats.median)}`);
