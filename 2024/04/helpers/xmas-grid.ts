import { Grid as BaseGrid, Direction } from '@helpers/grid.js';

/* ========================================================================== */

type QueueItem = {
	direction?: Direction[];
	index: number;
	letter: string;
};

/* ========================================================================== */

const crossMasSequence = 'MS';

/* ========================================================================== */

export class Grid extends BaseGrid {
	constructor(grid: string[], columns: number) {
		super(grid, columns);
	}

	/* ---------------------------------------------------------------------- */

	static createInstance(input: string) {
		const lines = input.split('\n');
		const columns = lines[0].length;
		const grid = lines.join('').split('');

		return new Grid(grid, columns);
	}

	/* ---------------------------------------------------------------------- */

	/**
	 * Checks how many times the index with the letter X is part of the
	 * sequence XMAS.
	 *
	 * @param index The index to start from, the index contains the letter X.
	 *
	 * @returns The number of XMAS sequences the index is part of.
	 */
	private countXmasFromIndex(index: number): number {
		let count = 0;

		// Start at the provided index, we know this has the letter 'X'. For the
		// initial entry leave the directions undefined as this will give us
		// all surrounding letters before locking in a specific direction.
		const queue: QueueItem[] = [{ letter: 'X', index, direction: undefined }];

		// Keep processing the queue until all possibilities have been checked.
		while (queue.length) {
			const entry = queue.pop();

			// Get the next letter we need to find to make XMAS
			const letter = this.getNextLetter(entry.letter);

			// Get all the neighbors for the cell, when direction is set it will
			// filter the neighbors in the specified direction.
			for (const neighbor of this.neighbors(entry.index, entry.direction)) {
				// When the neighbor is not the letter we need to find, ignore
				// the cell.
				if (neighbor.value !== letter) continue;

				// When the neighbor is the letter "S", a complete sequence has
				// been identified.
				if (letter === 'S') {
					count++;
				} else {
					// We still have a valid sequence but have not yet reached
					// a complete sequence. Keep processing the neighbors in the
					// same direction as the current neighbor.
					queue.push({
						letter,
						index: neighbor.index,
						direction: [neighbor.direction]
					});
				}
			}
		}

		// Return the number of times this X is part of the sequence XMAS.
		return count;
	}

	/**
	 * Returns the next letter from the word XMAS based on the provided letter.
	 */
	private getNextLetter(letter: string): string {
		switch (letter) {
			case 'X': return 'M';
			case 'M': return 'A';
			case 'A': return 'S';
		}
	}

	/**
	 * Checks if the cells that make the diagonals for the provided index both
	 * contain the letters M and S.
	 * @returns True when both the diagonals for the provided index contain the
	 *          letters M and S; otherwise false.
	 */
	private isCrossMas(index: number): boolean {
		const diagonals: string[][] = [[], []];

		// Get the neighbors at the diagonal positions.
		for (const neighbor of this.neighbors(index, ['down-left', 'down-right', 'up-left', 'up-right'])) {
			// Push the letters for the back slash to position 0 and the letters
			// for the forward slash to position 1.
			if (neighbor.direction === 'up-left' || neighbor.direction === 'down-right') {
				diagonals[0].push(neighbor.value);
			} else {
				diagonals[1].push(neighbor.value);
			}
		}

		// Sort the arrays so the order of the letters is always the same, now
		// join them together and check if it makes "MS". Only when both the
		// diagonals are "MS" have we found a cross.
		return (
			diagonals[0].sort().join('') === crossMasSequence &&
			diagonals[1].sort().join('') == crossMasSequence
		);
	}

	/* ---------------------------------------------------------------------- */

	public countXmas(): number {
		let count = 0;
		for (const [index, cell] of this.grid.entries()) {
			if (cell !== 'X') continue;
			count += this.countXmasFromIndex(index);
		}

		return count;
	}

	/**
	 * Counts the number of times a MAS cross occurs in the grid.
	 */
	public countCrossMas(): number {
		let count = 0;

		// Iterate over all the cells to find the A's and use those as the start
		// to see if it is the center of two diagonal MAS strings. Looping over
		// all the cells also means it may evaluate index which are at the edge
		// of the grid and can never be the center but I didn't optimize
		// for this.
		for (const [index, cell] of this.grid.entries()) {
			if (cell !== 'A') continue;
			// Check if this cell is the center of a MAS cross.
			count += this.isCrossMas(index) ? 1 : 0;
		}

		return count;
	}
}
