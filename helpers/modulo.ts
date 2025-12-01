/**
 * The implementation of the modulo operator as explained the remainder operator
 * page on MDN.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder#description
 */
export function modulo(n: number, m: number): number {
	return ((n % m) + m) % m;
}
