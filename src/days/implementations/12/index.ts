import {count, frequencyTable, lines} from '@jonahsnider/util';
import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

enum CaveSize {
	Small = 'small',
	Big = 'big',
	Special = 'special',
}

class Cave {
	public readonly size: CaveSize;
	public readonly neighbours: Cave[] = [];

	constructor(public readonly id: string | 'start' | 'end') {
		if (id === 'start' || id === 'end') {
			this.size = CaveSize.Special;
		} else {
			this.size = id.toLowerCase() === id ? CaveSize.Small : CaveSize.Big;
		}
	}

	toString(): string {
		return this.id;
	}
}

class Path {
	private readonly visited: Set<Cave> = new Set();

	constructor(public readonly route: Cave[], private readonly end: Cave) {
		for (const cave of route) {
			this.visited.add(cave);
		}
	}

	toString(): string {
		return this.route.join(',');
	}

	get isDone(): boolean {
		return this.visited.has(this.end);
	}

	get current(): Cave {
		return this.route.at(-1)!;
	}

	get nextCaves(): Cave[] {
		return this.current.neighbours.filter(cave => (cave.size === CaveSize.Big ? true : !this.visited.has(cave)));
	}

	get nextCavesPt2(): Cave[] {
		const numberOfSmallCavesVisitedTwice = count(frequencyTable(this.route), ([cave, count]) => cave.size === CaveSize.Small && count >= 2);
		const didVisitSmallCaveTwice = numberOfSmallCavesVisitedTwice > 0;

		return this.current.neighbours.filter(cave => {
			if (cave.id === 'start') {
				return false;
			}

			if (cave.size === CaveSize.Small && this.visited.has(cave)) {
				return !didVisitSmallCaveTwice;
			}

			return true;
		});
	}
}

export class Day12 extends Day {
	get skipBenchmarks() {
		return true;
	}

	private readonly graph = new Map<string, Cave>();

	solve(input: string): SolutionPair {
		const solution: [part1: number, part2: number] = [0, 0];

		const rawPaths = lines(input).map(line => line.split('-') as [from: string, to: string]);

		for (const [fromId, toId] of rawPaths) {
			const from = this.graph.get(fromId) ?? new Cave(fromId);
			const to = this.graph.get(toId) ?? new Cave(toId);

			from.neighbours.push(to);
			to.neighbours.push(from);

			this.graph.set(fromId, from);
			this.graph.set(toId, to);
		}

		const start = this.graph.get('start')!;
		const end = this.graph.get('end')!;

		const pathsPt1: Path[] = [new Path([start], end)];
		const pathsPt2: Path[] = [new Path([start], end)];

		while (pathsPt1.length > 0) {
			const path = pathsPt1.pop()!;

			if (path.isDone) {
				solution[0]++;
				continue;
			}

			for (const nextCave of path.nextCaves) {
				pathsPt1.push(new Path([...path.route, nextCave], end));
			}
		}

		while (pathsPt2.length > 0) {
			const path = pathsPt2.pop()!;

			if (path.isDone) {
				solution[1]++;
				continue;
			}

			for (const nextCave of path.nextCavesPt2) {
				pathsPt2.push(new Path([...path.route, nextCave], end));
			}
		}

		return solution;
	}
}
