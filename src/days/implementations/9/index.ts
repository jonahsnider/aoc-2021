import {identical, lines, product, Sort} from '@jonahsnider/util';
import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

type Grid = number[][];

type Point = [y: number, x: number];
type Basin = Point[];

export class Day9 extends Day {
	solve(input: string): SolutionPair {
		const solution: [part1: number, part2: number] = [0, 0];

		const grid: Grid = lines(input).map(line => line.split('').map(digit => Number(digit)));

		const lowPoints: Point[] = [];

		for (let y = 0; y < grid.length; y++) {
			const row = grid[y];

			for (let x = 0; x < row.length; x++) {
				const currentPoint: Point = [y, x];
				const current = this.pointToValue(currentPoint, grid)!;

				const neighbors = this.neighborsForPoint(currentPoint, grid).map(neighbor => this.pointToValue(neighbor, grid)!);

				if (neighbors.every(neighbor => current < neighbor)) {
					solution[0] += current + 1;
					lowPoints.push(currentPoint);
				}
			}
		}

		const basins: Basin[] = lowPoints.map(point => this.pointToBasin(point, grid));

		const basinSizes = basins.map(basin => basin.length);
		basinSizes.sort(Sort.descending);

		const biggestThree = basinSizes.slice(0, 3);
		solution[1] = biggestThree.reduce(product, 1);

		return solution;
	}

	private pointToValue(point: Point, grid: Grid): number | undefined {
		const [y, x] = point;

		return grid[y]?.[x];
	}

	private pointToBasin(startPoint: Point, grid: Grid): Basin {
		const queue: Point[] = [startPoint];
		const resultBasin: Basin = [startPoint];

		for (const point of queue) {
			const pointValue = this.pointToValue(point, grid)!;

			const neighbors = this.neighborsForPoint(point, grid).filter(point => {
				const value = this.pointToValue(point, grid);

				if (
					// Invalid point
					!this.pointExists(point, grid) ||
					// Ignore 9s
					value! === 9 ||
					// Not part of this basin
					value! < pointValue ||
					// Duplicate point
					resultBasin.some(resultPoint => identical(resultPoint, point))
				) {
					return false;
				}

				return true;
			});

			for (const neighbor of neighbors) {
				queue.push(neighbor);
				resultBasin.push(neighbor);
			}
		}

		return resultBasin;
	}

	private pointExists(point: Point, grid: Grid): boolean {
		return this.pointToValue(point, grid) !== undefined;
	}

	private neighborsForPoint(point: Point, grid: Grid): Point[] {
		const [y, x] = point;

		const neighbors: Point[] = [
			// Above
			[y - 1, x],
			// Below
			[y + 1, x],
			// Left
			[y, x - 1],
			// Right
			[y, x + 1],
		];

		return neighbors.filter((neighbor): neighbor is NonNullable<typeof neighbor> => this.pointExists(neighbor, grid));
	}
}
