type Equipment = {
	/**
	 * The combined armor score of all the equipped items.
	 */
	armor: number;

	/**
	 * The combined costs of all the equipped items.
	 */
	cost: number;

	/**
	 * The combined damage of all the equipped items.
	 */
	damage: number;
};

type Item = {
	armor: number;
	cost: number;
	damage: number;
	name: string;
};

/* ========================================================================== */

export const armors: Item[] = [
	{ name: 'None', cost: 0, damage: 0, armor: 0 },
	{ name: 'Bandedmail', cost: 75, damage: 0, armor: 4 },
	{ name: 'Chainmail', cost: 31, damage: 0, armor: 2 },
	{ name: 'Leather', cost: 13, damage: 0, armor: 1 },
	{ name: 'Splintmail', cost: 53, damage: 0, armor: 3 },
	{ name: 'Platemail', cost: 102, damage: 0, armor: 5 }
];

export const rings: Item[] = [
	{ name: 'None', cost: 0, damage: 0, armor: 0 },
	{ name: 'Damage +1', cost: 25, damage: 1, armor: 0 },
	{ name: 'Damage +2', cost: 50, damage: 2, armor: 0 },
	{ name: 'Damage +3', cost: 100, damage: 3, armor: 0 },
	{ name: 'Defense +1', cost: 20, damage: 0, armor: 1 },
	{ name: 'Defense +2', cost: 40, damage: 0, armor: 2 },
	{ name: 'Defense +3', cost: 80, damage: 0, armor: 3 }
];

export const weapons: Item[] = [
	{ name: 'Dagger', cost: 8, damage: 4, armor: 0 },
	{ name: 'Greataxe', cost: 74, damage: 8, armor: 0 },
	{ name: 'Longsword', cost: 40, damage: 7, armor: 0 },
	{ name: 'Shortsword', cost: 10, damage: 5, armor: 0 },
	{ name: 'Warhammer', cost: 25, damage: 6, armor: 0 }
];

/* ========================================================================== */

export function* equipRings(): Generator<Item[]> {
	for (const [index, ring] of rings.entries()) {
		// Fighting with one ring is allowed, return this first.
		yield [ring];

		// The second ring can't be the same as the first ring, so we start at
		// the index after the current ring.
		for (let secondRingIndex = index + 1; secondRingIndex < rings.length; secondRingIndex++) {
			yield [ring, rings[secondRingIndex]];
		}
	}
}

export function* getPlayerEquipment(): Generator<Equipment> {
	// Iterate over all the weapons. The player must always have one
	// weapon equipped.
	for (const weapon of weapons) {
		// For the current weapon, combine it with each of the pieces of armor.
		for (const armor of armors) {
			for (const rings of equipRings()) {
				yield {
					damage: weapon.damage + rings.reduce((total, ring) => total + ring.damage, 0),
					armor: rings.reduce((total, ring) => total + ring.armor, 0) + armor.armor,
					cost: weapon.cost + armor.cost + rings.reduce((total, ring) => total + ring.cost, 0)
				};
			}
		}
	}
}
