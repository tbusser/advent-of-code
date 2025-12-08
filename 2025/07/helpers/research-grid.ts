import { Grid } from '@helpers/grid.js';

/* ========================================================================== */

const symbol = {
	splitter: '^',
	start: 'S'
};

/* ========================================================================== */

export class ResearchGrid extends Grid {
	constructor(grid: string[], columns: number) {
		super(grid, columns);

		this.startIndex = grid.findIndex(item => item === symbol.start);
	}

	/* ---------------------------------------------------------------------- */

	private startIndex: number;

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

		while (beams.length > 0) {
			const nextBeams = new Set<number>();
			beams.forEach(beam => {
				const neighbors = this.neighbors(beam, ['down', 'down-left', 'down-right']);
				if (neighbors.length === 0) return;
				if (neighbors[0].value === symbol.splitter) {
					splitPositions.add(neighbors[0].index);
					if (neighbors[1] !== undefined) nextBeams.add(neighbors[1].index);
					if (neighbors[2] !== undefined) nextBeams.add(neighbors[2].index);
				} else if (neighbors[0].direction === 'down') {
					nextBeams.add(neighbors[0].index);
				}
			});
			beams = [...nextBeams];
		}

		return splitPositions.size;
	}

	public countTimelines(): number {
		return -1;
	}
}
