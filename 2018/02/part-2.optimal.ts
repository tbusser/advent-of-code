import { type Input, parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

function solver(input: string): string {
	const boxes: Input = parseInput(input);

	for (let outer: number = 0; outer < boxes.length; outer++) {
		const outerBox: string = boxes[outer];
		for (let inner: number = outer + 1; inner < boxes.length; inner++) {
			const innerBox: string = boxes[inner];

			let mismatchIndex: number = undefined;
			for (let letterIndex: number = 0; letterIndex < outerBox.length; letterIndex++) {
				if (outerBox[letterIndex] !== innerBox[letterIndex]) {
					// When the mismatchIndex is undefined it means this is the
					// first mismatch and we need to remember the index. If
					// mismatchIndex is no longer undefined, this is the second
					// mismatch and we can stop processing. Reset mismatchIndex
					// to undefined so the result won't get constructed.
					if (mismatchIndex === undefined) {
						mismatchIndex = letterIndex;
					} else {
						mismatchIndex = undefined;
						break;
					}
				}
			}

			// Either there is no mismatch or there are more than 1, either way
			// this is not the box to return the result for.
			if (mismatchIndex === undefined) continue;

			let result: string = '';
			for (let index: number = 0; index < outerBox.length; index++) {
				if (index === mismatchIndex) continue;
				result += outerBox[index];
			}

			return result;
		}
	}

	return 'NOT FOUND';
}

/* ========================================================================== */

export default {
	prompt: 'placeholder prompt',
	solver
} satisfies Solution<string>;
