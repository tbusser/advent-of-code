import { ResearchGrid } from './helpers/research-grid.js';

/* ========================================================================== */

function solver(input: string): number {
	const grid: ResearchGrid = ResearchGrid.createInstance(input);

	return grid.countSplits();
}

/* ========================================================================== */

export default {
	prompt: 'Number of times the beam splits',
	solver
} satisfies Solution;
