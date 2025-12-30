export type Input = {
	maxValue: number;
	players: number
};

/* ========================================================================== */

const regexNumber = /(\d+).*?(\d+)/;

export function parseInput(input: string): Input {
	const [, players, maxValue] = input.match(regexNumber);

	return {
		maxValue: Number(maxValue),
		players: Number(players)
	};
}
