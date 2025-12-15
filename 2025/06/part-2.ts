function solveProblem(values: number[], operator: string): number {
	return (operator === '+')
		? values.reduce((memo, value) => memo + value, 0)
		: values.reduce((memo, value) => memo * value, 1);
}

// - pad all lines to have equal width
// Start at length - 1 and read the chars at all lines for that position
// - All numeric => found a number
//.- Numeric and string => found a number plus an operator
// - All spaces => found a delimiter, solve the problem and add result to total.
function solver(input: string): number {
	const lines = input.split('\n');
	const maxLength = Math.max(...lines.map(line => line.length));
	const source = lines.map(line => line.padEnd(maxLength, ' '));
	let sum = 0;

	let memo: number[] = [];
	for (let index = maxLength - 1; index >= 0; index--) {
		const part = source.map(line => line.charAt(index));
		if (part.every(item => item === ' ')) {
			memo = [];
		} else {
			const operator = part.pop();
			memo.push(Number(part.join('')));

			if (operator !== ' ') {
				sum += solveProblem(memo, operator);
			}
		}
	}

	return sum;
}

/* ========================================================================== */

export default {
	prompt: 'Grand total',
	solver
} satisfies Solution;
