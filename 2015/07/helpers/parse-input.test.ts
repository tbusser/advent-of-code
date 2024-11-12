import { describe, expect, it } from 'vitest';

import { parseInput } from './parse-input.js';

/* ========================================================================== */

describe('2015/07', () => {
	describe('parseInput', () => {
		it('should correctly parse an assignment instruction', () => {
			expect(parseInput('123 -> x')).toEqual([
				{ type: 'assignment', input: 123, output: 'x' }
			]);
			expect(parseInput('123 -> xy')).toEqual([
				{ type: 'assignment', input: 123, output: 'xy' }
			]);
			expect(parseInput('x -> y')).toEqual([
				{ type: 'assignment', input: 'x', output: 'y' }
			]);
			expect(parseInput('xy -> a')).toEqual([
				{ type: 'assignment', input: 'xy', output: 'a' }
			]);
			expect(parseInput('x -> ab')).toEqual([
				{ type: 'assignment', input: 'x', output: 'ab' }
			]);
			expect(parseInput('xy -> ab')).toEqual([
				{ type: 'assignment', input: 'xy', output: 'ab' }
			]);
		});

		it('should correctly parse an AND instruction', () => {
			expect(parseInput('x AND y -> d')).toEqual(
				[{ type: 'and', input: ['x', 'y'], output: 'd' }]
			);
			expect(parseInput('xy AND y -> d')).toEqual(
				[{ type: 'and', input: ['xy', 'y'], output: 'd' }]
			);
			expect(parseInput('x AND yz -> d')).toEqual(
				[{ type: 'and', input: ['x', 'yz'], output: 'd' }]
			);
			expect(parseInput('x AND y -> de')).toEqual(
				[{ type: 'and', input: ['x', 'y'], output: 'de' }]
			);
			expect(parseInput('1 AND y -> de')).toEqual(
				[{ type: 'and', input: [1, 'y'], output: 'de' }]
			);
		});

		it('should correctly parse an OR instruction', () => {
			expect(parseInput('x OR y -> d')).toEqual(
				[{ type: 'or', input: ['x', 'y'], output: 'd' }]
			);
			expect(parseInput('xy OR y -> d')).toEqual(
				[{ type: 'or', input: ['xy', 'y'], output: 'd' }]
			);
			expect(parseInput('x OR yz -> d')).toEqual(
				[{ type: 'or', input: ['x', 'yz'], output: 'd' }]
			);
			expect(parseInput('x OR y -> de')).toEqual(
				[{ type: 'or', input: ['x', 'y'], output: 'de' }]
			);
		});

		it('should correctly parse a left shift instruction', () => {
			expect(parseInput('x LSHIFT 2 -> f')).toEqual([
				{ type: 'lshift', input: 'x', positions: 2, output: 'f' }
			]);
			expect(parseInput('xy LSHIFT 2 -> f')).toEqual([
				{ type: 'lshift', input: 'xy', positions: 2, output: 'f' }
			]);
			expect(parseInput('x LSHIFT 201 -> f')).toEqual([
				{ type: 'lshift', input: 'x', positions: 201, output: 'f' }
			]);
			expect(parseInput('x LSHIFT 2 -> fg')).toEqual([
				{ type: 'lshift', input: 'x', positions: 2, output: 'fg' }
			]);
		});

		it('should correctly parse a right shift instruction', () => {
			expect(parseInput('x RSHIFT 2 -> f')).toEqual([
				{ type: 'rshift', input: 'x', positions: 2, output: 'f' }
			]);
			expect(parseInput('xy RSHIFT 2 -> f')).toEqual([
				{ type: 'rshift', input: 'xy', positions: 2, output: 'f' }
			]);
			expect(parseInput('x RSHIFT 201 -> f')).toEqual([
				{ type: 'rshift', input: 'x', positions: 201, output: 'f' }
			]);
			expect(parseInput('x RSHIFT 2 -> fg')).toEqual([
				{ type: 'rshift', input: 'x', positions: 2, output: 'fg' }
			]);
		});

		it('should correctly parse a bitwise complement instruction', () => {
			expect(parseInput('NOT x -> h')).toEqual([
				{ type: 'not', input: 'x', output: 'h' }
			]);
			expect(parseInput('NOT xy -> h')).toEqual([
				{ type: 'not', input: 'xy', output: 'h' }
			]);
			expect(parseInput('NOT x -> hi')).toEqual([
				{ type: 'not', input: 'x', output: 'hi' }
			]);
		});
	});
});
