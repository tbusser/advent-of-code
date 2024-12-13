import { solve } from './utils/runner.js';
import { resolveChallengeParamToPart } from './utils/resolve-challenge-param-to-part.js';

/* ========================================================================== */

const { day, path, year } = resolveChallengeParamToPart(process.argv[2]);

// Import the script for the provided puzzle ID.
const { default: solution } = await import(path) as { default: Solution };

solve({
	day,
	year,
	...solution
});
