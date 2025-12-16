type Coordinate = { x: number; y: number; };
type Direction = 'down' | 'down-left' | 'down-right' | 'left' | 'right' | 'up' | 'up-left' | 'up-right';
type Neighbor<T> = {
	direction: Direction;
	index: number;
	value: T
};
type Position = number | Coordinate;

const defaultDirections: Direction[] = ['up', 'right', 'down', 'left'];
const directionOffsets: Record<Direction, [x: number, y: number]> = {
	'down': [0, 1],
	'down-left': [-1, 1],
	'down-right': [1, 1],
	'left': [-1, 0],
	'right': [1, 0],
	'up': [0, -1],
	'up-left': [-1, -1],
	'up-right': [1, -1]
} as const;

/* ========================================================================== */

export class BaseGrid<T = string> {
	constructor(protected grid: T[], protected readonly columns: number) {
		this.rows = (grid.length / columns) | 0;
	}

	/* ---------------------------------------------------------------------- */

	public readonly rows: number;

	/* ---------------------------------------------------------------------- */

	protected isInBounds(x: number, y: number): boolean {
		if (x < 0) return false;
		if (x >= this.columns) return false;
		if (y < 0) return false;
		if (y >= this.rows) return false;

		return true;
	}

	/* ---------------------------------------------------------------------- */

	public neighbors(position: Position, directions: Direction[] = defaultDirections): Neighbor<T>[] {
		const { x, y } = this.positionToCoordinate(position);
		const neighbors: Neighbor<T>[] = [];

		for (const direction of directions) {
			const [xOffset, yOffset] = directionOffsets[direction];
			if (this.isInBounds(x + xOffset, y + yOffset)) {
				const neighborIndex = x + xOffset + ((y + yOffset) * this.columns);

				neighbors.push({
					direction,
					index: neighborIndex,
					value: this.grid[neighborIndex]
				});
			}
		}

		return neighbors;
	}

	public positionToCoordinate(position: Position): Coordinate {
		return typeof position === 'number'
			? { x: position % this.columns, y: (position / this.columns) | 0 }
			: position;
	}

	public positionToIndex(position: Position): number {
		return typeof position === 'number'
			? position
			: position.x + (position.y * this.columns);
	}

	public row(index: number): T[] | undefined {
		if (index < 0) return;
		if (index >= this.rows) return;

		return this.grid.slice(index * this.columns, (index * this.columns) + this.columns);
	}

	public valueAt(position: Position): T | undefined {
		const index = this.positionToIndex(position);

		return this.grid[index];
	}
}
