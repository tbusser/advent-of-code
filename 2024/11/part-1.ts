function blink(stones: number[]) {
	const newLine: number[] = [];

	for (const stone of stones) {
		if (stone === 0) {
			newLine.push(1);
			continue;
		}

		if (stone.toString().length % 2 === 0) {
			newLine.push(Number(stone.toString().substring(0, stone.toString().length / 2)));
			newLine.push(Number(stone.toString().substring(stone.toString().length / 2)));
			continue;
		}

		newLine.push(stone * 2024);
	}

	return newLine;
}

/* -------------------------------------------------------------------------- */

function solver(input: string): number {
	let line = input.split(' ').map(Number);

	for (let index = 0; index < 25; index++) {
		line = blink(line);
	}

	return line.length;
}

/* ========================================================================== */

export default {
	prompt: 'Number of stones after blinking 25 times',
	solver
} satisfies Solution;
