import { Coordinate, Grid } from '@helpers/grid.js';

/* ========================================================================== */

const symbol: Record<string, string> = {
	end: 'E',
	start: 'S',
	wall: '#'
};

/* ========================================================================== */

export class Racetrack extends Grid<string | number> {
	constructor(protected grid: Array<string | number>, columns: number, public readonly trackLength: number) {
		super(grid, columns);

		this.track = this.identifyTrack();
	}

	/* ---------------------------------------------------------------------- */

	static createInstance(input: string): Racetrack {
		const lines = input.split('\n');
		const grid = lines.reduce<string[]>((result, line) => [...result, ...line.split('')], []);
		const trackLength = input.match(/\./g).length + 1;

		return new Racetrack(grid, lines[0].length, trackLength);
	}

	/* ---------------------------------------------------------------------- */

	private track: number[];

	/* ---------------------------------------------------------------------- */

	/**
	 * Update the grid so each empty cell contains how many moves away it is
	 * from the end point. After this method there will be no more cells with
	 *  "." as its content.
	 *
	 * @returns An array with the indexes of the cells that make up the
	 *          racetrack ordered from start to end.
	 */
	private identifyTrack(): number[] {
		const deltas = [-this.columnCount, 1, this.columnCount, -1];
		const endIndex = this.grid.findIndex(cell => cell === symbol.end);
		let position = this.grid.findIndex(cell => cell === symbol.start);
		let tilesToGo = this.trackLength;
		let previousPosition: number;

		this.grid[position] = tilesToGo--;
		const path: number[] = [position];

		while (position !== endIndex) {
			for (let index = 0; index < 4; index++) {
				if (position + deltas[index] === previousPosition) continue;
				if (this.grid[position + deltas[index]] === symbol.wall) continue;

				previousPosition = position;
				position = position + deltas[index];

				this.grid[position] = tilesToGo--;
				path.push(position);

				break;
			}
		}

		return path;
	}

	/* ---------------------------------------------------------------------- */

	/**
	 * Returns an array of track lengths after having cheated from the provided
	 * origin point for no more than the provided distance.
	 *
	 * @param origin The index of the cell from which to start.
	 * @param distance The maximum number of moves for which collision detection
	 *        can be disabled.
	 */
	private getRemainingDistances(origin: number, distance: number): number[] {
		const result: number[] = [];
		// Convert the origin index to a coordinate within the grid.
		const center: Coordinate = this.indexToCoordinate(origin);
		const originalDistance: number = (this.grid[origin] as number);

		// Iterate over all the y positions within the distance from the origin
		// cell. Start above the origin and go one row down for each iteration.
		for (let yModifier = -distance; yModifier <= distance; yModifier++) {
			// Make sure the new position is still within the grid, when the
			// modified y is outside the grid continue to the next iteration.
			if (center.y + yModifier < 0 || center.y + yModifier >= this.rowCount) continue;

			// Calculate how many moves are left after moving in the vertical
			// direction. This determines the number of horizontal
			// moves available.
			const xBoundary = distance - Math.abs(yModifier);
			// Iterate over al the x positions within range of the modified
			// y position.
			for (let xModifier = -xBoundary; xModifier <= xBoundary; xModifier++) {
				// When the x and y modifier are 0 we are at the origin, this
				// position can be skipped.
				if (xModifier === 0 && yModifier === 0) continue;
				// Make sure the new x position is still within the grid, when
				// the modified x position is outside the grid continue to the
				// next iteration.
				if (center.x + xModifier < 0 || center.x + xModifier >= this.columnCount) continue;
				// Make sure the possible destination cell contains a number,
				// cells that don't contain a number are not part of the
				// race track.
				if (typeof this.grid[origin + (yModifier * this.columnCount) + xModifier] !== 'number') continue;
				// Make sure the possible destination cell is closer to the end
				// point than the origin cell.
				if (originalDistance < (this.grid[origin + (yModifier * this.columnCount) + xModifier] as number))
					continue;

				// We've found a valid destination cell, calculate the length of
				// the race track with the current cheat applied. The length of
				// the track is determined by adding the following values:
				// 1) The number of position left from the end of the cheat to
				//    the end of the track.
				// 2) The distance traveled while cheating.
				result.push(
					(this.grid[origin + (yModifier * this.columnCount) + xModifier] as number) + // [1]
					Math.abs(yModifier) + Math.abs(xModifier) /// [2]
				);
			}
		}

		return result;
	}

	public findCheats(threshold: number, distance: number = 2): number {
		// Iterate over all the cells of the track, in order from start to end.
		return this.track.reduce<number>((cheats, cellIndex, traveled) => {
			// Get all the cells which can be reached from the current cell.
			this.getRemainingDistances(cellIndex, distance).forEach(remainingDistance => {
				// The traveled var is the number of moves we are away from the
				// start. Add to this the number of moves the destination cell
				// is away from the end position and we add the distance
				// traveled for the cheat we get the total track length for the
				// cheat.
				// When we subtract this number from the original track length
				// we get the number of picoseconds saved by this cheat.
				if (this.trackLength - (traveled + remainingDistance) >= threshold) cheats++;
			});

			return cheats;
		}, 0);
	}
}
