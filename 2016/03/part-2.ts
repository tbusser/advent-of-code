import { isTriangle } from './helpers/is-triangle.js';
import { parseInputAsColumns } from './helpers/parse-input.js';

/* ========================================================================== */

async function solver(input: string): Promise<number> {
	const columns = parseInputAsColumns(input);
	let triangleCount: number = 0;

	for (const column of columns) {
		for (let index = 0; index < column.length - 2; index += 3) {
			if (isTriangle(column.slice(index, index + 3))) {
				triangleCount++;
			}
		}
	}

	return triangleCount;
}

/* ========================================================================== */

export default {
	prompt: 'Number of possible triangles',
	solver
} satisfies Solution;
