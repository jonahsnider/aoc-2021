import {lines, MathMap, Sort, sum} from '@jonahsnider/util';
import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

type RiskLevel = number;

type Route = Set<Point>;

type Grid = Point[][];

class Point {
	neighbors: Point[] = [];

	constructor(public readonly x: number, public readonly y: number, public readonly riskLevel: number) {}
}

export class Day15 extends Day {
	solve(input: string): SolutionPair {
		const solution: SolutionPair = [0, 0];

		const riskLevels: RiskLevel[][] = lines(input).map(line => line.split('').map(Number));
		const grid: Grid = riskLevels.map((row, rowIndex) => row.map((riskLevel, colIndex) => new Point(colIndex, rowIndex, riskLevel)));

		// Setup neighbors, only up left down right
		for (const row of grid) {
			for (const point of row) {
				point.neighbors = [grid[point.y - 1]?.[point.x], grid[point.y + 1]?.[point.x], grid[point.y]?.[point.x - 1], grid[point.y]?.[point.x + 1]];

				point.neighbors = point.neighbors.filter(Boolean);
			}
		}

		const start = grid[0][0];
		const end = grid.at(-1)!.at(-1)!;

		const route = this.aStar(start, end);

		solution[0] = this.checksum(route);

		return solution;
	}

	private reconstructPath(cameFrom: Map<Point, Point>, current: Point): Route {
		const totalPath: Route = new Set([current]);

		while (cameFrom.has(current)) {
			current = cameFrom.get(current)!;
			totalPath.add(current);
		}

		return totalPath;
	}

	private aStar(start: Readonly<Point>, goal: Readonly<Point>): Route {
		const openSet = new Set<Point>([start]);
		const cameFrom = new Map<Point, Point>();

		const gScore = new MathMap(Number.POSITIVE_INFINITY);
		gScore.set(start, 0);

		const fScore = new MathMap(Number.POSITIVE_INFINITY);
		fScore.set(start, this.heuristic(start, goal));

		while (openSet.size > 0) {
			const current = [...openSet].sort(Sort.ascending(x => fScore.get(x)!))[0];

			if (current === goal) {
				return this.reconstructPath(cameFrom, current);
			}

			openSet.delete(current);
			for (const neighbor of current.neighbors) {
				// eslint-disable-next-line @typescript-eslint/naming-convention
				const tentativeGScore = gScore.get(current)! + this.distance(current, neighbor);

				if (tentativeGScore >= gScore.get(neighbor)!) {
					continue;
				}

				cameFrom.set(neighbor, current);
				gScore.set(neighbor, tentativeGScore);
				fScore.set(neighbor, tentativeGScore + this.heuristic(neighbor, goal));

				if (!openSet.has(neighbor)) {
					openSet.add(neighbor);
				}
			}
		}

		throw new RangeError('No path found');
	}

	private heuristic(current: Readonly<Point>, goal: Readonly<Point>): number {
		// Distance and risk level
		return this.distance(current, goal);
	}

	private distance(a: Readonly<Point>, b: Readonly<Point>): number {
		return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + a.riskLevel + b.riskLevel;
	}

	private checksum(route: Readonly<Route>): number {
		// eslint-disable-next-line no-use-extend-native/no-use-extend-native
		const firstRiskLevel = [...route].at(-1)!.riskLevel;

		return [...route].map(point => point.riskLevel).reduce(sum, -firstRiskLevel);
	}
}
