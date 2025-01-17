import { describe, expect, it } from 'vitest';
import { Warehouse } from './warehouse.js';

/* ========================================================================== */

const tests = {
	expanded: {
		create: [
			[
				'#####',
				'#O..#',
				'#.@.#',
				'#..##',
				'#####'
			],
			[
				'##########',
				'##[]....##',
				'##..@...##',
				'##....####',
				'##########',
			]
		]
	},

	nonExpanded: {
		create: [
			[
				'#####',
				'#O..#',
				'#.@.#',
				'#..##',
				'#####'
			]
		],
		moveLeftFree: [
			[
				'#####',
				'#...#',
				'#.O@#',
				'#..##',
				'#####'
			],
			[
				'#####',
				'#...#',
				'#O@.#',
				'#..##',
				'#####'
			]
		]
	}
};

/* ========================================================================== */

describe('2024/15/warehouse-uni', () => {
	describe('Non expanded grid', () => {
		it('should initialize with the given grid', () => {
			const warehouse = Warehouse.createInstance(tests.nonExpanded.create[0]);
			expect(warehouse.toString()).toBe(tests.nonExpanded.create[0].join('\n'));
		});

		describe('pushing left', () => {
			it('should push a box when there is free space', () => {
				const warehouse = Warehouse.createInstance(['..O@']);
				warehouse.moveRobot('<<');
				expect(warehouse.toString()).toBe('O@..');
			});
			it('should push adjoining boxes', () => {
				const warehouse = Warehouse.createInstance(['..O.O@']);
				warehouse.moveRobot('<<<');
				expect(warehouse.toString()).toBe('OO@...');
			});
			it('should stop pushing when there is a wall in the way', () => {
				const warehouse = Warehouse.createInstance(['.#.O@']);
				warehouse.moveRobot('<<');
				expect(warehouse.toString()).toBe('.#O@.');
			});
		});

		describe('push up', () => {
			it('should push a box when there is free space', () => {
				const warehouse = Warehouse.createInstance(['.', 'O', '@']);
				warehouse.moveRobot('^');
				expect(warehouse.toString()).toBe('O\n@\n.');
			});
			it('should push adjoining boxes', () => {
				const warehouse = Warehouse.createInstance(['.', 'O', '.', 'O', '@']);
				warehouse.moveRobot('^^');
				expect(warehouse.toString()).toBe('O\nO\n@\n.\n.');
			});
			it('should stop pushing when there is a wall in the way', () => {
				const warehouse = Warehouse.createInstance(['.', '#', '.', 'O', '@']);
				warehouse.moveRobot('^^');
				expect(warehouse.toString()).toBe('.\n#\nO\n@\n.');
			});
		});
	});

	describe('Expanded grid', () => {
		it('should initialize with the given grid', () => {
			const warehouse = Warehouse.createInstance(tests.expanded.create[0], true);
			expect(warehouse.toString()).toBe(tests.expanded.create[1].join('\n'));
		});
		describe('pushing left', () => {
			it('should push a box when there is free space', () => {
				const warehouse = Warehouse.createInstance(['..O@'], true);
				warehouse.moveRobot('<<');
				expect(warehouse.toString()).toBe('..[]@...');
			});
			it('should push adjoining boxes', () => {
				const warehouse = Warehouse.createInstance(['..O.O@'], true);
				warehouse.moveRobot('<<<');
				expect(warehouse.toString()).toBe('...[][]@....');
			});
			it('should stop pushing when there is a wall in the way', () => {
				const warehouse = Warehouse.createInstance(['.#.O@'], true);
				warehouse.moveRobot('<<<');
				expect(warehouse.toString()).toBe('..##[]@...');
			});
		});
	});
});
