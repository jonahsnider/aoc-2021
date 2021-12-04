import assert from 'node:assert/strict';
import {lines} from '@jonahsnider/util';
import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

export class Day999 extends Day {
	solve(input: string): SolutionPair {
		const solution: SolutionPair = [0, 0];

		const numbers = lines(input).map(line => Number(line));

		for (const number of numbers) {
			assert(number);
		}

		return solution;
	}
}
