import { generateChecksum } from './helpers/generate-checksum.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): number {
	const rooms = parseInput(input);

	return rooms.reduce<number>((total, room) => generateChecksum(room.encryptedName) === room.checksum
		? total + room.sectorId
		: total, 0);
}

/* ========================================================================== */

export default {
	prompt: 'The sum of the sector IDs of the real rooms is',
	solver
} satisfies Solution;
