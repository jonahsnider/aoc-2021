import {min, Sort} from '@jonahsnider/util';
import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

export class Day7 extends Day {
	solve(input: string): SolutionPair {
		const positions = input.split(',').map(string => Number(string));

		const distanceForPosition: Map<number, number> = new Map();
		const fuelCostForPosition: Map<number, number> = new Map();

		positions.sort(Sort.ascending);

		const [minPosition] = positions;
		const maxPosition = positions.at(-1)!;

		for (let position = minPosition; position <= maxPosition; position++) {
			for (const otherPosition of positions) {
				const distance = this.distance(position, otherPosition);
				distanceForPosition.set(position, (distanceForPosition.get(position) ?? 0) + distance);

				const fuelCost = this.fuelCost(position, otherPosition);
				fuelCostForPosition.set(position, (fuelCostForPosition.get(position) ?? 0) + fuelCost);
			}
		}

		const shortestDistance = [...distanceForPosition.values()].reduce(min);
		const smallestFuelCost = [...fuelCostForPosition.values()].reduce(min);

		return [shortestDistance, smallestFuelCost];
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
