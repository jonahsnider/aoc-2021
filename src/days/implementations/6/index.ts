import {frequencyTable, sum} from '@jonahsnider/util';
import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

type LanternFishTimer = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

class LanternFishies {
	/** Frequency table. */
	private readonly population = new Map<LanternFishTimer, number>();

	constructor(timerIterable: Iterable<LanternFishTimer>) {
		const timers = frequencyTable(timerIterable);

		for (let i = 0; i <= 8; i++) {
			this.population.set(i as LanternFishTimer, timers.get(i as LanternFishTimer) ?? 0);
		}

		for (const [timer, count] of timers) {
			this.population.set(timer, count);
		}
	}

	tick() {
		const population = [...this.population] as Array<[LanternFishTimer, number]>;

		population.reverse();

		for (const [timer, count] of population) {
			if (timer === 0) {
				this.addPopulation(6, count);
				this.addPopulation(8, count);
				this.addPopulation(0, -count);
			} else {
				this.addPopulation((timer - 1) as LanternFishTimer, count);
				this.addPopulation(timer, -count);
			}
		}
	}

	private addPopulation(timer: LanternFishTimer, amount: number) {
		this.population.set(timer, (this.population.get(timer) ?? 0) + amount);
	}

	get totalPopulation() {
		return [...this.population.values()].reduce(sum, 0);
	}
}

export class Day6 extends Day {
	solve(input: string): SolutionPair {
		const lanternFishTimers = input.split(',').map(line => Number(line) as LanternFishTimer);

		const lanternFishiesPart1 = new LanternFishies(lanternFishTimers);
		const lanternFishiesPart2 = new LanternFishies(lanternFishTimers);

		for (let i = 0; i < 80; i++) {
			lanternFishiesPart1.tick();
		}

		for (let i = 0; i < 256; i++) {
			lanternFishiesPart2.tick();
		}

		return [lanternFishiesPart1.totalPopulation, lanternFishiesPart2.totalPopulation];
	}
}
