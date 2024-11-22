import { Coordinate, Grid } from '@helpers/grid.js';

/* ========================================================================== */

export const onValue = '#';
export const offValue = '.';

type LightState = typeof onValue | typeof offValue;

type PatchInstruction = {
	position: Coordinate | number;
	value: LightState;
};

/* ========================================================================== */

export class LightGrid extends Grid<LightState> {
	constructor(grid: LightState[], columns: number) {
		super(grid, columns);
	}

	public get numberOfLitLights(): number {
		return this.grid.filter(value => value === onValue).length;
	}

	/* ---------------------------------------------------------------------- */

	static createLightGrid(input: string): LightGrid {
		const lines = input.split('\n');
		const columns = lines[0].length;
		const grid = lines.join('').split('');

		return new LightGrid(grid as LightState[], columns);
	}

	/* ---------------------------------------------------------------------- */

	private isCornerPosition(position: number | Coordinate): boolean {
		const coordinate = typeof position === 'number'
			? this.indexToCoordinate(position)
			: position;

		if (coordinate.x === 0 && (coordinate.y === 0 || coordinate.y === this.columnCount - 1)) {
			return true;
		}

		if (coordinate.x === this.columnCount - 1 && (coordinate.y === 0 || coordinate.y === this.columnCount - 1)) {
			return true;
		}
	}

	/* ---------------------------------------------------------------------- */

	public patch(updates: PatchInstruction[]) {
		updates.forEach(update => {
			const index = this.positionToIndex(update.position);

			this.grid[index] = update.value;
		});
	}

	public step(skipCorners = false) {
		const updates: PatchInstruction[] = [];

		this.grid.forEach((state, index) => {
			// Check if the corners should be skipped, if so we can continue if
			// the current index is for one of the four corners.
			if (skipCorners && this.isCornerPosition(index)) return;

			// Get the neighbors of the cell.
			const neighbors = this.neighbors(index);
			// Count the number of neighbors which are on.
			const switchedOnNeighbors = neighbors.filter(neighbor => neighbor.value === onValue).length;

			if (state === onValue) {
				if (switchedOnNeighbors !== 2 && switchedOnNeighbors !== 3) {
					updates.push({ position: index, value: offValue });
				}
			} else {
				if (switchedOnNeighbors === 3) {
					updates.push({ position: index, value: onValue });
				}
			}
		});

		this.patch(updates);
	}
}
