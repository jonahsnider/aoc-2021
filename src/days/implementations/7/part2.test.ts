import test from 'ava';
import {Day7} from './index.js';

const input = '16,1,2,0,4,2,7,1,2,14';

test('works', t => {
	const [, solution] = new Day7().solve(input);

	t.is(solution, 168);
});
