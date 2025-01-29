export function parseInput(input: string): number[][] {
	const words = input.split('\n');

	// Take the words and convert each word into an array of character codes.
	return words.map(word => [...word].map(letter => letter.charCodeAt(0)));
}
