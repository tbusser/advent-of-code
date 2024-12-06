import { Grid as BaseGrid, Direction } from '@helpers/grid.js';

/* ========================================================================== */

type Guard = {
	position: number;
	directions: Direction[];
};

/* ========================================================================== */

const blockedPosition = '#';
const startPosition = '^';
const endPosition = 'E';

/* ========================================================================== */

function getNextDirection(direction: Direction): Direction {
	switch (direction) {
		case 'up':
			return 'right';

		case 'right':
			return 'down';

		case 'down':
			return 'left';

		case 'left':
			return 'up';
	}
}

function getNextDirections(directions: Direction[]): Direction[] {
	return [
		getNextDirection(directions[0]),
		getNextDirection(directions[1])
	];
}

/* ========================================================================== */

export class Grid extends BaseGrid {
	constructor(grid: string[], columns: number) {
		super(grid, columns);
	}

	/* ---------------------------------------------------------------------- */

	static createInstance(input: string[]) {
		const columns = input[0].length;
		const grid = input.join('').split('');

		return new Grid(grid, columns);
	}

	/* ---------------------------------------------------------------------- */

	public countVisitedPositions(): number {
		const guard: Guard = {
			position: this.grid.findIndex(cell => cell === startPosition),
			directions: ['up', 'right']
		};
		const visitedPositions = new Set<number>([guard.position]);

		while (true) {
			// The neighbors will always be returned in the same order as they
			// appear in the filter.
			const nextPositions = this.neighbors(guard.position, guard.directions);

			if (nextPositions[0].value === endPosition) {
				return visitedPositions.size;
			}

			if (nextPositions[0].value !== blockedPosition) {
				guard.position = nextPositions[0].index;
				visitedPositions.add(guard.position);
			} else {
				guard.directions = getNextDirections(guard.directions);
			}
		}
	}
}
