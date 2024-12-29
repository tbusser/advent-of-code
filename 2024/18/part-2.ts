import { MemorySpace } from './helpers/memory-space.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): string {
	const corruptedSpaces = parseInput(input);
	const items = corruptedSpaces.splice(1024);
	const memorySpace = MemorySpace.createInstance(71);

	corruptedSpaces.forEach(corruptedSpace => memorySpace.markMemorySpaceCorrupted(corruptedSpace));

	for (const coordinate of items) {
		memorySpace.markMemorySpaceCorrupted(coordinate);
		if (memorySpace.findShortestPath() === Infinity) {
			return `${coordinate.x},${coordinate.y}`;
		}
	}
}

/* ========================================================================== */

export default {
	prompt: 'Coordinate of the first byte to make the exit unreachable',
	solver
} satisfies Solution<string>;
