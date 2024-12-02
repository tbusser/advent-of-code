type Room = {
	checksum: string;
	encryptedName: string;
	sectorId: number;
};

export function parseInput(input: string): Room[] {
	const lines = input.split('\n');
	const roomPartsRegex = /(.+)-(\d+)\[(\w+)\]/;

	return lines.map(line => {
		const [, encryptedName, sectorId, checksum] = line.match(roomPartsRegex);

		return {
			checksum,
			encryptedName,
			sectorId: Number(sectorId)
		};
	});
}
