import {lines, Sort} from '@jonahsnider/util';
import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

export class Day1 extends Day {
	solve(input: string): SolutionPair {
		const solution: SolutionPair = [0, 0];

		const numbers = lines(input).map(line => Number(line));

		numbers.sort(Sort.ascending);

		for (const a of numbers) {
			for (const b of numbers) {
				if (a + b === 2020) {
					solution[0] = a * b;

					if (solution[1] !== 0) {
						return solution;
					}
				}

				for (const c of numbers) {
					if (a + b + c === 2020) {
						solution[1] = a * b * c;

						if (solution[0] !== 0) {
							return solution;
						}
					}
				}
			}
		}

		// This should only happen when there is bad input
		return solution;
	}
}
