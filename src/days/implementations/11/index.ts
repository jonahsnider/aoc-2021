import {lines, sum} from '@jonahsnider/util';
import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

class Octopus {
	hasFlashed = false;
	flashCount = 0;
	neighbors: Octopus[] = [];

	constructor(private energyLevel: number) {}

	toString(): string {
		return this.energyLevel.toString();
	}

	tick(): void {
		this.energyLevel++;
	}

	afterTick(): void {
		if (this.shouldFlash()) {
			this.flash();
		}
	}

	afterAfterTick(): void {
		if (this.hasFlashed) {
			this.hasFlashed = false;
			this.energyLevel = 0;
		}
	}

	protected shouldFlash(): boolean {
		return this.energyLevel > 9 && !this.hasFlashed;
	}

	private flash() {
		this.hasFlashed = true;
		this.flashCount++;

		for (const neighbor of this.neighbors) {
			neighbor.energyLevel++;

			if (neighbor.shouldFlash()) {
				neighbor.flash();
			}
		}
	}
}

class Grid {
	public readonly octopi: readonly Octopus[];

	constructor(private readonly data: readonly Octopus[][]) {
		this.octopi = this.data.flat();
	}

	toString(): string {
		return this.data.map(row => row.join('')).join('\n');
	}

	tick(): void {
		for (const octopus of this.octopi) {
			octopus.tick();
		}

		for (const octopus of this.octopi) {
			octopus.afterTick();
		}
	}

	afterTick(): void {
		for (const octopus of this.octopi) {
			octopus.afterAfterTick();
		}
	}

	get everyoneFlashed(): boolean {
		return this.data.every(row => row.every(x => x.hasFlashed));
	}

	get flashCount(): number {
		return this.octopi.map(x => x.flashCount).reduce(sum, 0);
	}
}

export class Day11 extends Day {
	solve(input: string): SolutionPair {
		const solution: SolutionPair = [0, 0];

		const rawGrid = lines(input).map(line => line.split('').map(x => new Octopus(Number(x))));

		// Setup neighbors
		for (let y = 0; y < rawGrid.length; y++) {
			for (let x = 0; x < rawGrid[y].length; x++) {
				for (let yy = -1; yy <= 1; yy++) {
					for (let xx = -1; xx <= 1; xx++) {
						if (yy === 0 && xx === 0) {
							continue;
						}

						const nx = x + xx;
						const ny = y + yy;

						if (nx < 0 || nx >= rawGrid[y].length || ny < 0 || ny >= rawGrid.length) {
							continue;
						}

						rawGrid[y][x].neighbors.push(rawGrid[ny][nx]);
					}
				}
			}
		}

		const grid = new Grid(rawGrid);

		let i = 0;
		for (;;) {
			i++;

			grid.tick();

			if (grid.everyoneFlashed) {
				solution[1] = i;
				break;
			}

			grid.afterTick();

			if (i === 100) {
				solution[0] = grid.flashCount;
			}
		}

		return solution;
	}
}
