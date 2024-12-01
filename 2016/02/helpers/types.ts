export type Key = {
	value: string;

	neighbors?: {
		U: Key | null;
		R: Key | null;
		D: Key | null;
		L: Key | null;
	};
};
