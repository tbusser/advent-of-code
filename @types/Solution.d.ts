declare type Solution<T = number> = {
	/**
	 * The text to describe what the answer represents. It will automatically
	 * be given colon (":") at the end, just before the answer.
	 */
	prompt: string;

	/**
	 * The method which will be given the puzzle input and is expected to return
	 * the answer.
	 *
	 * @param input The puzzle input from the input.txt file.
	 */
	solver: (input: string) => Promise<T>;
};
