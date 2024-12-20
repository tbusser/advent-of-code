import { describe, expect, it } from 'vitest';
import { ChronospatialComputer } from './chronospatial-computer.js';

describe('2024/17', () => {
	describe('chronospatial-computer', () => {
		it('Should generate the correct output for example 1', () => {
			const computer = new ChronospatialComputer({ a: 0, b: 0, c: 9 });
			computer.runProgram([2, 6]);
			expect(computer.getRegisterValue('b')).toBe(1);
		});

		it('Should generate the correct output for example 2', () => {
			const computer = new ChronospatialComputer({ a: 10, b: 0, c: 0 });
			const output = computer.runProgram([5, 0, 5, 1, 5, 4]);
			expect(output).toEqual('0,1,2');
		});

		it('Should generate the correct output for example 3', () => {
			const computer = new ChronospatialComputer({ a: 2024, b: 0, c: 0 });
			const output = computer.runProgram([0, 1, 5, 4, 3, 0]);
			expect(output).toBe('4,2,5,6,7,7,7,7,3,1,0');
			expect(computer.getRegisterValue('a')).toBe(0);
		});

		it('Should generate the correct output for example 4', () => {
			const computer = new ChronospatialComputer({ a: 0, b: 29, c: 0 });
			computer.runProgram([1, 7]);
			expect(computer.getRegisterValue('b')).toBe(26);
		});

		it('Should generate the correct output for example 5', () => {
			const computer = new ChronospatialComputer({ a: 0, b: 2024, c: 43690 });
			computer.runProgram([4, 0]);
			expect(computer.getRegisterValue('b')).toBe(44354);
		});
	});
});
