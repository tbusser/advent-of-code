/**
 * A map that automatically creates and stores a value when a key is first
 * accessed, using the provided factory method.
 *
 * If a key exists and its value is undefined, the factory will still
 * be invoked.
 *
 * Derived from code by Robin Malfait:
 * @see https://github.com/RobinMalfait/advent-of-code/blob/main/src/aoc-utils/src/index.ts
 */
export class LazyMap<Key = string, Value = unknown> extends Map<Key, Value> {
	constructor(private factory: (key: Key) => Value) {
		super();
	}

	/* ---------------------------------------------------------------------- */

	get(key: Key): Value {
		let value = super.get(key);

		if (value === undefined) {
			value = this.factory(key);
			this.set(key, value);
		}

		return value;
	}
}
