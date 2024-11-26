import { describe, expect, it } from 'vitest';
import { fight } from './fight.js';

describe('fight', () => {
	it('should determine the winning fighter', () => {
		expect(fight(
			{ armor: 5, damage: 5, hitPoints: 8 },
			{ armor: 2, damage: 7, hitPoints: 12 }
		)).toBe('player');
	});
});
