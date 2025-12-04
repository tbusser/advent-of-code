import { DepartmentGrid } from './helpers/department-grid.js';

/* ========================================================================== */

function solver(input: string): number {
	const grid: DepartmentGrid = DepartmentGrid.createInstance(input);

	return grid.countMovableRolls();
}

/* ========================================================================== */

export default {
	prompt: 'Number of movable paper rolls',
	solver
} satisfies Solution;
