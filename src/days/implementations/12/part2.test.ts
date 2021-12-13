import test from 'ava';
import {Day12} from './index.js';

const input = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

test('works', t => {
	const [, solution] = new Day12().solve(input);

	t.is(solution, 36);
});
