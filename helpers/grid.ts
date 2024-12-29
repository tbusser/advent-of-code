export type Coordinate = { x: number; y: number };
export type Position = number | Coordinate;

export type Direction = 'up' | 'up-left' | 'up-right' | 'left' | 'down' | 'down-left' | 'down-right' | 'right';

export type Neighbor<T = string> = Coordinate & {
	direction: Direction;
	index: number;
	value: T;
};

/* ========================================================================== */

const directionsList: Direction[] = ['up', 'up-right', 'right', 'down-right', 'down', 'down-left', 'left', 'up-left'];

export class Grid<T = string> {
	constructor(protected grid: T[], protected readonly columns: number) {
		// Intentionally left blank.
	}

	/* ---------------------------------------------------------------------- */

	/**
	 * Returns the number of columns in the grid.
	 */
	public get columnCount(): number {
		return this.columns;
	}

	/**
	 * Returns the number of rows in the grid.
	 */
	public get rowCount(): number {
		return this.grid.length / this.columns;
	}

	/* ---------------------------------------------------------------------- */

	/**
	 * Returns the grid as an array of rows. Each row contains a number of items
	 * equal to the column count of the grid.
	 */
	protected getRows(): T[][] {
		const rows: T[][] = [];

		for (let i = 0; i < this.grid.length; i += this.columns) {
			rows.push(this.grid.slice(i, i + this.columns));
		}

		return rows;
	}

	/**
	 * Takes a number or a coordinate and always returns a coordinate.
	 */
	protected positionToCoordinate(position: Position): Coordinate {
		return typeof position === 'number'
			? this.indexToCoordinate(position)
			: position;
	}

	/**
	 * Takes a number or a coordinate and always returns an index.
	 */
	protected positionToIndex(position: Position): number {
		return typeof position === 'number'
			? position
			: this.coordinateToIndex(position);
	}

	/* ---------------------------------------------------------------------- */

	/**
	 * Converts a coordinate to an index in the grid.
	 */
	public coordinateToIndex(coordinate: Coordinate): number {
		return coordinate.y * this.columns + coordinate.x;
	}

	/**
	 * Converts an index to a X,Y coordinate. The index 0 corresponds to the
	 * coordinate { x: 0, y: 0 }.
	 */
	public indexToCoordinate(index: number): Coordinate {
		const row = Math.floor(index / this.columns);
		const column = index % this.columns;

		return {
			x: column,
			y: row
		};
	}

	public logGrid(compact: boolean = true) {
		if (compact) {
			console.log(this.getRows().reduce((grid, row) => grid + row.join('') + '\n', ''));

			return;
		}
		const rows = this.getRows();
		console.table(rows);
	}

	/**
	 * Returns an array with the neighbors for the provided index / coordinate.
	 *
	 * @param position The index, or coordinate, for which to return
	 *        its neighbors.
	 * @param directions An optional array of directions for which to return the
	 *        potential neighbors. When it is not provided, it will default to
	 *        all the directions.
	 *
	 * @returns An array with the neighbors for the provided position. When a
	 *          direction doesn't have a neighbor, the direction will be omitted
	 *          from the result.
	 */
	public neighbors(position: Position, directions?: Direction[]): Neighbor<T>[] {
		const center: Coordinate = this.positionToCoordinate(position);
		// This is the array we will be returning with the neighbors.
		const neighbors: Neighbor<T>[] = [];
		// When no direction(s) have been provided, use the default list of
		// positions for the grid.
		const neighborDirections = directions ?? directionsList;

		// Iterate over the requested positions and if there is a neighbor in
		// that direction, add it to the result.
		for (const direction of neighborDirections) {
			const neighborCoordinate: Coordinate = { x: -1, y: -1 };

			if ((direction === 'up-left' || direction === 'up' || direction === 'up-right') &&
				center.y > 0
			) {
				neighborCoordinate.y = center.y - 1;
				if (direction === 'up') neighborCoordinate.x = center.x;
			}

			if (
				(direction === 'up-right' || direction === 'right' || direction === 'down-right') &&
				center.x < this.columnCount - 1
			) {
				neighborCoordinate.x = center.x + 1;
				if (direction === 'right') neighborCoordinate.y = center.y;
			}

			if (
				(direction === 'down-right' || direction === 'down' || direction === 'down-left') &&
				center.y < this.rowCount - 1
			) {
				neighborCoordinate.y = center.y + 1;
				if (direction === 'down') neighborCoordinate.x = center.x;
			}

			if ((direction === 'down-left' || direction === 'left' || direction === 'up-left') &&
				center.x > 0
			) {
				neighborCoordinate.x = center.x - 1;
				if (direction === 'left') neighborCoordinate.y = center.y;
			}

			if (neighborCoordinate.x !== -1 && neighborCoordinate.y !== -1) {
				neighbors.push({
					...neighborCoordinate,
					direction,
					index: this.coordinateToIndex(neighborCoordinate),
					value: this.grid[this.coordinateToIndex(neighborCoordinate)]
				});
			}
		}

		return neighbors;
	}
}
