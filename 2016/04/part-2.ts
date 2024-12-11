import { decryptName } from './helpers/decrypt.js';
import { generateChecksum } from './helpers/generate-checksum.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

/**
 * The name of room was acquired by logging all the decrypted names and looking
 * for a name which sounds like a room where someone would store objects from
 * the north pole.
 */
const storageRoomName = 'northpole object storage';

/* ========================================================================== */

function solver(input: string): number {
	const rooms = parseInput(input);

	const realRooms = rooms.filter(room => room.checksum === generateChecksum(room.encryptedName));

	for (const room of realRooms) {
		if (decryptName(room.encryptedName, room.sectorId) === storageRoomName) {
			return room.sectorId;
		}
	}

	return -1;
}

/* ========================================================================== */

export default {
	prompt: 'The sector ID of the room where the North Pole objects are stored is',
	solver
} satisfies Solution;
