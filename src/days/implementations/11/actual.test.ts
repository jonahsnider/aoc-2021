import test from 'ava';
import {getInput} from '../../../utils/days.js';
import {Day11} from './index.js';

const input = await getInput(11);

test('actual solution', t => {
	const solution = new Day11().solve(input);

	t.deepEqual(solution, [1717, 476]);
});
