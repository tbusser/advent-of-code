import { DepartmentGrid } from './helpers/department-grid.js';

/* ========================================================================== */

function solver(input: string): number {
	const grid: DepartmentGrid = DepartmentGrid.createInstance(input);

	return grid.countAccessibleRolls();
}

/* ========================================================================== */

export default {
	prompt: 'Number of accessible paper rolls',
	solver
} satisfies Solution;
