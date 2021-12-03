import assert from 'node:assert/strict';
import {enumHas, lines} from '@jonahsnider/util';
import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

enum Direction {
	Up = 'up',
	Down = 'down',
	Forward = 'forward',
}

interface Command {
	direction: Direction;
	units: number;
}

export class Day2 extends Day {
	solve(input: string): SolutionPair {
		const commands = lines(input).map(line => this.parseCommand(line));

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
				case Direction.Up:
					positions.part1.depth -= command.units;

					positions.part2.aim -= command.units;

					break;
				case Direction.Down:
					positions.part1.depth += command.units;

					positions.part2.aim += command.units;

					break;
				case Direction.Forward:
					positions.part1.horizontal += command.units;

					positions.part2.horizontal += command.units;
					positions.part2.depth += positions.part2.aim * command.units;

					break;
				default:
				// Unreachable
			}
		}

		return [this.checksum(positions.part1), this.checksum(positions.part2)];
	}

	private parseCommand(command: string): Command {
		const [direction, units] = command.split(' ');

		assert(enumHas(Direction, direction), new RangeError(`Unknown direction: ${direction}`));

		return {direction, units: Number(units)};
	}

	private checksum(position: {horizontal: number; depth: number}): number {
		return position.horizontal * position.depth;
	}
}
