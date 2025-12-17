import { chunk } from './array.js';
import { digitsInNumber } from './math.js';

/* ========================================================================== */

type ValueFormatter<T> = (value: T) => string;
type ForEachNeighborCallback<T> = (value: T, index: number, direction: Direction) => void;

export type Coordinate = { x: number; y: number; };
export type Direction = 'down' | 'down-left' | 'down-right' | 'left' | 'right' | 'up' | 'up-left' | 'up-right';
export type Position = number | Coordinate;

/* ========================================================================== */

export const cardinalDirections: readonly Direction[] = [
	'up', 'right', 'down', 'left'
];
export const compassDirections: readonly Direction[] = [
	'up', 'up-right', 'right', 'down-right', 'down', 'down-left', 'left', 'up-left'
];
export const directionOffsets: Record<Direction, readonly [x: number, y: number]> = {
	'down': [0, 1],
	'down-left': [-1, 1],
	'down-right': [1, 1],
	'left': [-1, 0],
	'right': [1, 0],
	'up': [0, -1],
	'up-left': [-1, -1],
	'up-right': [1, -1]
};

/* ========================================================================== */

/**
 * A base class for grids encountered in Advent of Code challenges.
 *
 * Assumptions:
 * - The grid must have fully formed rows (grid.length % columns === 0).
 * - Y=0 at top row, increases as you go down towards the bottom row.
 */
export class BaseGrid<T = string> {
	// Mutable to support shadow grids / buffer swapping in subclasses
	protected grid: T[];

	public readonly rows: number;

	/* -- CONSTRUCTOR ------------------------------------------------------- */

	constructor(grid: T[], public readonly columns: number) {
		if (columns <= 0) {
			throw new Error('Unable to create grid, columns must be greater than 0.');
		}
		if (grid.length % columns !== 0) {
			throw new Error('Unable to create grid, the number of cells must be divisible by the number of columns.');
		}

		this.grid = grid;
		this.rows = (grid.length / columns) | 0;
	}

	/* -- PUBLIC API: Data Access and Mutations ----------------------------- */

	/**
	 * Returns the value at the specified position. There is no out of bounds
	 * check, invalid positions will simply return undefined.
	 *
	 * @param position - The position to return.
	 * @returns The value at the specified position. When the result is
	 *          undefined either that's the value or the position is out
	 *          of bounds.
	 */
	public valueAt(position: Position): T | undefined {
		const index = this.positionToIndex(position);

		return this.grid[index];
	}

	/* -- PUBLIC API: Neighbor finding and traversal ------------------------ */

	public forEachNeighbor(
		index: number,
		callback: ForEachNeighborCallback<T>,
		directions: readonly Direction[] = cardinalDirections
	): void {
		// Convert index to (x, y). Because this method is likely used on the
		// hot path the conversion is intentionally inline.
		const x: number = index % this.columns;
		const y: number = (index / this.columns) | 0;

		for (let directionIndex = 0; directionIndex < directions.length; directionIndex++) {
			const [xOffset, yOffset] = directionOffsets[directions[directionIndex]];

			const newX: number = x + xOffset;
			if (newX < 0 || newX >= this.columns) continue;

			const newY: number = y + yOffset;
			if (newY < 0 || newY >= this.rows) continue;

			const neighborIndex = newX + (newY * this.columns);
			callback(this.grid[neighborIndex], neighborIndex, directions[directionIndex]);
		}
	}

	public neighbor(index: number, direction: Direction): T | undefined {
		// Convert index to (x, y). Because this method is likely used on the
		// hot path the conversion is intentionally inline.
		const x: number = index % this.columns;
		const y: number = (index / this.columns) | 0;

		const [xOffset, yOffset] = directionOffsets[direction];

		const newX: number = x + xOffset;
		if (newX < 0 || newX >= this.columns) return undefined;

		const newY: number = y + yOffset;
		if (newY < 0 || newY >= this.rows) return undefined;

		return this.grid[newX + (newY * this.columns)];
	}

	/* -- PUBLIC API: Utilities --------------------------------------------- */

	public logGrid(formatter: ValueFormatter<T> = (value) => String(value)): void {
		// Check how many digits there are in the last index.
		const indexLength: number = digitsInNumber(this.grid.length - 1);

		// Create an array as long as the number of columns.
		const topIndex = new Array(this.columns).fill(-1);
		// Fill the top index row. For each multiple of 10 print a letter
		// starting with a capital A and going to next letter for each multiple.
		topIndex.forEach((_, index) => {
			if (index % 10 === 0) {
				topIndex[index] = index === 0
					? 0
					: String.fromCharCode(64 + (((index / 10) | 0) % 26));
			} else {
				topIndex[index] = index % 10;
			}
		});
		// Before logging the top index, reserve space at the start equal to the
		// space needed to print the largest index to ensure it lines out.
		console.log(`${''.padStart(indexLength + 1)}${topIndex.join('')}`);

		// Create rows and for each row print its starting index and the cells
		// on that row.
		const rows = chunk(this.grid, this.columns)
			.map((row, index) => `${(index * this.columns).toString().padStart(indexLength, '0')} ${row.map(formatter).join('')}`);
		// Log the rows.
		console.log(rows.join('\n'));
		console.log('\n');
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
}
