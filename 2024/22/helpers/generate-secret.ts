function mix(value: number, secret: number): number {
	return ((value ^ secret) >>> 0) % 16777216;
}

/* -------------------------------------------------------------------------- */

export function generateSecret(seed: number): number {
	const a = mix((seed * 64), seed);
	const b = mix(Math.floor(a / 32), a);

	return mix(b * 2048, b);
}
