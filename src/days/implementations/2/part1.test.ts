import test from 'ava';
import {Day2} from './index.js';

const input = `forward 5
down 5
forward 8
up 3
down 8
forward 2`;

test('works', t => {
	const [solution] = new Day2().solve(input);

	t.is(solution, 150);
});
