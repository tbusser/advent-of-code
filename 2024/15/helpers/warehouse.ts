import { Grid } from '@helpers/grid.js';

/* ========================================================================== */

const move = {
	down: 'v',
	left: '>',
	right: '<',
	up: '^',
} as const;
type Move = typeof move[keyof typeof move];

const symbol = {
	empty: '.',
	package: 'O',
	packageStart: '[',
	packageEnd: ']',
	robot: '@',
	wall: '#'
} as const;
type Symbol = typeof symbol[keyof typeof symbol];

/* ========================================================================== */

export class Warehouse extends Grid<Symbol> {
	constructor(protected grid: Symbol[], protected readonly columns: number) {
		super(grid, columns);

		this.robotIndex = this.grid.findIndex(cell => cell === symbol.robot);
		// Virtualize the robot, by removing it from the grid there is no need
		// to update the grid after each movement.
		this.grid[this.robotIndex] = '.';
	}

	/* ---------------------------------------------------------------------- */

	private robotIndex: number;

	private getDeltaForMove(move: Move): number {
		switch (move) {
			case '<': return -1;
			case '>': return 1;
			case '^': return -this.columns;
			case 'v': return this.columns;
		}
	};

	/* ---------------------------------------------------------------------- */

	static createInstance(input: string[], expand: boolean = false) {
		const grid: Symbol[] = !expand
			? input.reduce((result, line) => [...result, ...line.split('')], [])
			: input.reduce((result, line) => [
				...result,
				...line.split('').map(cell => {
					switch (cell) {
						case symbol.empty: return ['.', '.'];
						case symbol.package: return ['[', ']'];
						case symbol.robot: return ['@', '.'];
						case symbol.wall: return ['#', '#'];
					}
				}).flat()
			], []);

		const columnCount = input[0].length * (expand ? 2 : 1);

		return new Warehouse(grid, columnCount);
	}

	/* ---------------------------------------------------------------------- */

	/**
	 *
	 * @param indexes The indexes containing the boxes on a particular row.
	 * @param delta How many to add/subtract from an index to get to the
	 *        next or previous row.
	 *
	 * @returns The indexes provided to the method plus the indexes of the boxes
	 *          in the next/previous row(s). When one of the boxes is adjacent
	 *          to a wall the result will be null.
	 */
	private findStackedBoxes(indexes: number[], delta: number): number[] | null {
		const boxIndexes: number[] = [];

		for (const index of indexes) {
			// When the cell contains a wall, none of the boxes can be pushed.
			if (this.grid[index + delta] === symbol.wall) return null;
			// When the cell is empty, ignore it.
			if (this.grid[index + delta] === symbol.empty) continue;

			if (this.grid[index + delta] === symbol.packageEnd && !indexes.includes(index - 1)) {
				boxIndexes.push(index + delta - 1);
			}

			boxIndexes.push(index + delta);

			if (this.grid[index + delta] === symbol.packageStart && !indexes.includes(index + 1)) {
				boxIndexes.push(index + delta + 1);
			}
		}

		if (boxIndexes.length === 0) return indexes;
		const nextLineIndex = this.findStackedBoxes(boxIndexes, delta);

		return nextLineIndex === null
			? null
			: [...nextLineIndex, ...indexes];
	}

	private pushHorizontally(delta: number) {
		let position: number = this.robotIndex + delta;
		const positions = [];

		// Keep iterating till we find an empty space.
		while (this.grid[position] !== symbol.empty) {
			// We've hit a wall, it is not possible to move any boxes.
			if (this.grid[position] === symbol.wall) return;

			// The position contains a box, add this to the array.
			positions.push(position);
			// Prepare the position for the next iteration.
			position += delta;
		}

		// Go through the positions to move in reverse order, this way the last
		// item will first move in the empty space and we work backwards to the
		// box closest to the robot.
		for (let index = positions.length - 1; index >= 0; index--) {
			this.grid[positions[index] + delta] = this.grid[positions[index]];
		}

		// Update the position of the robot.
		this.robotIndex += delta;
		// The position where the robot is now should be marked as empty.
		this.grid[this.robotIndex] = symbol.empty;
	}

	private pushVertically(delta: number) {
		// Init the array with the indexes of the boxes to move with the
		// position just after the robot.
		const boxIndexes = [this.robotIndex + delta];
		// Check of the box is an end or start part, in this case the other half
		// also has to be included.
		if (this.grid[boxIndexes[0]] === symbol.packageEnd) boxIndexes.push(this.robotIndex + delta - 1);
		if (this.grid[boxIndexes[0]] === symbol.packageStart) boxIndexes.push(this.robotIndex + delta + 1);

		const allBoxesIndexes = this.findStackedBoxes(boxIndexes, delta);
		if (allBoxesIndexes === null) return;

		for (let index = 0; index < allBoxesIndexes.length; index++) {
			this.grid[allBoxesIndexes[index] + delta] = this.grid[allBoxesIndexes[index]];
			this.grid[allBoxesIndexes[index]] = symbol.empty;
		}

		// Update the position of the robot.
		this.robotIndex += delta;
		// The position where the robot is now should be marked as empty.
		this.grid[this.robotIndex] = symbol.empty;
	}

	/* ---------------------------------------------------------------------- */

	public calculateGPSsum(): number {
		return this.grid.reduce<number>((sum, cell, index) => {
			if (cell !== symbol.packageStart && cell !== symbol.package) return sum;

			const coordinate = this.indexToCoordinate(index);

			return sum + (coordinate.y * 100) + coordinate.x;
		}, 0);
	}

	public moveRobot(instructions: string) {
		for (const instruction of instructions) {
			const updatedRobotIndex = this.robotIndex + this.getDeltaForMove(instruction as Move);

			// When the next position is a wall, do nothing.
			if (this.grid[updatedRobotIndex] === symbol.wall) continue;

			// When the next position is empty, just update the position of
			// the robot.
			if (this.grid[updatedRobotIndex] === symbol.empty) {
				this.robotIndex = updatedRobotIndex;
				continue;
			}

			if (instruction === move.left || instruction === move.right) {
				this.pushHorizontally(this.getDeltaForMove(instruction as Move));
			} else {
				this.pushVertically(this.getDeltaForMove(instruction as Move));
			}
		}
	}

	public toString(): string {
		// Insert the robot at its position so it will show up in the output.
		this.grid[this.robotIndex] = symbol.robot;
		// Create a string representation of the current grid state.
		const gridAsString = this.getRows().map(row => row.join('')).join('\n');
		// Remove the robot from the grid so it is virtual again.
		this.grid[this.robotIndex] = symbol.empty;

		return gridAsString;
	}
}
