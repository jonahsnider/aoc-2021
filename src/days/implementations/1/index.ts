import {lines} from '@jonahsnider/util';
import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

export class Day1 extends Day {
	solve(input: string): SolutionPair {
		const solution: SolutionPair = [0, 0];

		const numbers = lines(input).map(line => Number(line));

		for (let i = 1; i < numbers.length; i++) {
			const a = numbers[i];
			const b = numbers[i - 1];

			if (a > b) {
				solution[0]++;
			}

			if (i > 2) {
				const c = numbers[i - 2];
				const d = numbers[i - 3];

				const sharedSum = b + c;
				const previousSum = sharedSum + d;
				const currentSum = a + sharedSum;

				if (currentSum > previousSum) {
					solution[1]++;
				}
			}
		}

		return solution;
	}
}
