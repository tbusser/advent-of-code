import { type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

type ParseNodeResult = {
	length: number;
	metadataSum: number;
};

/* ========================================================================== */

const headerLength: number = 2;

/* ========================================================================== */

function parseNode(data: number[], headerStart: number): ParseNodeResult {
	let metadataSum: number = 0;
	let childLength = 0;

	// The header is [child count, metadata count], this means the data start
	// 2 position from the header start.
	const dataStartIndex = headerStart + headerLength;

	const childNodes = data[headerStart];
	// Iterate over the number of child nodes of the current node. For each
	// subsequent node, move the start index the number of positions of the
	// total length of previous children.
	for (let childIndex = 0; childIndex < childNodes; childIndex++) {
		const { length, metadataSum: childMetadataSum } = parseNode(data, dataStartIndex + childLength);
		childLength += length;
		metadataSum += childMetadataSum;
	}

	const metadataEntries = data[headerStart + 1];
	// The first meta data for the node can be found directly after the end of
	// the child nodes.
	const metadataStart = dataStartIndex + childLength;
	for (let metadataIndex = 0; metadataIndex < metadataEntries; metadataIndex++) {
		metadataSum += data[metadataStart + metadataIndex];
	}

	return {
		length: headerLength + childLength + metadataEntries,
		metadataSum
	};
}

function solver(input: string): number {
	const data: Input = parseInput(input);

	const { metadataSum } = parseNode(data, 0);

	return metadataSum;
}

/* ========================================================================== */

export default {
	prompt: 'Sum of all metadata entries',
	solver
} satisfies Solution;
