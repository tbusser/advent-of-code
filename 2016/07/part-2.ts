import { IpAddressV7, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function isSSLSupported(ipAddress: IpAddressV7): boolean {
	function findByteAllocationBlockCodes(part: string): string[] {
		const result: string[] = [];

		for (let index = 0; index < part.length - 2; index++) {
			if (part[index] !== part[index + 1] && part[index] === part[index + 2]) {
				result.push(`${part[index + 1]}${part[index]}${part[index + 1]}`);
			}
		}

		return result;
	}

	// Iterate over all the non-hypernet parts of the address
	for (const part of ipAddress.nonHypernetParts) {
		// Find the byte allocation codes for the current part.
		const byteAllocationCodes = findByteAllocationBlockCodes(part);

		// Iterate over all the hypernet parts of the address.
		for (const hypernetPart of ipAddress.hypernetParts) {
			// Iterate over all the codes found in the non-hypernet part.
			for (const code of byteAllocationCodes) {
				// When the hypernet part includes the code the IP address
				// supports the SSL protocol.
				if (hypernetPart.includes(code)) return true;
			}
		}
	}

	// All the parts have been checked and non had matching ABA-BAB codes. The
	// IP address doesn't support SSL.
	return false;
}

function solver(input: string): number {
	const ipAddresses = parseInput(input);

	return ipAddresses.reduce<number>((result, address) => result + (isSSLSupported(address) ? 1 : 0), 0);
}

/* ========================================================================== */

export default {
	prompt: 'The number of IP addresses supporting SSL is',
	solver
} satisfies Solution;
