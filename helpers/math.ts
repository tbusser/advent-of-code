export function digitsInNumber(value: number): number {
	return Math.log(value) * Math.LOG10E + 1 | 0;
}

export function getPrimeFactors(integer: number): number[] | null {
	const factors: number[] = [];
	let divisor: number = 2;

	while (integer > 1) {
		if (integer % divisor === 0) {
			factors.push(divisor);
			integer /= divisor;
		} else {
			divisor++;
		}
	}

	return factors;
}

/**
 * The implementation of the modulo operator as explained the remainder operator
 * page on MDN.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder#description
 */
export function modulo(n: number, m: number): number {
	return ((n % m) + m) % m;
}
