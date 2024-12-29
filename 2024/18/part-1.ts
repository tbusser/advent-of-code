import { MemorySpace } from './helpers/memory-space.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const corruptedSpaces = parseInput(input);
	corruptedSpaces.splice(1024);
	const memorySpace = MemorySpace.createInstance(71);

	corruptedSpaces.forEach(corruptedSpace => memorySpace.markMemorySpaceCorrupted(corruptedSpace));

	return memorySpace.findShortestPath();
}

/* ========================================================================== */

export default {
	prompt: 'Minimum number of steps to reach the exit',
	solver
} satisfies Solution;
