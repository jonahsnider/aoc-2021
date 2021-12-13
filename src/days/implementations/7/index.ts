import {frequencyTable} from '@jonahsnider/util';
import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

export class Day7 extends Day {
	solve(input: string): SolutionPair {
		const solution: [part1: number, part2: number] = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY];

		const positions = frequencyTable(input.split(',').map(string => Number(string)));

		let minPosition = Number.POSITIVE_INFINITY;
		let maxPosition = Number.NEGATIVE_INFINITY;

		for (const position of positions.keys()) {
			minPosition = Math.min(minPosition, position);
			maxPosition = Math.max(maxPosition, position);
		}

		const positionsArray = [...positions] as const;

		for (let position = minPosition; position <= maxPosition; position++) {
			let totalDistance = 0;
			let totalFuelCost = 0;

			for (const [otherPosition, quantity] of positionsArray) {
				const distance = this.distance(position, otherPosition) * quantity;
				totalDistance += distance;

				const fuelCost = this.fuelCost(position, otherPosition) * quantity;
				totalFuelCost += fuelCost;
			}

			solution[0] = Math.min(solution[0], totalDistance);
			solution[1] = Math.min(solution[1], totalFuelCost);
		}

		return solution;
	}

	private distance(a: number, b: number): number {
		return Math.abs(a - b);
	}

	private fuelCost(a: number, b: number): number {
		const distance = this.distance(a, b);

		const cost = (distance * (distance + 1)) / 2;

		return cost;
	}
}
