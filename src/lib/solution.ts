import type {SolutionPair} from './types.js';

export abstract class Day {
	abstract solve(input: string): SolutionPair | PromiseLike<SolutionPair>;
}
