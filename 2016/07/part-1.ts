import { IpAddressV7, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function isTLSSupported(ipAddress: IpAddressV7): boolean {
	function containsAbba(part: string): boolean {
		for (let index = 0; index < part.length - 2; index++) {
			// When the next letter is the same it can't be part of an
			// ABBA sequence.
			if (part[index] === part[index + 1]) continue;

			// Check if the fourth letter matches the first letter and if the
			// second letter matches the third letter.
			if (
				part[index] === part[index + 3] &&
				part[index + 1] === part[index + 2]
			) return true;
		}

		return false;
	}

	return (
		ipAddress.nonHypernetParts.some(containsAbba) &&
		!ipAddress.hypernetParts.some(containsAbba)
	);
}

function solver(input: string): number {
	const ipAddresses = parseInput(input);

	return ipAddresses.reduce<number>((result, address) => result + (isTLSSupported(address) ? 1 : 0), 0);
}

/* ========================================================================== */

export default {
	prompt: 'The number of IP addresses supporting TLS is',
	solver
} satisfies Solution;
