import { Direction, BaseGrid } from '@helpers/BaseGrid.js';

/* ========================================================================== */

const directions: Direction[] = ['up', 'up-right', 'right', 'down-right', 'down', 'down-left', 'left', 'up-left'];

/* ========================================================================== */

export class LightGrid extends BaseGrid<boolean> {
	constructor(grid: boolean[], columns: number, readonly lockCorners: boolean) {
		super(grid, columns);

		// Precalculate the corner positions since they're static once the grid
		// is created.
		this.indexTopRight = this.columns - 1;
		this.indexBottomLeft = (this.rows - 1) * this.columns;
		this.indexBottomRight = (this.rows * this.columns) - 1;

		if (lockCorners) {
			this.grid[this.indexBottomLeft] = true;
			this.grid[this.indexBottomRight] = true;
			this.grid[this.indexTopLeft] = true;
			this.grid[this.indexTopRight] = true;
		}
	}

	/* ---------------------------------------------------------------------- */

	public readonly indexTopLeft: number = 0;
	public readonly indexTopRight: number;
	public readonly indexBottomLeft: number;
	public readonly indexBottomRight: number;

	public get numberOfLitLights(): number {
		return this.grid.filter(value => value).length;
	}

	/* ---------------------------------------------------------------------- */

	static createLightGrid(input: string, lockCorners: boolean): LightGrid {
		const lines: string[] = input.split('\n');
		const columns = lines[0].length;
		// Convert the characters to a boolean, this will speed up the
		// comparisons per step as a boolean comparison is much faster than
		// comparing strings every time.
		const grid = lines.flatMap(line => line.split('').map(item => item === '#'));

		return new LightGrid(grid, columns, lockCorners);
	}

	/* ---------------------------------------------------------------------- */

	private isCornerPosition(index: number): boolean {
		return (
			index === this.indexBottomLeft ||
			index === this.indexBottomRight ||
			index === this.indexTopLeft ||
			index === this.indexTopRight
		);
	}

	/* ---------------------------------------------------------------------- */

	public step() {
		const nextGrid = new Array(this.grid.length).fill(false);

		for (let index: number = 0; index < this.grid.length; index++) {
			// this.grid.forEach((state, index) => {
			// Check if the corners should be skipped, if so we can continue if
			// the current index is for one of the four corners.
			if (this.lockCorners && this.isCornerPosition(index)) {
				nextGrid[index] = true;

				continue;
			}

			let switchedOnNeighbors: number = 0;
			this.forEachNeighbor(index, (_, __, value) => {
				if (value) switchedOnNeighbors++;
			}, directions);

			nextGrid[index] = this.grid[index]
				? (switchedOnNeighbors === 2 || switchedOnNeighbors === 3)
				: (switchedOnNeighbors === 3);
		}

		this.grid = nextGrid;
	}
}
