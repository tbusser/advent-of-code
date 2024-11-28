export type RegisterName = 'a' | 'b';

export type InstructionName = 'hlf' | 'tpl' | 'inc' | 'jmp' | 'jie' | 'jio';

type Assignment = {
	instruction: Extract<InstructionName, 'hlf' | 'tpl' | 'inc'>;
	register: RegisterName;
};

type Jump = {
	instruction: Extract<InstructionName, 'jmp'>;
	offset: number;
};

type ConditionalJump = {
	instruction: Extract<InstructionName, 'jie' | 'jio'>
	offset: number;
	register: RegisterName;
};

export type Instruction = (Assignment | Jump | ConditionalJump);
