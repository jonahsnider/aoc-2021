import test from 'ava';
import {Day999} from './index.js';

const input = 'REPLACEME';

test('works', t => {
	const [, solution] = new Day999().solve(input);

	t.is(solution, 123);
});
