export type Reindeer = {
	cycleDistance: number;
	cycleTime: number;
	flightTime: number;
	name: string;
	restTime: number;
	speed: number;
};

/* ========================================================================== */

export function parseInput(input: string): Reindeer[] {
	const lines = input.split('\n');

	return lines.map<Reindeer>(line => {
		const [speed, flightTime, restTime] = line.match(/\d+/g).map(Number);
		const name = line.match(/^\w+/)[0];

		return {
			cycleDistance: flightTime * speed,
			cycleTime: flightTime + restTime,
			flightTime,
			name,
			restTime,
			speed
		} satisfies Reindeer;
	});
}
