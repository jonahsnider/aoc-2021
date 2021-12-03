import test from 'ava';
import {getInput} from '../../../utils/days.js';
import {Day3} from './index.js';

const input = await getInput(3);

test('actual solution', t => {
	const solution = new Day3().solve(input);

	t.deepEqual(solution, [3_885_894, 4_375_225]);
});
