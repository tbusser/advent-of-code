export type Key = {
	value: string;

	neighbors?: {
		U: Key;
		R: Key;
		D: Key;
		L: Key;
	};
};
