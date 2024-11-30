import { describe, expect, it } from 'vitest';
import { followRoute } from './follow-directions.js';

describe('2016/1', () => {
	describe('followRoute', () => {
		it('should follow the set of directions', () => {
			expect(followRoute([{ steps: 2, turn: -1 }])).toEqual({ x: -2, y: 0 });
		});
	});
});
