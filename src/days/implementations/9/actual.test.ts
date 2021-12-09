import test from 'ava';
import {getInput} from '../../../utils/days.js';
import {Day9} from './index.js';

const input = await getInput(9);

test('actual solution', t => {
	const solution = new Day9().solve(input);

	t.deepEqual(solution, [508, 1_564_640]);
});
