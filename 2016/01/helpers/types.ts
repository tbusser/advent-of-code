export type Coordinate = {
	x: number;
	y: number;
};

export type Instruction = {
	/**
	 * The number of steps to take in the new direction.
	 */
	steps: number;

	/**
	 * When turn is 1 it means to turn 90 degrees clockwise. When it is set to
	 * -1 it indicates to make a 90 degrees turn counterclockwise.
	 */
	turn: 1 | -1;
};
