import test from 'ava';
import {getInput} from '../../../utils/days.js';
import {Day12} from './index.js';

const input = await getInput(12);

test('actual solution', t => {
	const solution = new Day12().solve(input);

	t.deepEqual(solution, [4104, 119_760]);
});
