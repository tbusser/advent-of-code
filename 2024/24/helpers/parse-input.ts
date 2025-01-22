import { type DeviceConfiguration, type WireConfiguration, type Wires } from './monitoring-device.js';

/* ========================================================================== */

const outputWireNameScheme = /z\d{2}/;

/* ========================================================================== */

export function parseInput(input: string): DeviceConfiguration {
	const [initialValues, wiring] = input.split('\n\n');

	// Process the wires which have an initial value.
	const wires = initialValues.split('\n').reduce<Wires>((nodes, line) => {
		const [id, value] = line.split(': ');
		nodes[id] = Number(value);

		return nodes;
	}, {});

	const wireConfiguration: WireConfiguration = {};
	let outputBitCount: number = 0;

	// Iterate over the lines describing a gate and where it outputs its value.
	wiring.split('\n').forEach(line => {
		const [leftWire, gateType, rightWire, , outputWire] = line.split(' ');

		wireConfiguration[outputWire] = { gateType, leftWire, rightWire };
		wires[outputWire] = undefined;

		if (outputWireNameScheme.test(outputWire)) outputBitCount++;
	});

	return {
		outputBitCount,
		wireConfiguration,
		wires,
	};
}
