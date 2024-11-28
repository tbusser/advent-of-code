function calculateQuantumEntanglement(packages: number[]): number {
	return packages.reduce((quantumEntanglement, weight) => quantumEntanglement * weight, 1);
}

/* ========================================================================== */

export function findLowestEntanglement(packages: number[], targetWeight: number): number {
	let smallestGroupSize: number = Infinity;
	let lowestQuantumEntanglement: number = Infinity;

	function findCombinations(group: number[], groupWeight: number, available: number[]) {
		// If the weight exceeds the target weight, prune the branch.
		if (groupWeight > targetWeight) return;
		// If the group contains more packages than the smallest group with the
		// target weight, prune the branch.
		if (group.length > smallestGroupSize) return;

		if (groupWeight === targetWeight) {
			smallestGroupSize = group.length;
			lowestQuantumEntanglement = Math.min(lowestQuantumEntanglement, calculateQuantumEntanglement(group));

			return;
		}

		for (const [index, weight] of available.entries()) {
			findCombinations([...group, weight], groupWeight + weight, available.slice(index + 1));
		}
	}

	let remainingWeight = packages.reduce((total, weight) => total + weight, 0);
	// In order to generate all combinations use every package as the start of
	// the group. Then using all the packages which weigh less try to make
	// groups which meet the target weight.
	for (const [index, weight] of packages.entries()) {
		// When the remaining weight is less than what is required for a group,
		// stop generating combinations. None will meet the target weight.
		if (remainingWeight < targetWeight) break;

		// The next iteration will no longer use this package, reduce its weight
		// of the remaining weight.
		remainingWeight -= weight;

		// Find all combinations with the remaining packages.
		findCombinations([weight], weight, packages.slice(index + 1));
	}

	return lowestQuantumEntanglement;
}
