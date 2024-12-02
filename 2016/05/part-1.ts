import { generateHash } from './helpers/generate-hash.js';

/* ========================================================================== */

const doorId = 'ffykfhsq';

/* ========================================================================== */

async function solver(): Promise<string> {
	const password: string[] = [];

	for (const hash of generateHash(doorId)) {
		password.push(hash.charAt(5));

		if (password.length === 8) return password.join('');
	}
}

/* ========================================================================== */

export default {
	prompt: 'The password is',
	solver
} satisfies Solution<string>;
