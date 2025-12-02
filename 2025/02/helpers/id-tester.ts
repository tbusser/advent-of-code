export function sumUpValidIds(
	ranges: number[][],
	evenLengthOnly: boolean,
	validIdRegex: RegExp
): number {
	let sum: number = 0;

	for (const [start, end] of ranges) {
		for (let id = start; id <= end; id++) {
			if (evenLengthOnly && id.toString().length % 2 === 1) continue;
			if (validIdRegex.test(id.toString())) sum += id;
		}
	}

	return sum;
}
