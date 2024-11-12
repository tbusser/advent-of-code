export type Instruction = {
	action: 'toggle' | 'turn on' | 'turn off';
	range: Range;
};

type Position = {
	x: number;
	y: number;
};

export type Range = {
	end: Position;
	start: Position;
};
