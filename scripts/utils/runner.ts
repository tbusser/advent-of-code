import { fetchInputForDay } from './fetch-input.js';
import { measure } from './measure.js';

/* ========================================================================== */

type Config = {
	year: number;
	day: number;
	prompt: string;
	solver: Solution['solver']
};

/* ========================================================================== */

export async function solve(config: Config) {
	const input = await fetchInputForDay(config.year, config.day);
	const result = measure(config.solver, input);

	console.log(`${config.prompt}:`, result.answer);
	console.log(`Time taken: ${result.duration}ms`);
}
