import { ResearchGrid } from './helpers/research-grid.js';

/* ========================================================================== */

function solver(input: string): number {
	const grid: ResearchGrid = ResearchGrid.createInstance(input);

	return grid.countTimelines();
}

/* ========================================================================== */

export default {
	prompt: 'Total number of timelines',
	solver
} satisfies Solution;
