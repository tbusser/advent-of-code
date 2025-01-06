import { generateSecret } from './helpers/generate-secret.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const secrets = parseInput(input);

	return secrets.reduce((total, secret) => {
		for (let index = 0; index < 2000; index++) {
			secret = generateSecret(secret);
		}

		return total + secret;
	}, 0);
}

/* ========================================================================== */

export default {
	prompt: 'The sum of the 2000th secret number of all buyers is',
	solver
} satisfies Solution;
