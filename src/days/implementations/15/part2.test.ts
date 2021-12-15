import test from 'ava';
import {Day15} from './index.js';

const input = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

test.skip('works', t => {
	const [, solution] = new Day15().solve(input);

	t.is(solution, 315);
});
