import test from 'ava';
import {getInput} from '../../../utils/days.js';
import {Day15} from './index.js';

const input = await getInput(15);

test('actual solution', t => {
	const solution = new Day15().solve(input);

	t.deepEqual(solution, [685, 0]);
});
