import test from 'ava';
import {Day6} from './index.js';

const input = '3,4,3,1,2';

test('works', t => {
	const [, solution] = new Day6().solve(input);

	t.is(solution, 26_984_457_539);
});
