import test from 'ava';
import {getInput} from '../../../utils/days.js';
import {Day4} from './index.js';

const input = await getInput(4);

test('actual solution', t => {
	const solution = new Day4().solve(input);

	t.deepEqual(solution, [89_001, 7296]);
});
