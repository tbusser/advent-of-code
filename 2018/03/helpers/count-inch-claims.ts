import { Claim } from './parse-input.js';

/* ========================================================================== */

export function countInchClaims(claims: Claim[], cellCount: number): Uint16Array {
	const cells: Uint16Array = new Uint16Array(cellCount);

	for (const claim of claims) {
		for (const row of claim) {
			for (let index = row[0]; index <= row[1]; index++) cells[index]++;
		}
	}

	return cells;
}
