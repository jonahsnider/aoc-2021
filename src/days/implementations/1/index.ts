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
			const c = numbers[i - 2];
			const d = numbers[i - 3];

			if (a > b) {
				solution[0]++;
			}

			if (a && b && c && d) {
				const previousSum = b + c + d;
				const curSum = a + b + c;

				if (curSum > previousSum) {
					solution[1]++;
				}
			}
		}

		// This should only happen when there is bad input
		return solution;
	}
}
