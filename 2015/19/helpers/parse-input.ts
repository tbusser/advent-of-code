export type MachineInput = {
	medicineMolecule: string;
	replacements: Replacement[];
};

export type Replacement = {
	sequence: string;
	replacement: string;
};

/* ========================================================================== */

export function parseInput(input: string): MachineInput {
	const lines = input.split('\n');

	// The last line is the medicine molecule, we need this.
	const medicineMolecule = lines.pop();
	// Before the medicine molecule is an empty string, this can be discarded.
	lines.pop();

	const replacements = lines.map(line => {
		const [sequence, replacement] = line.split(' => ');

		return { sequence, replacement };
	});

	return {
		medicineMolecule,
		replacements
	};
};
