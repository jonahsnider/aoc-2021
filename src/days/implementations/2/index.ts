import {lines} from '@jonahsnider/util';
import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

enum Direction {
	Forward = 'forward',
	Down = 'down',
	Up = 'up',
}

export class Day2 extends Day {
	solve(input: string): SolutionPair {
		const commands = lines(input).map(line => {
			const split = line.split(' ');

			return {units: Number(split[1]), direction: split[0] as Direction};
		});

		const positions = {
			part1: {
				horizontal: 0,
				depth: 0,
			},
			part2: {
				horizontal: 0,
				depth: 0,
				aim: 0,
			},
		};

		for (const command of commands) {
			switch (command.direction) {
				case Direction.Down:
					positions.part1.depth += command.units;
					positions.part2.aim += command.units;
					break;
				case Direction.Up:
					positions.part1.depth -= command.units;
					positions.part2.aim -= command.units;
					break;
				case Direction.Forward:
					positions.part1.horizontal += command.units;
					positions.part2.horizontal += command.units;
					positions.part2.depth += positions.part2.aim * command.units;

					break;
				default:
					throw new RangeError(`Unknown direction`);
			}
		}

		return [positions.part1.horizontal * positions.part1.depth, positions.part2.horizontal * positions.part2.depth];
	}
}
