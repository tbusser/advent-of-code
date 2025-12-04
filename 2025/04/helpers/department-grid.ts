import { Grid as BaseGrid, Neighbor } from '@helpers/grid.js';

/* ========================================================================== */

const gridType = {
	empty: '.',
	paperRoll: '@'
} as const;

/* ========================================================================== */

export class DepartmentGrid extends BaseGrid {
	constructor(grid: string[], columns: number) {
		super(grid, columns);
	}

	/* ---------------------------------------------------------------------- */

	static createInstance(input: string): DepartmentGrid {
		const lines: string[] = input.split('\n');
		const columns: number = lines[0].length;
		const grid: string[] = lines.join('').split('');

		return new DepartmentGrid(grid, columns);
	}

	/* ---------------------------------------------------------------------- */

	public countAccessibleRolls(): number {
		let count: number = 0;

		// Loop over all the positions in the grid.
		for (let index: number = 0; index < this.grid.length; index++) {
			// When the current position is a empty, skip the position.
			if (this.grid[index] === gridType.empty) continue;
			// Get all the neighbors of the current position and remove the
			// neighbors which don't contain a paper roll.
			const paperNeighbors: Neighbor[] = this.neighbors(index)
				.filter(neighbor => neighbor.value === gridType.paperRoll);
			// When the number of adjacent paper rolls is less than four, the
			// current roll is accessible.
			if (paperNeighbors.length < 4) count++;
		}

		return count;
	}

	public countMovableRolls(): number {
		let totalMovedRolls: number = 0;
		let movedRolls: number = 0;

		// Keep iterating while we moved rolls during the last iteration.
		do {
			// Set the count of movable rolls for this iteration to 0.
			movedRolls = 0;

			// Iterate over all the positions.
			for (let index: number = 0; index < this.grid.length; index++) {
				// When the current position is empty, skip it.
				if (this.grid[index] === gridType.empty) continue;
				// Get all the neighbors of the current position and remove the
				// neighbors which don't contain a paper roll.
				const paperNeighbors: Neighbor[] = this.neighbors(index)
					.filter(neighbor => neighbor.value === gridType.paperRoll);
				// When the position has 4 or more adjacent paper rolls it can't
				// be moved.
				if (paperNeighbors.length >= 4) continue;

				// The roll in the current position can be moved, empty
				// the position.
				this.grid[index] = gridType.empty;
				// Increase the count of moved paper rolls.
				movedRolls++;
			}

			totalMovedRolls += movedRolls;
		} while (movedRolls !== 0);

		return totalMovedRolls;
	}
}
