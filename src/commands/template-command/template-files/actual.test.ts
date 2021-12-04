import test from 'ava';
import {getInput} from '../../../utils/days.js';
import {Day999} from './index.js';

const input = await getInput(999);

test('actual solution', t => {
	const solution = new Day999().solve(input);

	t.deepEqual(solution, [0, 0]);
});
