import test from 'ava';
import {getInput} from '../../../utils/days.js';
import {Day6} from './index.js';

const input = await getInput(6);

test('actual solution', t => {
	const solution = new Day6().solve(input);

	t.deepEqual(solution, [374_927, 1_687_617_803_407]);
});
