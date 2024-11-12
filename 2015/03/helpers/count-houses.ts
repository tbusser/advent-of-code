type Position = {
	x: number;
	y: number;
};

/* ========================================================================== */

const symbolDown = 'v';
const symbolLeft = '<';
const symbolRight = '>';
const symbolUp = '^';

/* ========================================================================== */

function createKeyForPosition(position: Position): string {
	return `${position.x}|${position.y}`;
}

/* ========================================================================== */

export function countHouses(input: string, runners: number): number {
	const positions: Position[] = Array(runners).fill(undefined).map(() => ({ x: 0, y: 0 }));

	const deliveryRecords = new Set<string>();
	deliveryRecords.add(createKeyForPosition(positions[0]));

	for (let index = 0; index < input.length; index++) {
		const move = input.charAt(index);
		const position = positions[index % runners];

		switch (move) {
			case symbolDown:
				position.y--;
				break;

			case symbolLeft:
				position.x--;
				break;

			case symbolRight:
				position.x++;
				break;

			case symbolUp:
				position.y++;
				break;
		}

		deliveryRecords.add(createKeyForPosition(position));
	}

	return deliveryRecords.size;
}
