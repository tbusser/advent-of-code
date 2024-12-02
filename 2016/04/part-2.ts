import { decryptName } from './helpers/decrypt.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function generateChecksum(encryptedName: string): string {
	const name = encryptedName.replace(/-/g, '');
	const occurrences: Record<string, number> = {};

	for (const letter of name) {
		occurrences[letter] = (occurrences[letter] ?? 0) + 1;
	}

	const sortedLetters = Object.keys(occurrences).sort((letter, otherLetter) => {
		const difference = occurrences[otherLetter] - occurrences[letter];

		if (difference !== 0) return difference;

		return letter < otherLetter ? -1 : 1;
	});

	return sortedLetters.slice(0, 5).join('');
}


/* -------------------------------------------------------------------------- */

async function solver(input: string): Promise<number> {
	const rooms = parseInput(input);

	const realRooms = rooms.filter(room => room.checksum === generateChecksum(room.encryptedName));
	for (const room of realRooms) {
		if (decryptName(room.encryptedName, room.sectorId) === 'northpole object storage') {
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
