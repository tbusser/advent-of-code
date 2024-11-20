import { Ingredients } from './parse-input.js';

/* ========================================================================== */

type CookieInformation = {
	calories: number;
	score: number;
};

type IngredientQuantity = {
	name: string;
	teaspoons: number;
};

type Score = Pick<Ingredients, 'calories' | 'capacity' | 'durability' | 'flavor' | 'texture'>;

/* ========================================================================== */

function calculateCookieInfo(recipe: IngredientQuantity[], ingredients: Ingredients[]): CookieInformation {
	// Iterate over all the ingredients and calculate the total per property
	const totals = ingredients.reduce<Score>((subtotal, ingredient) => {
		// Find the quantity of the current ingredient in the recipe.
		const { teaspoons } = recipe.find(item => item.name === ingredient.name);

		// Calculate the score for the each of the properties and add them to
		// the total.
		subtotal.calories += teaspoons * ingredient.calories;
		subtotal.capacity += teaspoons * ingredient.capacity;
		subtotal.durability += teaspoons * ingredient.durability;
		subtotal.flavor += teaspoons * ingredient.flavor;
		subtotal.texture += teaspoons * ingredient.texture;

		return subtotal;
	}, { calories: 0, capacity: 0, durability: 0, flavor: 0, texture: 0 });


	// For the score we need to ensure all negative numbers become 0, by using
	// Math.max negative numbers become 0 while the positive numbers will remain
	// as is.
	const score = (
		Math.max(totals.capacity, 0) *
		Math.max(totals.durability, 0) *
		Math.max(totals.flavor, 0) *
		Math.max(totals.texture, 0)
	);

	return {
		calories: totals.calories,
		score
	};
}

export function findBestScoringCookie(ingredients: Ingredients[], maxTeaspoons: number, calorieGoal?: number) {
	let maxScore: number = 0;

	function balance(recipe: IngredientQuantity[], remainingIngredients: Ingredients[], remainingTeaspoons: number) {
		// When there is only 1 ingredient left, give it all the
		// remaining quantity.
		if (remainingIngredients.length === 1) {
			recipe.push({ name: remainingIngredients[0].name, teaspoons: remainingTeaspoons });
			const cookieInfo = calculateCookieInfo(recipe, ingredients);
			// If a calorie goal has been set, make sure the cookie meets the
			// calorie requirement. If the requirement is not met the cookie's
			// score needs to be ignored.
			if (calorieGoal !== undefined && cookieInfo.calories !== calorieGoal) return;

			// Remember the score of the highest scoring cookie.
			maxScore = Math.max(cookieInfo.score, maxScore);

			return;
		}

		const currentIngredient = remainingIngredients.at(0);
		const remainingTodo = remainingIngredients.slice(1);
		// The current ingredient can be used between 1 and n times. The maximum
		// is determined by the number of left over ingredients. There should be
		// enough quantity left to use each remaining ingredient at least
		// one time.
		const teaspoonLimit = remainingTeaspoons - (remainingIngredients.length - 1);

		// For the current ingredient, create a recipe variant where the
		// ingredient is used between 1 and the maximum number of times.
		for (let teaspoons = 1; teaspoons <= teaspoonLimit; teaspoons++) {
			const newRecipe = [...recipe, { name: currentIngredient.name, teaspoons }];
			// Create new recipes with the remaining ingredients and the left
			// over quantity.
			balance(newRecipe, remainingTodo, remainingTeaspoons - teaspoons);
		}
	}

	balance([], ingredients, maxTeaspoons);

	return maxScore;
}
