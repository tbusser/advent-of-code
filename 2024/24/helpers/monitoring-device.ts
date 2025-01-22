type Prefix = 'x' | 'y' | 'z';

export type Wires = {
	[wireId: string]: number | undefined;
};

export type GateConfiguration = {
	gateType: string;
	leftWire: string;
	rightWire: string;
};

export type WireConfiguration = {
	[wireId: string]: GateConfiguration;
};

export type DeviceConfiguration = {
	/**
	 * The number of bits in the output number. This is equal to the number of
	 * wires following following the /z\d{2}/ naming schema.
	 */
	outputBitCount: number;

	/**
	 * Each wire is connected to at most 1 output port of a gate. This describes
	 * per wire the configuration of the gate responsible for determining
	 * its value.
	 */
	wireConfiguration: WireConfiguration;

	/**
	 * Per wire its current value.
	 */
	wires: Wires;
};

/* ========================================================================== */

const logicGates = {
	AND: (left: number, right: number) => left === 1 && right === 1 ? 1 : 0,
	OR: (left: number, right: number) => left === 1 || right === 1 ? 1 : 0,
	XOR: (left: number, right: number) => left !== right ? 1 : 0,
};

/* ========================================================================== */

export class MonitoringDevice {
	constructor(configuration: DeviceConfiguration) {
		this.outputBitCount = configuration.outputBitCount;
		this.wires = configuration.wires;
		this.wireConfiguration = configuration.wireConfiguration;
		this.wireIds = Object.keys(this.wireConfiguration);
	}

	/* ---------------------------------------------------------------------- */

	private readonly outputBitCount: number;
	private readonly wireIds: string[];
	private readonly wires: Wires;
	private readonly wireConfiguration: WireConfiguration;

	/* ---------------------------------------------------------------------- */

	private createWireId(index: number, prefix: Prefix = 'z'): string {
		return `${prefix}${(index).toString().padStart(2, '0')}`;
	}

	private findFaultyXorInput(configuration: GateConfiguration): string | null {
		if (
			this.wireConfiguration[configuration.leftWire].gateType === 'OR' &&
			this.wireConfiguration[configuration.rightWire].gateType !== 'XOR'
		) return configuration.rightWire;

		if (
			this.wireConfiguration[configuration.leftWire].gateType !== 'XOR' &&
			this.wireConfiguration[configuration.rightWire].gateType == 'OR'
		) return configuration.leftWire;

		return null;
	}

	/**
	 * When the gate feeding an output wire is not a XOR gate we need to find
	 * the wire which is getting its value from the XOR gate that should be
	 * feeding the output wire.
	 */
	private fixOutputWire(outputWireId: string, wireIndex: number): string[] {
		const ending: string = wireIndex.toString();

		// First find the wire which gets its value from a XOR gate where the
		// input wires are xAA and yAA.
		const xorInputWire = this.wireIds.find(id => (
			this.wireConfiguration[id].gateType === 'XOR' &&
			this.wireConfiguration[id].leftWire.endsWith(ending) &&
			this.wireConfiguration[id].rightWire.endsWith(ending)
		));

		// The input wire should in turn be connected to a wire which gets its
		// value from a XOR gate and one of its input wires is the wire we've
		// just identified. This is the wire which has the configuration that is
		// needed for the output wire.
		const faultyConfiguredWireId = this.wireIds.find(id => (
			this.wireConfiguration[id].gateType === 'XOR' &&
			(
				this.wireConfiguration[id].leftWire === xorInputWire ||
				this.wireConfiguration[id].rightWire === xorInputWire
			)
		));

		this.swapConfiguration(outputWireId, faultyConfiguredWireId);

		return [outputWireId, faultyConfiguredWireId];
	}

	private fixXorWire(faultyConfiguredWireId: string, index: number): string[] {
		const ending: string = index.toString();

		// Find the wire with the configuration needed for the wire which is
		// feeding the XOR gate connected to the zAA wire.
		const wireId = this.wireIds.find(id => (
			this.wireConfiguration[id].gateType === 'XOR' &&
			this.wireConfiguration[id].leftWire.endsWith(ending) &&
			this.wireConfiguration[id].rightWire.endsWith(ending)
		));

		this.swapConfiguration(faultyConfiguredWireId, wireId);

		return [faultyConfiguredWireId, wireId];
	}

	private resolveWireValue(id: string): number {
		// Check if we already have a value for the wire, when there is it is
		// not needed to determine it's value again.
		if (this.wires[id] === undefined) {
			// Get the value for the left and right wire. This will be done
			// recursively until we have a gate where both the input values are
			// known to us.
			const leftValue = this.resolveWireValue(this.wireConfiguration[id].leftWire);
			const rightValue = this.resolveWireValue(this.wireConfiguration[id].rightWire);

			// Store the result of the gate and its input values on the
			// output wire.
			this.wires[id] = logicGates[this.wireConfiguration[id].gateType](leftValue, rightValue);
		}

		return this.wires[id];
	}

	private swapConfiguration(wireA: string, wireB: string) {
		const wireAConfiguration = this.wireConfiguration[wireA];

		this.wireConfiguration[wireA] = this.wireConfiguration[wireB];
		this.wireConfiguration[wireB] = wireAConfiguration;
	}

	/* ---------------------------------------------------------------------- */

	/**
	 * In the configuration of wires there are 2 sorts of errors:
	 * 1) An output wire (zAA) is not getting its value from an XOR gate.
	 * 2) The XOR gate connected to an output wire is not getting one of its
	 *    values from a XOR gate fed by an X and Y input wire.
	 *
	 * This method will find these kind of errors and fixes them.
	 */
	public fixWireConfiguration(): string {
		const fixedWires: string[] = [];

		// The first 2 output wires (z00 and z01) and the very last output wire
		// (z45) have a different schematic than all the other wires. This will
		// test only the "regular" wires.
		for (let index = 2; index < this.outputBitCount - 1; index++) {
			const zId = this.createWireId(index);
			if (this.wireConfiguration[zId].gateType !== 'XOR') {
				fixedWires.push(...this.fixOutputWire(zId, index));

				continue;
			}

			// Check if one of the two wires providing input values to the XOR
			// gate has the wrong configuration.
			const wireId = this.findFaultyXorInput(this.wireConfiguration[zId]);
			if (wireId !== null) fixedWires.push(...this.fixXorWire(wireId, index));
		}

		return fixedWires.sort().join(',');
	}

	public getNumber(prefix: Prefix): number {
		const ubound = prefix === 'z' ? this.outputBitCount : this.outputBitCount - 1;
		const result: number[] = new Array(ubound);

		for (let index = 1; index <= ubound; index++) {
			result[this.outputBitCount - index] = this.wires[this.createWireId(index - 1, prefix)];
		}

		return parseInt(result.join(''), 2);
	}

	/**
	 * Resolves the value for all the wires in the machine.
	 */
	public resolveAllWires() {
		// Iterate over all the output wires and for each one get its value.
		for (let index = 0; index <= this.outputBitCount - 1; index++) {
			this.resolveWireValue(this.createWireId(index));
		}
	}
}
