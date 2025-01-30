export type IpAddressV7 = {
	hypernetParts: string[];
	nonHypernetParts: string[];
};

/* ========================================================================== */

// Capture all letters which are preceded by the start of the string or a "]"
// until we either encounter the end of the string or a "[".
const regexNonHypernetParts = /(?:^|\])(\w+?)(?:$|\[)/g;
// Hypernet parts are all characters in between "[" and "]".
const regexHypernetParts = /\[(\w+?)\]/g;

/* ========================================================================== */

function getGroups(address: string, regex: RegExp): string[] {
	const groups: string[] = [];
	let match: RegExpExecArray | null = null;

	// Keep executing the regex until no more matches are found. For each match
	// add value of the first capture group to the groups array.
	while ((match = regex.exec(address)) !== null) groups.push(match[1]);

	return groups;
}

/* -------------------------------------------------------------------------- */

export function parseInput(input: string): IpAddressV7[] {
	const addresses = input.split('\n');

	return addresses.map<IpAddressV7>(address => ({
		nonHypernetParts: getGroups(address, regexNonHypernetParts),
		hypernetParts: getGroups(address, regexHypernetParts)
	}));
}
