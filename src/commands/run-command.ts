import {Console} from 'node:console';
import {Command, Option} from 'clipanion';
import {days} from '../days/index.js';
import type {Day} from '../lib/solution.js';
import {getInput, resolveDays} from '../utils/days.js';

interface DaySolution {
	day: number;
	part1: number;
	part2: number;
}

export class RunCommand extends Command {
	static readonly paths = [['run'], ['r'], Command.Default];

	// eslint-disable-next-line new-cap
	static readonly usage = Command.Usage({
		category: 'Days',
		description: `Run the programs for the provided days, or all of them if unspecified`,
		examples: [
			['Run all days', '$0'],
			['Run a given set of days', '$0 1 2'],
		],
	});

	// eslint-disable-next-line new-cap
	readonly days = Option.Rest();

	async execute(): Promise<void> {
		const results: DaySolution[] = await this.runDays();

		new Console(this.context.stdout).table(results);
	}

	private resolveDays(): Map<string, Day> {
		if (this.days.length === 0) {
			return new Map(days);
		}

		return resolveDays(this.days);
	}

	private async runDays() {
		const days = this.resolveDays();

		const results: DaySolution[] = await Promise.all(
			[...days.entries()].map(async ([dayName, day]) => {
				const input = await getInput(dayName);

				const [part1, part2] = await day.solve(input);

				return {day: Number(dayName), part1, part2};
			}),
		);

		return results;
	}
}
