import { convertRangeToId } from './range-to-ids.js';
import { Range } from './types.js';

/* ========================================================================== */

export class Grid {
	constructor(public readonly size: number) {
		// Intentionally left empty.
	}

	/* ====================================================================== */

	protected litLights = new Set<number>();

	/* ====================================================================== */

	public get numberOfLitLights(): number {
		return this.litLights.size;
	}

	/* ====================================================================== */

	public toggle(range: Range) {
		const ids = convertRangeToId(range);
		ids.forEach(id => this.litLights.has(id) ? this.litLights.delete(id) : this.litLights.add(id));
	}

	public turnOff(range: Range) {
		const ids = convertRangeToId(range);
		ids.forEach(id => this.litLights.delete(id));
	}

	public turnOn(range: Range) {
		const ids = convertRangeToId(range);
		ids.forEach(id => this.litLights.add(id));
	}
}
