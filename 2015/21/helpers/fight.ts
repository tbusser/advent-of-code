import { Stats } from './types.js';

/* ========================================================================== */

export function fight(player: Stats, boss: Stats): 'boss' | 'player' {
	// When all the damage is absorbed by the armor, the attack still deals
	// one hit point damage. Use a Math.max to ensure the dealt damage is never
	// less than one.
	const turnsNeededToKillBoss = boss.hitPoints / Math.max(player.damage - boss.armor, 1);
	const turnsNeededToKillPlayer = player.hitPoints / Math.max(boss.damage - player.armor, 1);

	// Because the player attacks first, the player wins when they both require
	// an equal number of turns to kill the other.
	return turnsNeededToKillBoss <= turnsNeededToKillPlayer
		? 'player'
		: 'boss';
};
