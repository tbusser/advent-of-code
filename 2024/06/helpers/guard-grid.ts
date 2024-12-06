import { Grid as BaseGrid, Direction } from '@helpers/grid.js';

/* ========================================================================== */

type Guard = {
	position: number;
	directions: Direction[];
};

/* ========================================================================== */

const blockedPosition = '#';
const emptyPosition = '.';
const startPosition = '^';
const endPosition = 'E';

/* ========================================================================== */

function getNextDirection([direction]: Direction[]): Direction[] {
	switch (direction) {
		case 'up':
			return ['right'];

		case 'right':
			return ['down'];

		case 'down':
			return ['left'];

		case 'left':
			return ['up'];
	}
}

/* ========================================================================== */

export class Grid extends BaseGrid {
	constructor(grid: string[], columns: number) {
		super(grid, columns);
		this.startPosition = this.grid.findIndex(cell => cell === startPosition);
	}

	/* ---------------------------------------------------------------------- */

	public readonly startPosition: number;

	/* ---------------------------------------------------------------------- */

	static createInstance(input: string[]) {
		const columns = input[0].length;
		const grid = input.join('').split('');

		return new Grid(grid, columns);
	}

	/* ---------------------------------------------------------------------- */

	private addObstacle(position: number) {
		this.grid[position] = blockedPosition;
	}

	private removeObstacle(position: number) {
		this.grid[position] = emptyPosition;
	}

	/* ---------------------------------------------------------------------- */

	public findVisitedPositions(): Set<number> {
		const guard: Guard = {
			position: this.startPosition,
			directions: ['up']
		};
		const visitedPositions = new Set<number>([guard.position]);

		while (true) {
			// The neighbors will always be returned in the same order as they
			// appear in the filter.
			const nextPosition = this.neighbors(guard.position, guard.directions)[0];

			if (nextPosition.value === endPosition) {
				return visitedPositions;
			}

			if (nextPosition.value !== blockedPosition) {
				guard.position = nextPosition.index;
				visitedPositions.add(guard.position);
			} else {
				guard.directions = getNextDirection(guard.directions);
			}
		}
	}

	/**
	 * To detect if the guard is in a loop we need to not only keep track of the
	 * positions visited by the guard but also from which direction the guard
	 * entered the position. A loop is detected as soon as the guard enters a
	 * position for a second time from the same direction.
	 *
	 * @param blockPosition The index to temporarily block to see if it will
	 *        cause a loop.
	 */
	public detectLoop(blockPosition: number): boolean {
		const guard: Guard = {
			position: this.startPosition,
			directions: ['up']
		};
		const visitedPositions = new Set<string>([`${guard.position}up`]);

		this.addObstacle(blockPosition);

		while (true) {
			const nextPosition = this.neighbors(guard.position, guard.directions)[0];

			if (nextPosition.value === endPosition) {
				this.removeObstacle(blockPosition);

				return false;
			}

			if (nextPosition.value !== blockedPosition) {
				guard.position = nextPosition.index;
				const positionId = `${guard.position}${guard.directions[0]}`;
				if (visitedPositions.has(positionId)) {
					this.removeObstacle(blockPosition);

					return true;
				}
				visitedPositions.add(positionId);
			} else {
				guard.directions = getNextDirection(guard.directions);
			}
		}
	}
}
