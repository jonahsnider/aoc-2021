import test from 'ava';
import {getInput} from '../../../utils/days.js';
import {Day13} from './index.js';

const input = await getInput(13);

test('actual solution', t => {
	const solution = new Day13().solve(input);

	t.deepEqual(solution, [
		942,
		`..##.####..##..#..#..##..###..###..###..
...#....#.#..#.#..#.#..#.#..#.#..#.#..#.
...#...#..#....#..#.#..#.#..#.#..#.###..
...#..#...#.##.#..#.####.###..###..#..#.
#..#.#....#..#.#..#.#..#.#....#.#..#..#.
.##..####..###..##..#..#.#....#..#.###..`,
	]);
});
