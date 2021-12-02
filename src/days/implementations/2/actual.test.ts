import test from 'ava';
import {getInput} from '../../../utils/days.js';
import {Day2} from './index.js';

const input = await getInput(2);

test('actual solution', t => {
	const solution = new Day2().solve(input);

	t.deepEqual(solution, [2_036_120, 2_015_547_716]);
});
