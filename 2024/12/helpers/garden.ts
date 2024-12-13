import { Grid as BaseGrid, Direction } from '@helpers/grid.js';

/* ========================================================================== */

enum Edge {
	up,
	right,
	down,
	left
};

/* ========================================================================== */

function directionToIndex(direction: Direction): number {
	if (direction === 'up') return Edge.up;
	if (direction === 'right') return Edge.right;
	if (direction === 'down') return Edge.down;

	return Edge.left;
}

/* ========================================================================== */

export class Garden extends BaseGrid {
	static createInstance(input: string) {
		const lines = input.split('\n');
		const columns = lines[0].length;
		const grid = lines.reduce((grid, line) => ([...grid, ...line.split('')]), []);

		return new Garden(grid, columns);
	}

	/* ====================================================================== */

	private determineNumberOfSides(plots: Record<number, boolean[]>): number {
		const plotIds = Object.keys(plots).map(Number);

		if (plotIds.length < 3) return 4;

		let count: number = 0;

		for (const plotId of plotIds) {
			if (!plots[plotId][Edge.left] && (plots[plotId - this.columns]?.[Edge.left] ?? true)) {
				count++;
			}

			if (!plots[plotId][Edge.right] && (plots[plotId - this.columns]?.[Edge.right] ?? true)) {
				count++;
			}

			if (!plots[plotId][Edge.up] && (plots[plotId - 1]?.[Edge.up] ?? true)) {
				count++;
			}

			if (!plots[plotId][Edge.down] && (plots[plotId - 1]?.[Edge.down] ?? true)) {
				count++;
			}
		}

		return count;
	}

	private measureRegion(startIndex: number, visitedPlots: Set<number>) {
		let area: number = 0;
		let perimeter: number = 0;
		const edgePlots: Record<number, boolean[]> = {};

		const plantType = this.grid[startIndex];
		const queue: number[] = [startIndex];

		while (queue.length > 0) {
			const index = queue.pop();
			if (visitedPlots.has(index)) continue;

			area++;
			visitedPlots.add(index);

			const neighbors = this.neighbors(index, ['up', 'right', 'down', 'left'])
				.filter(neighbor => neighbor.value === plantType);

			perimeter += 4 - neighbors.length;

			// Lets assume the cell doesn't have any neighboring cells.
			const inOutMap = [false, false, false, false];

			for (const neighbor of neighbors) {
				// Set the flag that the cell has a neighbor for the direction.
				inOutMap[directionToIndex(neighbor.direction)] = true;
				if (visitedPlots.has(neighbor.index)) continue;
				queue.push(neighbor.index);
			}

			edgePlots[index] = inOutMap;
		}

		return {
			area,
			edgePlots,
			perimeter,
		};
	}

	/* ====================================================================== */

	public calculateFencingPrice(): number {
		const usedPlots = new Set<number>();
		let totalPrice: number = 0;

		for (let index = 0; index < this.grid.length; index++) {
			if (usedPlots.has(index)) continue;

			const { area, perimeter } = this.measureRegion(index, usedPlots);

			totalPrice += (area * perimeter);
		}

		return totalPrice;
	}

	public calculateFencingPriceBySides(): number {
		const usedPlots = new Set<number>();
		let totalPrice: number = 0;

		for (let index = 0; index < this.grid.length; index++) {
			if (usedPlots.has(index)) continue;

			const { area, edgePlots } = this.measureRegion(index, usedPlots);
			const sides = this.determineNumberOfSides(edgePlots);

			totalPrice += area * sides;
		}

		return totalPrice;
	}
}
