import { parseInput } from './helpers/parse-input.js';
import { Warehouse } from './helpers/warehouse.js';

/* ========================================================================== */

function solver(input: string): number {
	const data = parseInput(input);
	const warehouse = Warehouse.createInstance(data.grid);

	warehouse.moveRobot(data.moves);

	return warehouse.calculateGPSsum();
}

/* ========================================================================== */

export default {
	prompt: 'The sum of all boxes\' GPS coordinates is',
	solver
} satisfies Solution;
