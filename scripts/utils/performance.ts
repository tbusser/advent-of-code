const markStart = 'start';
const measureId = 'duration';

/* ========================================================================== */

export async function measure(
	method: () => Promise<number | string>
): Promise<{ answer: number | string; duration: number }> {
	performance.clearMarks();
	performance.clearMeasures();

	performance.mark(markStart);
	const answer = await method();

	performance.measure(measureId, markStart);

	return {
		answer,
		duration: performance.getEntriesByName(measureId)[0].duration
	};
}
