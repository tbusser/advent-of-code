import { createHash } from 'crypto';

/* ========================================================================== */

export function findNumber(input: string, zeroCount: number): number {
	const endCondition = '0'.repeat(zeroCount);

	let result: number = -1;
	let hash: string = '';

	while (!hash.startsWith(endCondition)) {
		result++;
		hash = createHash('md5').update(`${input}${result}`).digest('hex');
	}

	return result;
}
