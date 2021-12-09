import test from 'ava';
import {Day9} from './index.js';

const input = `2199943210
3987894921
9856789892
8767896789
9899965678`;

test('works', t => {
	const [solution] = new Day9().solve(input);

	t.is(solution, 15);
});
