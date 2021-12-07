import test from 'ava';
import {getInput} from '../../../utils/days.js';
import {Day7} from './index.js';

const input = await getInput(7);

test('actual solution', t => {
	const solution = new Day7().solve(input);

	t.deepEqual(solution, [347_509, 98_257_206]);
});
