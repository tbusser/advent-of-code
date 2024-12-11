export function solver(input: string): number {
	const moveUp = input.match(/\(/g)?.length || 0;
	const moveDown = input.match(/\)/g)?.length || 0;

	return moveUp - moveDown;
}

/* ========================================================================== */

export default {
	prompt: 'The instructions take Santa to floor',
	solver
} satisfies Solution;
