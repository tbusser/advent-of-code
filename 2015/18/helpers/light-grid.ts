import { Direction, BaseGrid } from '@helpers/BaseGrid.js';

/* ========================================================================== */

const directions: Direction[] = ['up', 'up-right', 'right', 'down-right', 'down', 'down-left', 'left', 'up-left'];

type PatchInstruction = {
	index: number;
	value: boolean;
};

/* ========================================================================== */

export class LightGrid extends BaseGrid<boolean> {
	constructor(grid: boolean[], columns: number, readonly lockCorners: boolean) {
		super(grid, columns);

		// Precalculate the corner positions since they're static once the grid
		// is created.
		this.indexTopRight = this.columns - 1;
		this.indexBottomLeft = (this.rows - 1) * this.columns;
		this.indexBottomRight = (this.rows * this.columns) - 1;
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

	public patch(updates: PatchInstruction[]) {
		for (const update of updates) {
			this.grid[update.index] = update.value;
		};
	}

	public step() {
		const updates: PatchInstruction[] = [];

		this.grid.forEach((state, index) => {
			// Check if the corners should be skipped, if so we can continue if
			// the current index is for one of the four corners.
			if (this.lockCorners && this.isCornerPosition(index)) return;

			// Get the neighbors of the cell.
			const neighbors = this.neighbors(index, directions);
			// Count the number of neighbors which are on.
			const switchedOnNeighbors = neighbors.filter(neighbor => neighbor.value).length;

			if (state && (switchedOnNeighbors !== 2 && switchedOnNeighbors !== 3)) {
				updates.push({ index, value: !state });
			} else if (!state && switchedOnNeighbors === 3) {
				updates.push({ index, value: !state });
			}
		});

		this.patch(updates);
	}
}
