/**
 * Calculates the modular exponentiation. I did not write this myself but it is
 * a slight adaptation of an implementation I've found online. The code is
 * credited to Saurabh Jaiswal.
 *
 * @see {@link https://www.geeksforgeeks.org/modular-exponentiation-power-in-modular-arithmetic/}
 */
export function powerMod(base: number, exponent: number, divisor: number): number {
	let result = 1;

	// Update base if it is more than or equal to the divisor.
	base = base % divisor;

	if (base === 0) return 0;

	while (exponent > 0) {
		// If exponent is odd, multiply base with result.
		if (exponent & 1) result = (result * base) % divisor;

		// The exponent must be even now, divide it by 2.
		exponent = exponent >> 1;
		base = (base * base) % divisor;
	}

	return result;
}
