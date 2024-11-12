import { convertRangeToId } from './range-to-ids.js';
import { Range } from './types.js';

/* ========================================================================== */

export class BrightnessGrid {
	constructor(public readonly size: number = 1000) {
		// Intentionally left empty.
	}

	/* ====================================================================== */

	private litLights: Map<number, number> = new Map();

	/* ---------------------------------------------------------------------- */

	public get totalBrightness(): number {
		return this.litLights.values().reduce((total, value) => total + value, 0);
	}

	/* ====================================================================== */

	private decreaseBrightness(id: number) {
		const brightness = this.litLights.get(id) ?? 0;
		if (brightness === 0) return;

		this.litLights.set(id, brightness - 1);
	}

	private increaseBrightness(id: number, delta = 1) {
		const brightness = this.litLights.get(id) ?? 0;
		this.litLights.set(id, brightness + delta);
	}

	/* ---------------------------------------------------------------------- */

	public toggle(range: Range) {
		const ids = convertRangeToId(range);
		ids.forEach(id => this.increaseBrightness(id, 2));
	}

	public turnOff(range: Range) {
		const ids = convertRangeToId(range);
		ids.forEach(id => this.decreaseBrightness(id));
	}

	public turnOn(range: Range) {
		const ids = convertRangeToId(range);
		ids.forEach(id => this.increaseBrightness(id));
	}
}
