import { describe, expect, it } from 'vitest';
import { fight } from './fight.js';
import { initializeGame } from './game-state.js';

describe('2015/22', () => {
	describe('fight', () => {
		it('should return the least amount of mana to spent and still win the fight', () => {
			const gameStat = initializeGame({ damage: 8, hitPoints: 14 }, { hitPoints: 10, manaPool: 250 });
			expect(fight(gameStat)).toBe(641);
		});
	});
});
