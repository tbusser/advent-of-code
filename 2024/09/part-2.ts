function solver(input: string): number {
	const parsedInput: number[] = input.split('').map(Number);
	const disk: Record<number, number> = {};
	const freeSpace: Record<number, number> = {};

	// Start with the last file and process each file till the first file has
	// been processed.
	for (let fileIndex = input.length - 1; fileIndex >= 0; fileIndex -= 2) {
		// The offset will point to the first available free block which starts
		// a range large enough to store the current file.
		let offset = 0;

		// Iterate over the free spaces, starting at the front and working
		// towards the back.
		for (let index = 0; index < fileIndex; index++) {
			// Initialize the counter for the number of free blocks available
			// for this entry. If we fill the free space (partially) we can
			// reduce this field and leave the entry in the parsed input alone.
			// Adjusting the value in the parsedInput will cause the index of
			// all subsequent entries to shift leading to problems.
			freeSpace[index] ??= parsedInput[index];

			// When the index is even it is for a file and we can add its length
			// to the offset. When there is not enough space for the file, add
			// original size of the free space the offset.
			if (
				index % 2 === 0 ||
				freeSpace[index] < parsedInput[fileIndex]
			) {
				offset += parsedInput[index];
				continue;
			}

			// The offset points to the beginning of the free space but it is
			// possible it has already been partially filled up. Adjust the
			// offset by the number of free spaces already used up by
			// other files.
			offset += parsedInput[index] - freeSpace[index];
			// Decrease the number of free blocks left in this range by the
			// number of blocks we will use for this file.
			freeSpace[index] -= parsedInput[fileIndex];

			// We've found an empty space large enough for the current file,
			// stop processing empty spaces.
			break;
		}

		// The offset points to the first empty space where we can store the
		// file. Fill up the empty spaces as needed with the file ID.
		for (let count = 0; count < parsedInput[fileIndex]; count++) {
			disk[offset + count] = fileIndex / 2;
		}
	}

	return Object.keys(disk).reduce((total, index) => total + (Number(index) * disk[index]), 0);
}

/* ========================================================================== */

export default {
	prompt: 'The resulting filesystem checksum is',
	solver
} satisfies Solution;
