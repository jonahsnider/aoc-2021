import assert from 'node:assert/strict';
import {fill, lines, max} from '@jonahsnider/util';
import type {ReadonlyDeep} from 'type-fest';
import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

type Axis = 'x' | 'y';

interface Fold {
	axis: Axis;
	position: number;
}

type Grid = boolean[][];

export class Day13 extends Day {
	solve(input: string): SolutionPair {
		const solution: [part1: number, part2: string] = [0, ''];

		const [rawDotPairs, rawFolds] = input.split('\n\n');

		const dotPairs = lines(rawDotPairs).map(line => line.split(',').map(Number) as [x: number, y: number]);
		const folds: Fold[] = lines(rawFolds).map(line => {
			const [axis, rawAmount] = line.slice('fold along '.length).split('=') as [Axis, `${number}`];

			return {
				axis,
				position: Number(rawAmount),
			};
		});

		let grid: Grid = [];

		let maxX = dotPairs.map(([x]) => x).reduce(max, 0);
		let maxY = dotPairs.map(([, y]) => y).reduce(max, 0);

		for (let y = 0; y <= maxY; y++) {
			grid[y] = fill(false, maxX + 1);
		}

		for (const [x, y] of dotPairs) {
			grid[y][x] = true;
		}

		let hasRunFirst = false;
		for (const fold of folds) {
			[maxX, maxY] = this.gridDimensions(grid);

			if (fold.axis === 'x') {
				for (let y = 0; y < maxY; y++) {
					const row = grid[y];
					const leftSide = row.slice(0, fold.position);
					const rightSide = row.slice(fold.position + 1).reverse();

					grid[y] = this.mergeBooleanArrays(leftSide, rightSide);
				}
			} else {
				for (let x = 0; x < maxX; x++) {
					const column = grid.map(row => row[x]);
					const bottomSide = column.slice(0, fold.position);
					const topSide = column.slice(fold.position + 1).reverse();

					const merged = this.mergeBooleanArrays(bottomSide, topSide);
					for (let y = 0; y < bottomSide.length; y++) {
						grid[y][x] = merged[y];
					}
				}
			}

			grid = fold.axis === 'x' ? this.truncateGridToDimensions(grid, fold.position, maxY) : this.truncateGridToDimensions(grid, maxX, fold.position);

			if (!hasRunFirst) {
				hasRunFirst = true;

				solution[0] = grid.flat().filter(x => x).length;
			}
		}

		solution[1] = this.stringifyGrid(grid);

		return solution;
	}

	private stringifyGrid(grid: ReadonlyDeep<Grid>): string {
		return grid.map(row => this.stringifyRow(row)).join('\n');
	}

	private stringifyRow(row: readonly boolean[]): string {
		return row.map(x => (x ? '#' : '.')).join('');
	}

	private truncateGridToDimensions(grid: ReadonlyDeep<Grid>, maxX: number, maxY: number): Grid {
		const newGrid: Grid = [];

		for (let y = 0; y < maxY; y++) {
			newGrid[y] = grid[y].slice(0, maxX);
		}

		return newGrid;
	}

	private gridDimensions(grid: ReadonlyDeep<Grid>): [x: number, y: number] {
		return [grid[0].length, grid.length];
	}

	private mergeBooleanArrays(a: readonly boolean[], b: readonly boolean[]): boolean[] {
		const result: boolean[] = [];

		assert.strictEqual(a.length, b.length);

		// eslint-disable-next-line unicorn/no-for-loop
		for (let i = 0; i < a.length; i++) {
			result[i] = a[i] || b[i];
		}

		return result;
	}
}
