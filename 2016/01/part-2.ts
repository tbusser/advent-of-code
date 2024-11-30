import { Coordinate } from '@helpers/grid.js';
import { followRoute } from './helpers/follow-directions.js';
import { parseInput } from './helpers/parse-input.js';

/* ========================================================================== */

type Segment = {
	end: Coordinate;
	orientation: 'horizontal' | 'vertical';
	start: Coordinate;
};

/* ========================================================================== */

function findIntersectingPoint(segmentA: Segment, segmentB: Segment): Coordinate | null {
	const horizontalSegment = segmentA.orientation === 'horizontal'
		? segmentA : segmentB;
	const verticalSegment = segmentA.orientation === 'horizontal'
		? segmentB : segmentA;

	if (
		horizontalSegment.start.y <= verticalSegment.start.y ||
		horizontalSegment.start.y >= verticalSegment.end.y
	) {
		return null;
	}

	if (
		verticalSegment.start.x <= horizontalSegment.start.x ||
		verticalSegment.start.x >= horizontalSegment.end.x
	) {
		return null;
	}

	return {
		x: verticalSegment.start.x,
		y: horizontalSegment.start.y
	};
}

/**
 * Creates line segments for the the path. All horizontal line segments will run
 * from west to east and all the vertical line segments will run from south to
 * north. Making sure all lines run in the same direction makes it easier later
 * to determine if lines are intersecting.
 */
function createLineSegments(path: Coordinate[]): Segment[] {
	const segments: Segment[] = [];

	// Iterate over the points and create a line segment between the current
	// point and the next point.
	for (let index = 0; index < path.length - 1; index++) {
		const pointA = path[index];
		const pointB = path[index + 1];
		// Check if the line segment is horizontal or vertical.
		const orientation = (pointA.x === pointB.x) ? 'vertical' : 'horizontal';

		if (orientation === 'horizontal') {
			// Order the points so the horizontal segment always goes from west
			// to east.
			segments.push({
				end: pointA.x > pointB.x ? pointA : pointB,
				orientation,
				start: pointA.x > pointB.x ? pointB : pointA,
			});
		} else {
			// Order the points so the vertical segment always goes from south
			// to north.
			segments.push({
				end: pointA.y > pointB.y ? pointA : pointB,
				orientation,
				start: pointA.y > pointB.y ? pointB : pointA,
			});
		}
	}

	return segments;
}

/* -------------------------------------------------------------------------- */

async function solver(input: string): Promise<number> {
	const route = parseInput(input);
	const path = followRoute(route);
	const segments = createLineSegments(path);

	// The fourth line segment is the first one that can intersect with a
	// previous line segment (line segment 4 can intersect with line segment 4
	// if the first 4 turns are all in the same direction). For that reason
	// start at index 3 (the 4th item).
	for (let index = 3; index < segments.length; index++) {
		// The current segment can only intersect with a line segment which runs
		// perpendicular. To only check the perpendicular lines we need to start
		// at index 0 or 1 depending on the current index.
		// E.g.: If the current index is 6, the first perpendicular line segment
		// is at index 1 as all even indexes will run in the same direction.
		let perpendicularIndex = index % 2 === 0 ? 1 : 0;
		// Skip every other index so we only test the perpendicular lines.
		for (; perpendicularIndex < index; perpendicularIndex = perpendicularIndex + 2) {
			const intersectingPoint = findIntersectingPoint(segments[index], segments[perpendicularIndex]);
			if (intersectingPoint === null) continue;

			return Math.abs(intersectingPoint.x) + Math.abs(intersectingPoint.y);
		}
	}

	return -1;
}

/* ========================================================================== */

export default {
	prompt: 'Distance to the first block visited twice',
	solver
} satisfies Solution;
