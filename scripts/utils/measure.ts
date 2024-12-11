import { fetchInputForDay } from './fetch-input.js';
import { measure as measureExecution } from './performance.js';

/* ========================================================================== */

type Config = {
	year: number;
	day: number;
	solver: (input: string) => Promise<number | string>;
};

type Stats = {
	mean: number;
	median: number;
	sortedMeasurements: number[];
	trimmedMean: number;
};

/* ========================================================================== */

function calculateMean(measurements: number[]): number {
	return measurements.reduce((total, measurement) => total + measurement, 0) / measurements.length;
}

function calculateMedian(measurements: number[]): number {
	if (measurements.length % 2 === 0) {
		return (measurements[(measurements.length / 2) - 1] + measurements[measurements.length / 2]) / 2;
	} else {
		return measurements[Math.floor(measurements.length / 2)];
	}
}

function calculateTrimmedMean(measurements: number[]): number {
	// Calculate how many items 10% is.
	const itemsToRemove = measurements.length / 10;
	// Remove the slowest and fastest execution times
	const trimmedMeasurements = measurements.slice(itemsToRemove, measurements.length - itemsToRemove);

	return calculateMean(trimmedMeasurements);
}

function calculateStats(measurements: number[]): Stats {
	const sortedMeasurements = measurements.toSorted((a, b) => a - b);

	return {
		mean: calculateMean(sortedMeasurements),
		median: calculateMedian(sortedMeasurements),
		sortedMeasurements,
		trimmedMean: calculateTrimmedMean(sortedMeasurements)
	};
}

/* ========================================================================== */

export async function measure(config: Config, sampleSize: number = 50) {
	const measurements: number[] = [];
	const input = await fetchInputForDay(config.year, config.day);

	for (let index = 0; index < sampleSize; index++) {
		process.stdout.clearLine(0);
		process.stdout.cursorTo(0);
		process.stdout.write(`Measuring sample ${index + 1} of ${sampleSize}`);
		measurements.push((await measureExecution(() => config.solver(input))).duration);
	}

	process.stdout.write('\n');

	return calculateStats(measurements);
}
