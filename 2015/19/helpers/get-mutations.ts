export function* getMutations(molecule: string, sequence: string, replacement: string): Generator<string> {
	// Create a regex to find the sequence in the molecule.
	const regex = new RegExp(sequence, 'g');

	let match: RegExpExecArray | null;

	// Process all the matches in the molecule for the current replacement.
	while ((match = regex.exec(molecule))) {
		// Get the part before the match and after the match.
		const moleculeStart = molecule.substring(0, match.index);
		const moleculeEnd = molecule.substring(match.index + sequence.length);

		// Yield the mutation of the molecule with the replacement done.
		yield `${moleculeStart}${replacement}${moleculeEnd}`;
	}

	return;
}
