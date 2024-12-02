import { generateHash } from './helpers/generate-hash.js';

/* ========================================================================== */

const doorId = 'ffykfhsq';

/* ========================================================================== */

async function solver(): Promise<string> {
	const password: string[] = Array(8);
	let positionsFilled: number = 0;

	for (const hash of generateHash(doorId)) {
		const position = Number(hash.charAt(5));

		if (isNaN(position)) continue;
		if (position > 7) continue;
		if (password[position] !== undefined) continue;

		password[position] = hash.charAt(6);
		positionsFilled++;

		if (positionsFilled === 8) return password.join('');
	}
}

/* ========================================================================== */

export default {
	prompt: 'The password is',
	solver
} satisfies Solution<string>;
