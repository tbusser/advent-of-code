import { BossStats, PlayerStats } from './types.js';

/* ========================================================================== */

export type GameState = {
	bossDamage: number;
	bossHitPoints: number;
	manaPool: number;
	manaSpent: number;
	playerArmor: number;
	playerDamage: number;
	playerHitPoints: number;
	poisonTurns: number;
	rechargeTurns: number;
	shieldTurns: number;
};

/* ========================================================================== */

/**
 * Use an object to keep track of the state of the game. The biggest benefit of
 * using an object with just numeric properties is that it is trivial to create
 * a copy of the state by using {...state}. This really helps when making
 * duplicates of the game state before altering it.
 */
export function initializeGame(boss: BossStats, player: PlayerStats): GameState {
	return {
		bossDamage: boss.damage,
		bossHitPoints: boss.hitPoints,
		manaPool: player.manaPool,
		manaSpent: 0,
		playerArmor: 0,
		playerDamage: 0,
		playerHitPoints: player.hitPoints,
		poisonTurns: 0,
		rechargeTurns: 0,
		shieldTurns: 0
	} satisfies GameState;
}
