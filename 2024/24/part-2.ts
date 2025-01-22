import { parseInput } from './helpers/parse-input.js';
import { MonitoringDevice } from './helpers/monitoring-device.js';

/* ========================================================================== */

const debug: boolean = true;

/* ========================================================================== */

function solver(input: string): string {
	const deviceConfiguration = parseInput(input);
	const device = new MonitoringDevice(deviceConfiguration);
	const fixedWires = device.fixWireConfiguration();

	if (debug) {
		device.resolveAllWires();
		const resultBits = device.getNumber('z').toString(2);

		const x = device.getNumber('x');
		const y = device.getNumber('y');
		const expectedBits = (x + y).toString(2);

		for (let index = 1; index <= expectedBits.length; index++) {
			const currentBit = resultBits.at(-1 * index);
			const expectedBit = expectedBits.at(-1 * index);
			if (currentBit !== expectedBit) {
				console.log(`Difference at z${(index - 1).toString().padStart(2, '0')}, current value is ${currentBit} and expected ${expectedBit}`);
			}
		}

		console.log('Current answer in bits : ', resultBits);
		console.log('Expected answer in bits: ', expectedBits);
	}

	return fixedWires;
}

/* ========================================================================== */

export default {
	prompt: 'The names of the wires involved in the swap',
	solver
} satisfies Solution<string>;
