import { BaseGrid } from '@helpers/BaseGrid.js';

/* ========================================================================== */

const symbol = {
	splitter: '^',
	start: 'S'
};

/* ========================================================================== */

export class ResearchGrid extends BaseGrid {
	constructor(grid: string[], columns: number) {
		super(grid, columns);

		this.startIndex = grid.findIndex(item => item === symbol.start);
	}

	/* ---------------------------------------------------------------------- */

	private readonly startIndex: number;

	/* ---------------------------------------------------------------------- */

	static createInstance(input: string): ResearchGrid {
		const regexControlPoints = /S|\^/;
		const lines: string[] = input.split('\n').reduce((result, line) => {
			// Remove lines which don't contain the start point and don't have
			// any splitters.
			return regexControlPoints.test(line) ? [...result, line] : result;
		}, []);
		const columns: number = lines[0].length;
		const grid: string[] = lines.join('').split('');

		return new ResearchGrid(grid, columns);
	}

	/* ---------------------------------------------------------------------- */

	public countSplits(): number {
		let beams: number[] = [this.startIndex];
		const splitPositions = new Set<number>();

		// Iterate over all the rows in the grid from top to bottom.
		for (let rowIndex: number = 1; rowIndex < this.rows; rowIndex++) {
			const splitBeams = new Set<number>();
			const rowOffset = this.columns * rowIndex;

			for (const beam of beams) {
				// Check if there is a splitter at the beam location in the
				// current row.
				if (this.grid[rowOffset + beam] === symbol.splitter) {
					// Add the position of the splitter to the set.
					splitPositions.add(rowOffset + beam);
					// Add a beam to the left and right of the splitter.
					splitBeams.add(beam - 1);
					splitBeams.add(beam + 1);
				} else {
					// There is no splitter, the beam continues as-is.
					splitBeams.add(beam);
				}
			}

			beams = Array.from(splitBeams);
		}

		return splitPositions.size;
	}

	public countTimelines(): number {
		// Create an array where each item represents a column in the grid.
		// Initialize the number of beams to 0 except for the starting position
		// where the count should be 1.
		let previousRow: number[] = new Array(this.columns).fill(0);
		let currentRow: number[] = new Array(this.columns);
		previousRow[this.startIndex] = 1;

		// Iterate over all the rows in the grid from top to bottom.
		for (let rowIndex: number = 1; rowIndex < this.rows; rowIndex++) {
			// Initialize an array for the current row, defaulting to 0 beams
			// for each column.
			currentRow.fill(0);

			const rowOffset = this.columns * rowIndex;

			for (let columnIndex: number = 0; columnIndex < this.columns; columnIndex++) {
				const previousCount: number = previousRow[columnIndex];

				// When there is no beam in the column, skip processing it.
				if (previousCount === 0) continue;

				// Check if there is a splitter at the beam location in the
				// current row.
				if (this.grid[rowOffset + columnIndex] === symbol.splitter) {
					// Add the number of beams going through the column in the
					// previous row to the left and right columns in the
					// current row.
					currentRow[(columnIndex - 1)] += previousCount;
					currentRow[(columnIndex + 1)] += previousCount;
				} else {
					// Not a splitter, just add the number of beams in the
					// column from the previous row to the count of the
					// current row.
					currentRow[columnIndex] += previousCount;
				}
			}

			// Swap current and previous round.
			[previousRow, currentRow] = [currentRow, previousRow];
		}

		// Calculate the sum of all beams per column, this will give the total
		// number of timelines.
		let sum: number = 0;
		for (let index: number = 0; index < previousRow.length; index++) {
			sum += previousRow[index];
		}

		return sum;
	}
}
