import {Benchmark} from '@jonahsnider/benchmark';
import {toDigits} from '@jonahsnider/util';
import {Command, Option} from 'clipanion';
import convert from 'convert';
import {Console} from 'node:console';
import {fileURLToPath, URL} from 'node:url';
import {days} from '../days/index.js';
import type {Day} from '../lib/solution.js';
import {resolveDays} from '../utils/days.js';

export class BenchmarkCommand extends Command {
	static readonly paths = [['benchmark'], ['b']];

	// eslint-disable-next-line new-cap
	static readonly usage = Command.Usage({
		category: 'Days',
		description: 'Benchmarks the programs for the provided days, or all of them if unspecified',
		examples: [
			['Benchmark all days', '$0'],
			['Benchmark a given set of days', '$0 1 2'],
		],
	});

	// eslint-disable-next-line new-cap
	readonly dayNames = Option.Rest();

	private readonly benchmark = new Benchmark();

	async execute() {
		const dayNames = [...this.resolveDays().keys()];

		const results = await this.benchmarkDays(dayNames);

		const table = [...results].map(([dayName, time]) => ({day: Number(dayName), 'execution time (ms)': time}));

		new Console(this.context.stdout).table(table);
	}

	private async benchmarkDays(dayNames: readonly string[]): Promise<Map<string, number>> {
		await Promise.all(
			dayNames.map(async dayName =>
				this.benchmark.addSuite(
					{
						// This is not the actual suite name
						name: dayName,
						run: () => {
							throw new Error('unreachable');
						},
						filepath: fileURLToPath(new URL(`../lib/benchmark-worker.js`, import.meta.url)) + `?day=${dayName}`,
					},
					{threaded: true},
				),
			),
		);

		const benchmarkResults = await this.benchmark.runSuites();

		const resultsEntries = [...benchmarkResults.entries()];

		resultsEntries.sort(([dayNameA], [dayNameB]) => dayNameA.localeCompare(dayNameB, undefined, {numeric: true}));

		return new Map(resultsEntries.map(([dayName, suiteResults]) => [dayName, toDigits(convert(suiteResults.get('solve')!.percentile(50), 'ns').to('ms'), 2)]));
	}

	private resolveDays(): Map<string, Day> {
		if (this.dayNames.length === 0) {
			return new Map(days);
		}

		return resolveDays(this.dayNames);
	}
}
