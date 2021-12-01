import test from 'ava';
import {Day1} from './index.js';

const input = `199
200
208
210
200
207
240
269
260
263`;

test('works', t => {
	const [, solution] = new Day1().solve(input);

	t.is(solution, 5);
});
