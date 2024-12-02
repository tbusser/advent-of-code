import { createHash } from 'crypto';

/* ========================================================================== */

const validHashRegex = /^0{5}/;

/* ========================================================================== */

export function* generateHash(doorId: string): Generator<string> {
	let index = 0;

	while (true) {
		const hash = createHash('md5').update(`${doorId}${index}`).digest('hex');
		if (validHashRegex.test(hash)) {
			yield hash;
		}

		index++;
	}
}
