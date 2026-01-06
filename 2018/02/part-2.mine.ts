import { type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): string {
	const boxes: Input = parseInput(input);

	for (let outer: number = 0; outer < boxes.length; outer++) {
		const outerBox: string[] = boxes[outer].split('');
		for (let inner: number = outer + 1; inner < boxes.length; inner++) {
			const innerBox: string[] = boxes[inner].split('');

			const mismatchIndexes: number[] = [];
			for (let letterIndex: number = 0; letterIndex < outerBox.length; letterIndex++) {
				if (outerBox[letterIndex] !== innerBox[letterIndex]) {
					mismatchIndexes.push(letterIndex);
				}
				if (mismatchIndexes.length === 2) break;
			}

			if (mismatchIndexes.length === 1) {
				outerBox.splice(mismatchIndexes[0], 1);

				return outerBox.join('');
			};
		}
	}

	return 'NOT FOUND';
}

/* ========================================================================== */

export default {
	prompt: 'placeholder prompt',
	solver
} satisfies Solution<string>;
