export function react(polymer: number[]): number {
	const stack: number[] = [];

	for (const unit of polymer) {
		const previous = stack[stack.length - 1];

		if (previous && Math.abs(previous - unit) === 32) {
			stack.pop();
		} else {
			stack.push(unit);
		}
	}

	return stack.length;
}
