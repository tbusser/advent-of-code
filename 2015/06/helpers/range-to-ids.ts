import { Range } from './types.js';

/* ========================================================================== */

export function convertRangeToId(range: Range, size: number = 1000): number[] {
	const ids: number[] = [];

	for (let row = range.start.y; row <= range.end.y; row++) {
		const rowOffset = row * size;

		for (let column = range.start.x; column <= range.end.x; column++) {
			ids.push(rowOffset + column);
		}
	}

	return ids;
}
