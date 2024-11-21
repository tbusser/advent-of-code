import { Container } from './parse-input.js';

/* ========================================================================== */

type SolutionCallback = (containers: Container[]) => void;

/* ========================================================================== */

export function findCombinations(containers: Container[], volume: number, solutionCallback: SolutionCallback) {
	function distribute(
		usedContainers: Container[],
		remainingContainers: Container[],
		remainingVolume: number
	) {
		// When there is no more remaining volume a solution has been found.
		if (remainingVolume === 0) {
			solutionCallback(usedContainers);

			return;
		}

		// When there are no more remaining containers, all possible
		// combinations have been exhausted.
		if (remainingContainers.length === 0) return;

		// Iterate over the remaining containers.
		for (let index = 0; index < remainingContainers.length; index++) {
			// Get the container for the current iteration.
			const container = remainingContainers[index];

			// When the volume of the container exceeds the volume we still have
			// to distribute we skip the container. It is not possible to fill
			// a container only partially.
			if (container.volume > remainingVolume) continue;

			// Add the current container to the list of used containers.
			const updatedUsedContainers = [...usedContainers, container];
			// The remaining containers are all the containers which come after
			// the current container in the array.
			const updateRemainingContainers = remainingContainers.slice(index + 1);

			distribute(
				updatedUsedContainers,
				updateRemainingContainers,
				remainingVolume - container.volume
			);
		}
	}

	distribute([], containers, volume);
}
