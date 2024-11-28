/**
 * Calculates how much each group must weigh when given the weight of all the
 * packages.
 *
 * @param packages The weight of each package to be fitted on the sleigh.
 * @param groups The number of groups to equally divide the weight over.
 *
 * @returns The weight the groups should have to equally distribute the weight.
 */
export function calculateTargetWeight(packages: number[], groups: number): number {
	// Calculate the total weight of the packages, when this is calculated we
	// can calculate the weight we need per group.
	const totalWeight = packages.reduce((total, weight) => total + weight, 0);

	return totalWeight / groups;
}
