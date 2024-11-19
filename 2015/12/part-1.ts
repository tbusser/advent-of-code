async function solver(input: string): Promise<number> {
	// Replace every character which isn't a "-" or a digit with a space
	const numbersWithWhitespace = input.replace(/[^\d-]/g, ' ');
	// Split the string on one or more spaces, this will result in an array with
	// string representations of numbers. We can convert the strings to numbers
	// by mapping them with the NumberConstructor as the map function.
	const numbers = numbersWithWhitespace.split(/ +/).map(Number);

	// Sum up all the numbers, this will be the result.
	return numbers.reduce((total, number) => total + number, 0);
}

/* ========================================================================== */

export default {
	prompt: 'The sum of all the numbers in the document is',
	solver
} satisfies Solution;
