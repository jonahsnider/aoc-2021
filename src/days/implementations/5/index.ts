import {fill, lines} from '@jonahsnider/util';
import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

interface Point {
	x: number;
	y: number;
}

interface Line {
	start: Point;
	end: Point;
}

class Ocean {
	// Upper left corner is (0, 0), lower right corner is (maxX, maxY)
	private readonly array: number[][] = [];

	constructor(vents: readonly Line[]) {
		const maximums = this.findMaximums(vents);

		for (let y = 0; y < maximums.y; y++) {
			this.array[y] = fill(0, maximums.x);
		}
	}

	toString(): string {
		return this.array.map(row => row.map(overlaps => (overlaps === 0 ? '.' : overlaps)).join('')).join('\n');
	}

	countOverlaps(): number {
		let count = 0;

		for (const row of this.array) {
			for (const overlaps of row) {
				if (overlaps > 1) {
					count++;
				}
			}
		}

		return count;
	}

	drawLine(vent: Line, options: {diagonal: boolean}): void {
		if (vent.start.x === vent.end.x) {
			this.drawVerticalLine(vent);
			return;
		}

		if (vent.start.y === vent.end.y) {
			this.drawHorizontalLine(vent);
			return;
		}

		if (options.diagonal) {
			this.drawDiagonalLine(vent);
		}
	}

	private drawPoint(point: Point): void {
		this.array[point.y][point.x]++;
	}

	private drawVerticalLine(vent: Line): void {
		const startY = Math.min(vent.start.y, vent.end.y);
		const endY = Math.max(vent.start.y, vent.end.y);

		for (let y = startY; y < endY + 1; y++) {
			this.drawPoint({x: vent.start.x, y});
		}
	}

	private drawDiagonalLine(vent: Line): void {
		const points: Point[] = [];

		const willGoRight = vent.start.x < vent.end.x;
		const willGoUp = vent.start.y < vent.end.y;

		if (willGoRight) {
			if (willGoUp) {
				console.log(vent.start, '->', vent.end, 'Going from top left to bottom right');
				// Going from top left to bottom right
				for (let i = vent.start.x; i < vent.end.x + 1; i++) {
					points.push({x: i, y: vent.start.y + i});
				}
			} else {
				console.log(vent.start, '->', vent.end, 'Going from bottom left to top right');
				// Going from bottom left to top right

				for (let i = vent.start.x; i < vent.end.x + 1; i++) {
					const xDiff = vent.start.x - i;

					points.push({x: i, y: vent.start.y + xDiff});
				}
			}
		} else if (willGoUp) {
			// Going from top right to bottom left
			console.log(vent.start, '->', vent.end, 'Going from top right to bottom left');

			const newVent = {
				start: vent.end,
				end: vent.start,
			};

			this.drawDiagonalLine(newVent);
		} else {
			console.log(vent.start, '->', vent.end, 'Going from bottom right to top left');
			// Going from bottom right to top left

			const newVent = {
				start: vent.end,
				end: vent.start,
			};

			this.drawDiagonalLine(newVent);
		}

		// Deduplicate points, this is almost certainly unnecessary - log the lengths to find out
		const uniquePoints = points.filter((point, index, self) => {
			return self.find(other => other.x === point.x && other.y === point.y) === point;
		});

		for (const point of uniquePoints) {
			this.drawPoint(point);
		}
	}

	private drawHorizontalLine(vent: Line): void {
		const startX = Math.min(vent.start.x, vent.end.x);
		const endX = Math.max(vent.start.x, vent.end.x);

		for (let x = startX; x < endX + 1; x++) {
			this.drawPoint({x, y: vent.start.y});
		}
	}

	private findMaximums(vents: readonly Line[]): Point {
		const xs = vents.map(vent => Math.max(vent.start.x, vent.end.x));
		const ys = vents.map(vent => Math.max(vent.start.y, vent.end.y));

		const xMax = Math.max(...xs);
		const yMax = Math.max(...ys);

		return {x: xMax + 1, y: yMax + 1};
	}
}

export class Day5 extends Day {
	solve(input: string): SolutionPair {
		const vents = lines(input).map(line => this.parseVent(line));

		const ocean = new Ocean(vents);
		const oceanWithDiagonals = new Ocean(vents);

		for (const vent of vents) {
			ocean.drawLine(vent, {diagonal: false});
			oceanWithDiagonals.drawLine(vent, {diagonal: true});
		}

		return [ocean.countOverlaps(), oceanWithDiagonals.countOverlaps()];
	}

	private parseVent(input: string): Line {
		const [startPointRaw, endPointRaw] = input.split(' -> ');

		return {
			start: this.parsePoint(startPointRaw),
			end: this.parsePoint(endPointRaw),
		};
	}

	private parsePoint(input: string): Point {
		const [x, y] = input.split(',').map(Number);

		return {x, y};
	}
}
