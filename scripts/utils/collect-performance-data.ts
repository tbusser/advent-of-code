import { spawn } from 'child_process';

/* ========================================================================== */

type Config = {
	year: number;
	day: number;
	path: string;
};

type PerformanceStats = {
	mean: number;
	median: number;
	sortedMeasurements: number[];
	trimmedMean: number;
};

const collectSampleScriptPath: string = './scripts/utils/collect-performance-sample.js';

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

function calculatePerformanceStats(measurements: number[]): PerformanceStats {
	const sortedMeasurements = measurements.toSorted((a, b) => a - b);

	return {
		mean: calculateMean(sortedMeasurements),
		median: calculateMedian(sortedMeasurements),
		sortedMeasurements,
		trimmedMean: calculateTrimmedMean(sortedMeasurements)
	};
}

/* ========================================================================== */

function takeSample(config: Config): Promise<number> {
	return new Promise(resolve => {
		let duration: number;
		// Spawn a new process to take the measurement. This is needed to ensure
		// that for each measurement we start fresh. Just running the solver
		// multiple times may cause module scope variables to be filled from a
		// previous running and affecting the time needed to find a solution.
		const child = spawn('tsx', [
			collectSampleScriptPath,
			config.year.toString(),
			config.day.toString(),
			config.path
		]);

		// Listen for data from the spawned process. The script will write the
		// duration to the stdout so we can pick it up here.
		child.stdout.setEncoding('utf8');
		child.stdout.on('data', data => duration = Number(data));

		// When the child process is finished, resolve the promise with the
		// time it took to find the answer.
		child.on('close', () => resolve(duration));
	});
}

export async function collectPerformanceData(config: Config, sampleSize: number = 50) {
	const measurements: number[] = [];

	for (let index = 0; index < sampleSize; index++) {
		// Out put the progress on the same line so the console doesn't get
		// spammed with log lines.
		process.stdout.clearLine(0);
		process.stdout.cursorTo(0);
		process.stdout.write(`Measuring sample ${index + 1} of ${sampleSize}`);
		const duration = await takeSample(config);
		measurements.push(duration);
	}

	// Make sure the next console.log will start on a new line.
	process.stdout.write('\n');

	return calculatePerformanceStats(measurements);
}
