import test from 'ava';
import {Day3} from './index.js';

const input = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

test('works', t => {
	const [, solution] = new Day3().solve(input);

	t.is(solution, 230);
});
