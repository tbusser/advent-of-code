/**
 * Finds the factors for a given number.
 *
 * @param value The number for which to find the the factors.
 *
 * @returns An array with all the factors, sorted from low to high.
 *
 * @see {@link https://courses.lumenlearning.com/mathforliberalartscorequisite/chapter/finding-all-the-factors-of-a-number/}
 */
export function findFactors(value: number): number[] {
	const factors: number[] = [];
	// We need to stop when the divisor becomes smaller than the quotient. We
	// could do that be checking the result in the for loop or we calculate when
	// it is. By taking the square root we know the tipping point and since we
	// only deal with integers we need to round it down.
	// E.g.: When factoring 72 the tipping point is 8. This because the square
	//       root of 72, rounded down, is 8.
	//       - 72 / 8 = 9, the divisor (8) is more than the quotient (9)
	//       - 72 / 9 = 8, the divisor (9) has become more than the quotient (8)
	const limit = Math.floor(Math.sqrt(value));

	// Starting by 1 keep processing all the integers until the limit has been
	// processed too.
	for (let divisor = 1; divisor <= limit; divisor++) {
		// When the quotient is not a whole number, the divisor and quotient
		// are not factors.
		if (value % divisor !== 0) continue;

		factors.push(divisor);

		// When the divisor and quotient are the same, there is no need to add
		// the quotient the list of factors it has already been added when the
		// divisor was added to the list.
		if (value / divisor !== divisor) {
			factors.push(value / divisor);
		}
	}

	return factors.sort((a, b) => a - b);
}
