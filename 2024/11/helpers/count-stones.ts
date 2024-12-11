type StoneCache = Map<string, number>;

/* ========================================================================== */

function blink(stone: number): number[] {
	if (stone === 0) return [1];

	const stoneAsString = stone.toString();
	if (stoneAsString.length % 2 === 1) return [(stone * 2024)];

	return [
		Number(stoneAsString.substring(0, stoneAsString.length / 2)),
		Number(stoneAsString.substring(stoneAsString.length / 2))
	];
}

function processStones(stones: number[], index: number, numberOfBlinks: number, cache: StoneCache): number {
	let count = 0;

	if (index === numberOfBlinks) return stones.length;

	for (const stone of stones) {
		if (cache.has(`${stone}|${index}`)) {
			count += cache.get(`${stone}|${index}`);
			continue;
		}

		const newStones = blink(stone);
		const numberOfStones = processStones(newStones, index + 1, numberOfBlinks, cache);
		cache.set(`${stone}|${index}`, numberOfStones);
		count += numberOfStones;
	}

	return count;
}


/* ========================================================================== */

export function countStonesAfterBlinking(stones: number[], numberOfBlinks: number): number {
	let count: number = 0;
	const cache: StoneCache = new Map();

	for (let stone = 0; stone < stones.length; stone++) {
		count += processStones([stones[stone]], 0, numberOfBlinks, cache);
	}

	return count;
}
