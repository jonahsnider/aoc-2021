import test from 'ava';
import {getInput} from '../../../utils/days.js';
import {Day1} from './index.js';

const input = await getInput(1);

test('actual solution', t => {
	const solution = new Day1().solve(input);

	t.snapshot(solution);
});
