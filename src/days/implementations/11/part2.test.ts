import test from 'ava';
import {Day11} from './index.js';

const input = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

test('works', t => {
	const [, solution] = new Day11().solve(input);

	t.is(solution, 195);
});
