import { solve } from './utils/runner.js';
import { resolveChallengeParam } from './utils/resolve-challenge-param.js';

/* ========================================================================== */

const { day, path, year } = resolveChallengeParam(process.argv[2]);

// Import the script for the provided puzzle ID.
const { default: solution } = await import(path) as { default: Solution };

solve({
	day,
	year,
	...solution
});
