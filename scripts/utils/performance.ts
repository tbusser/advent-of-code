const markStart = 'start';
const measureId = 'duration';

/* ========================================================================== */

export function measure(
	method: () => number | string
): { answer: number | string; duration: number } {
	performance.clearMarks();
	performance.clearMeasures();

	performance.mark(markStart);
	const answer = method();

	performance.measure(measureId, markStart);

	return {
		answer,
		duration: performance.getEntriesByName(measureId)[0].duration
	};
}
