import { type Coordinate } from './parse-input.js';

/* ========================================================================== */

type Connection = {
	a: string;
	b: string;
	distance: number;
};

function calculateDistance(a: Coordinate, b: Coordinate): number {
	return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
}

// Quickselect: partition-based selection (k smallest elements)
function quickSelect(arr, left, right, k) {
	while (left < right) {
		const pivot = arr[(left + right) >> 1].d;
		let i = left, j = right;

		while (i <= j) {
			while (arr[i].d < pivot) i++;
			while (arr[j].d > pivot) j--;
			if (i <= j) {
				[arr[i], arr[j]] = [arr[j], arr[i]];
				i++; j--;
			}
		}

		if (k <= j) right = j;
		else if (k >= i) left = i;
		else return;
	}
}

export function findKClosestPairs(points: Coordinate[], K: number): Connection[] {
	const n = points.length;
	const pairs = [];
	pairs.length = (n * (n - 1)) / 2; // preallocate

	let idx = 0;
	for (let i = 0; i < n - 1; i++) {
		for (let j = i + 1; j < n; j++) {
			pairs[idx++] = { i, j, d: calculateDistance(points[i], points[j]) };
		}
	}

	// Select K smallest squared distances
	quickSelect(pairs, 0, pairs.length - 1, K - 1);

	// Take first K and sort them
	const result = pairs.slice(0, K).sort((a, b) => a.d - b.d);

	// Convert squared distances to real distance if needed
	return result.map(p => ({
		a: points[p.i].id,
		b: points[p.j].id,
		distance: p.d
	}));
}
