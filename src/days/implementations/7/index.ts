import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

export class Day7 extends Day {
	solve(input: string): SolutionPair {
		const solution: SolutionPair = [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY];

		// Using a frequency table here is faster from a theoretical perspective
		// Instead of processing [2, 2, 2, 2, 2] as 5 iterations you can do [[2, 5]] as 1 iteration
		// In reality this adds about 6 milliseconds to the execution time with the actual input of 1000 numbers (~600 unique)
		// For much larger input sizes you should use the frequency table approach
		const positions = input.split(',').map(string => Number(string));

		let minPosition = Number.POSITIVE_INFINITY;
		let maxPosition = Number.NEGATIVE_INFINITY;

		for (const position of new Set(positions)) {
			minPosition = Math.min(minPosition, position);
			maxPosition = Math.max(maxPosition, position);
		}

		for (let position = minPosition; position <= maxPosition; position++) {
			let totalDistance = 0;
			let totalFuelCost = 0;

			for (const otherPosition of positions) {
				const distance = this.distance(position, otherPosition);
				totalDistance += distance;

				const fuelCost = this.fuelCost(position, otherPosition);
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
