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
	let childLength = 0;

	// The header is [child count, metadata count], this means the data start
	// 2 position from the header start.
	const dataStartIndex = headerStart + headerLength;

	const childNodes = data[headerStart];
	// For each child node, keep track of its metadata value.
	const childMetadataSums: number[] = new Array(childNodes);
	// Iterate over the number of child nodes of the current node. For each
	// subsequent node, move the start index the number of positions of the
	// total length of previous children.
	for (let childIndex = 0; childIndex < childNodes; childIndex++) {
		const { length, metadataSum: childMetadataSum } = parseNode(data, dataStartIndex + childLength);
		childLength += length;
		childMetadataSums[childIndex] = childMetadataSum;
	}

	const metadataEntries = data[headerStart + 1];
	let metadataSum: number = 0;
	// The first meta data for the node can be found directly after the end of
	// the child nodes.
	const metadataStart = dataStartIndex + childLength;
	for (let metadataIndex = 0; metadataIndex < metadataEntries; metadataIndex++) {
		if (childNodes === 0) {
			// When there are no child nodes, sum up all the metadata entries of
			// the node.
			metadataSum += data[metadataStart + metadataIndex];
		} else {
			// When there are child nodes, the metadata entry points to the
			// child node whose metadata value should be summed up.
			// Subtract 1 from the index as the first child is node 1 but its
			// index is 0.
			const childIndex = data[metadataStart + metadataIndex] - 1;
			if (childIndex >= 0) metadataSum += (childMetadataSums[childIndex] ?? 0);
		}
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
