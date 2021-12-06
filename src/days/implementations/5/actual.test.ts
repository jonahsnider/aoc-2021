import test from 'ava';
import {getInput} from '../../../utils/days.js';
import {Day5} from './index.js';

const input = await getInput(5);

test('actual solution', t => {
	const solution = new Day5().solve(input);

	t.deepEqual(solution, [5169, 22_083]);
});
