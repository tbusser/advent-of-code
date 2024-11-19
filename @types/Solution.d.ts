declare type Solution<T = number> = {
	prompt: string;
	solver: (input: string) => Promise<T>;
};
