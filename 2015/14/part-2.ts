import { parseInput } from './helpers/parse-input.js';
import { calculateDistance } from './helpers/calculate-distance.js';

/* ========================================================================== */

const numberOfIterations = 2503;

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const reindeer = parseInput(input);
	// Initialize the object with the name of all the deer and setting their
	// score to 0.
	const scores: Record<string, number> = reindeer.reduce(
		(result, deer) => ({ ...result, [deer.name]: 0 }),
		{}
	);

	for (let index = 1; index <= numberOfIterations; index++) {
		// Calculate per deer its distance at the current iteration.
		const distances = reindeer.map(deer => ({
			name: deer.name,
			distance: calculateDistance(deer, index)
		}));

		// Find the deer which have traveled the furthest distance at the
		// current iteration.
		const iterationWinners = distances.reduce((max, deer) => {
			// When deer has covered the same distance as the current deer with
			// the first distance, add its name to the array.
			if (deer.distance === max.distance) {
				max.deer.push(deer.name);
			} else if (deer.distance > max.distance) {
				// The current deer has traveled further than the deer which was
				// the furthest till now. Remember the distance of the current
				// deer and its name.
				max = { deer: [deer.name], distance: deer.distance };
			}

			return max;
		}, { deer: [], distance: 0 });

		// Iterate over the deer which covered the most distance at the current
		// iteration and award each of them with a point.
		iterationWinners.deer.forEach(deer => scores[deer]++);
	}

	return Math.max(...Object.values(scores));
}

/* ========================================================================== */

export default {
	prompt: 'Number of points of the winning reindeer',
	solver
} satisfies Solution;
