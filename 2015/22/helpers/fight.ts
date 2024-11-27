import { GameState } from './game-state.js';
import { drain, magicMissile, poison, recharge, shield } from './spells.js';

/* ========================================================================== */

function applyEffects(state: GameState) {
	if (state.poisonTurns > 0) {
		state.poisonTurns--;
		state.bossHitPoints -= poison.damage;
	}
	if (state.rechargeTurns > 0) {
		state.rechargeTurns--;
		state.manaPool += recharge.mana;
	}
	if (state.shieldTurns > 0) {
		state.shieldTurns--;
		if (state.shieldTurns === 0) state.playerArmor = 0;
	}
}

function updateManaBalance(state: GameState, cost: number): GameState {
	state.manaPool -= cost;
	state.manaSpent += cost;

	return state;
}

/**
 * Checks for each spell if the player can cast it during its turn. When a spell
 * is eligible, a new game state will be created with the spell applied.
 *
 * @param state The current state of the game.
 *
 * @returns An array of game states for when a spell has been cast.
 */
function findBranches(state: GameState): GameState[] {
	const moves: GameState[] = [];

	if (state.manaPool >= magicMissile.cost) {
		moves.push(updateManaBalance({
			...state,
			bossHitPoints: state.bossHitPoints - magicMissile.damage,
		}, magicMissile.cost));
	}

	if (state.manaPool >= drain.cost) {
		moves.push(updateManaBalance({
			...state,
			bossHitPoints: state.bossHitPoints - drain.damage,
			playerHitPoints: state.playerHitPoints + drain.heal
		}, drain.cost));
	}

	if (state.manaPool >= shield.cost && state.shieldTurns === 0) {
		moves.push(updateManaBalance({
			...state,
			playerArmor: shield.armor,
			shieldTurns: shield.turns
		}, shield.cost));
	}

	if (state.manaPool > poison.cost && state.poisonTurns === 0) {
		moves.push(updateManaBalance({
			...state,
			poisonTurns: poison.turns
		}, poison.cost));
	}

	if (state.manaPool >= recharge.cost && state.rechargeTurns === 0) {
		moves.push(updateManaBalance({
			...state,
			rechargeTurns: recharge.turns
		}, recharge.cost));
	}

	return moves;
}

/* ========================================================================== */

export function fight(gameState: GameState, hardMode: boolean = false): number {
	const queue: GameState[] = [gameState];
	let lowestManaWin: number = Infinity;

	// Each iteration will perform both a player's and a boss's turn. By
	// combining both in a single iteration we reduce the number of branches
	// we create with possible game states.
	// 1. Check if hard mode is active. When it is, reduce the player's health
	//    by one and check if the player died. If the player died it means the
	//    end of the branch.
	// 2. Apply the active effects at the start of the player's turn
	// 3. Determine which spells can be cast during the turn and what the game
	//   state will be after the spell has been cast. This will be the initial
	//   state the game is in when the boss takes its turn.
	// 4. Iterate over each of the possible next game states, each the start of
	//    the boss's turn.
	//    a. Check if more mana has been spent than on the cheapest win. If more
	//       is spent the branch can be pruned as it will not yield a lower mana
	//       spent figure.
	//    b. Apply the active effects at the start of the boss's turn.
	//    c. Check if the active effects have killed the boss. If they a check
	//       to see if it was done with less mana than the best solution is
	//       needed. This is the last action needed for this branch.
	//    d. Deal damage to the player, this takes into account the current
	//       armor the player has. When all the damage is absorbed by the armor
	//       the player still receives 1 damage.
	//    e. Check of the damage has killed the player. When the player is
	//       killed it means the end of the branch.
	//    f. When the player lives the boss's turn has ended and the state of
	//       the games becomes the initial state for the next players's turn.
	while (queue.length > 0) {
		const state = queue.pop();

		if (hardMode) { // [1]
			state.playerHitPoints--;
			if (state.playerHitPoints <= 0) continue;
		}

		applyEffects(state); // [2]

		const branches = findBranches(state); // [3]

		for (const branch of branches) { // [4]
			if (branch.manaSpent > lowestManaWin) continue; // [4a]

			applyEffects(branch); // [4b]

			if (branch.bossHitPoints <= 0) { // [4c]
				lowestManaWin = Math.min(lowestManaWin, branch.manaSpent);
				continue;
			}

			branch.playerHitPoints -= Math.max(branch.bossDamage - branch.playerArmor, 1); // [4d]

			if (branch.playerHitPoints <= 0) continue; // [4e]

			queue.push(branch);
		}
	}

	return lowestManaWin;
}
