import test from 'ava';
import {Day1} from './index.js';

const input = `1721
979
366
299
675
1456`;

test('works', t => {
	const [solution] = new Day1().solve(input);

	t.is(solution, 514_579);
});
