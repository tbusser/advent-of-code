import { parseInput } from './helpers/parse-input.js';
import { MonitoringDevice } from './helpers/monitoring-device.js';

/* ========================================================================== */

function solver(input: string): number {
	const deviceConfiguration = parseInput(input);
	const monitoringDevice = new MonitoringDevice(deviceConfiguration);

	monitoringDevice.resolveAllWires();

	return monitoringDevice.getNumber('z');
}

/* ========================================================================== */

export default {
	prompt: 'The decimal number outputted on the wires starting with "z" is',
	solver
} satisfies Solution;
