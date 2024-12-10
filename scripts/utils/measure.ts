import { fetchInputForDay } from './fetch-input.js';
import { measure as measureExecution } from './performance.js';

/* ========================================================================== */

type Config = {
	year: number;
	day: number;
	solver: (input: string) => Promise<number | string>;
};

/* ========================================================================== */

const numberFormatter = new Intl.NumberFormat('en', {
	maximumFractionDigits: 5,
	minimumFractionDigits: 5
});

/* ========================================================================== */

function calculateAverage(measurements: number[]): number {
	return measurements.reduce((total, measurement) => total + measurement, 0) / measurements.length;
}

function calculateMedian(measurements: number[]): number {
	if (measurements.length % 2 === 0) {
		return (measurements[(measurements.length / 2) - 1] + measurements[measurements.length / 2]) / 2;
	} else {
		return measurements[Math.floor(measurements.length / 2)];
	}
}

function formatDuration(duration: number): string {
	return `${numberFormatter.format(duration)}ms`;
}

/* ========================================================================== */

export async function measure(config: Config, sampleSize: number = 20) {
	const measurements: number[] = [];
	const input = await fetchInputForDay(config.year, config.day);

	for (let index = 0; index < sampleSize; index++) {
		process.stdout.write('.');
		measurements.push((await measureExecution(() => config.solver(input))).duration);
	}

	process.stdout.write('\n');

	measurements.sort((a, b) => a - b);
	console.log(`Fastest time: ${formatDuration(measurements.at(0))}`);
	console.log(`Slowest time: ${formatDuration(measurements.at(-1))}`);

	console.log(`Mean time to find the solution: ${formatDuration(calculateAverage(measurements))}`);
	// Remove the slowest and fastest execution times
	const trimmedMeasurements = measurements.slice(1, 19);
	console.log(`10% Trimmed mean time to find the solution: ${formatDuration(calculateAverage(trimmedMeasurements))}`);
	console.log(`Median time to find the solution: ${formatDuration(calculateMedian(measurements))}`);
}
