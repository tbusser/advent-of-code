function createBlockPicker(input: string) {
	// Start at the end of the input.
	let tailIndex: number = input.length - 1;
	// Contains the number of blocks, filled with the file ID, of the last
	// processed file.
	let cache: number[] = [];

	function pickBlocks(count: number, boundary: number): { blocks: number[], tailIndex: number } {
		// Take from the cache the number of blocks we need. This will ensure we
		// start with the leftovers of the last file.
		const blocks: number[] = cache.splice(0, count);

		// The tail index must not become smaller than the provided boundary. If
		// we would continue it would mean we start to move blocks of files
		// which have already been processed.
		while (blocks.length < count && tailIndex > boundary) {
			// Fill the cache with as many blocks specified for the fill. Each
			// block will contain the file ID.
			cache = Array(Number(input[tailIndex])).fill(tailIndex / 2);
			// Adjust the tail index, skipping the next index which indicates
			// the number of free blocks.
			tailIndex -= 2;

			// Add to the blocks as much from the cache as we can but no more
			// than we need to fulfill the count requirement.
			blocks.push(...cache.splice(0, count - blocks.length));
		}

		return {
			blocks,
			tailIndex
		};
	}

	function getCacheContent(): number[] {
		return cache;
	}

	/* ---------------------------------------------------------------------- */

	return {
		getCacheContent,
		pickBlocks
	};
}

async function solver(input: string): Promise<number> {
	const disk: number[] = [];
	const { getCacheContent, pickBlocks } = createBlockPicker(input);
	let index = 0;

	while (true) {
		// The current index is for a file. Create an array equal to the
		// specified blocks for the file and fill these blocks with the file ID.
		disk.push(...Array(Number(input[index])).fill(index / 2));

		// The next index specifies the number of free blocks in which we can
		// place blocks from the end of the disk map. Take as many blocks as are
		// needed to fill the free space but do not take them from files we've
		// already processed.
		const { blocks, tailIndex } = pickBlocks(Number(input[index + 1]), index);
		// Add the blocks from the back to the rearranged disk map.
		disk.push(...blocks);

		// Skip two places ahead as we've just processed two indexes one with a
		// file and another with free blocks.
		index += 2;

		// When the index is greater than where we left of getting blocks from
		// the tail end, it mean's we've processed all files.
		if (index > tailIndex) break;
	}

	// There can still be a remainder from the tail present, this will have to
	// be added to the rearranged disk map too.
	disk.push(...getCacheContent());

	return disk.reduce((total, block, index) => total + (block * index), 0);
}

/* ========================================================================== */

export default {
	prompt: 'The resulting filesystem checksum is',
	solver
} satisfies Solution;
