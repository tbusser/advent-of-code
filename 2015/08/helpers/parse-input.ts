export function parseInput(input: string) {
	const lines = input.split('\n');

	let codeSpace = 0;
	let memorySpace = 0;

	lines.forEach(line => {
		codeSpace += line.length;
		// Remove the start and end double quote, these are not part of the
		// memory space.
		const literal = line.substring(1, line.length - 1);

		let index = 0;
		// Iterate over the characters in the literal, keep doing that till the
		// end has been reached.
		while (index < literal.length) {
			// Increase the required memory space by one, we are processing a
			// single character per iteration.
			memorySpace++;

			// Get the current character.
			const character = literal.charAt(index);
			// Check if it is the beginning of an escape sequence, this is a
			// special case.
			if (character === '\\') {
				// [1] If the character after the "\" is an x we know the escape
				//     sequence is 4 characters long, we can skip to sequence
				//     and set the index to the first character after the
				//     escape sequence.
				// [2] If the character after the "\" is not an x we know the
				//     escape sequence is 2 characters long.
				index += literal.charAt(index + 1) === 'x'
					? 4  // [1]
					: 2; // [2]
			} else {
				// No special case, just progress to the next character.
				index++;
			}
		}
	});

	return {
		codeSpace,
		memorySpace
	};

}
