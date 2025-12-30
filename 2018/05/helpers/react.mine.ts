export function react(polymer: number[]): number {
	let index = 0;
	while (index < polymer.length) {
		if (Math.abs(polymer[index] - polymer[index + 1]) === 32) {
			polymer.splice(index--, 2);
		} else {
			index++;
		}
	}

	return polymer.length;
}
