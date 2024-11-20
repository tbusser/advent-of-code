export type Ingredients = {
	calories: number;
	capacity: number;
	durability: number;
	flavor: number;
	name: string;
	texture: number;
};

/* ========================================================================== */

const ingredientsRegex = /-?\d+/g;
const nameRegex = /^[a-zA-Z]*/;

/* ========================================================================== */

export function parseInput(input: string): Ingredients[] {
	const lines = input.split('\n');

	return lines.map<Ingredients>(line => {
		const [capacity, durability, flavor, texture, calories] = line.match(ingredientsRegex).map(Number);
		const name = line.match(nameRegex)[0];

		return { name, capacity, durability, flavor, texture, calories } satisfies Ingredients;
	});
}
