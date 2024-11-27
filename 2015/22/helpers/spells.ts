type Spell = {
	armor: number;
	cost: number;
	damage: number;
	heal: number;
	mana: number;
	turns: number;
};

/* ========================================================================== */

export const poison: Omit<Spell, 'armor' | 'heal' | 'mana'> = {
	cost: 173,
	damage: 3,
	turns: 6
};

export const recharge: Omit<Spell, 'armor' | 'damage' | 'heal'> = {
	cost: 229,
	mana: 101,
	turns: 5
};

export const shield: Omit<Spell, 'damage' | 'heal' | 'mana'> = {
	armor: 7,
	cost: 113,
	turns: 6
};

export const magicMissile: Omit<Spell, 'armor' | 'heal' | 'mana'> = {
	cost: 53,
	damage: 4,
	turns: 1
};

export const drain: Omit<Spell, 'armor' | 'mana'> = {
	cost: 73,
	damage: 2,
	heal: 2,
	turns: 1
};
