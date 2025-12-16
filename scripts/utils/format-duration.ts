const numberFormatter = new Intl.NumberFormat('en', {
	maximumFractionDigits: 5,
	minimumFractionDigits: 5
});

/* ========================================================================== */

export function formatDuration(duration: number): string {
	return duration > 1
		? `${numberFormatter.format(duration)}ms`
		: `${numberFormatter.format(duration * 1000)}µs`;
}
