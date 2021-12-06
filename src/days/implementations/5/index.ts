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

	constructor(lines: readonly Line[]) {
		const maximums = this.findMaximums(lines);

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

	drawLine(line: Line, options: {ignoreDiagonal: boolean}): void {
		if (line.start.x === line.end.x) {
			this.drawVerticalLine(line);
			return;
		}

		if (line.start.y === line.end.y) {
			this.drawHorizontalLine(line);
			return;
		}

		if (!options.ignoreDiagonal) {
			this.drawDiagonalLine(line);
		}
	}

	private drawPoint(point: Point): void {
		this.array[point.y][point.x]++;
	}

	private drawVerticalLine(line: Line): void {
		const startY = Math.min(line.start.y, line.end.y);
		const endY = Math.max(line.start.y, line.end.y);

		for (let y = startY; y < endY + 1; y++) {
			this.drawPoint({x: line.start.x, y});
		}
	}

	private drawHorizontalLine(line: Line): void {
		const startX = Math.min(line.start.x, line.end.x);
		const endX = Math.max(line.start.x, line.end.x);

		for (let x = startX; x < endX + 1; x++) {
			this.drawPoint({x, y: line.start.y});
		}
	}

	private drawDiagonalLine(line: Line): void {
		const willGoRight = line.start.x < line.end.x;
		const willGoDown = line.start.y < line.end.y;

		if (willGoRight) {
			if (willGoDown) {
				const diff = line.end.x - line.start.x;

				// Going from top left to bottom right
				for (let i = 0; i < diff + 1; i++) {
					this.drawPoint({x: line.start.x + i, y: line.start.y + i});
				}
			} else {
				// Going from bottom left to top right

				const diff = line.end.x - line.start.x;

				for (let i = 0; i < diff + 1; i++) {
					this.drawPoint({x: line.start.x + i, y: line.start.y - i});
				}
			}
		} else {
			// Going from top right to bottom left or from bottom right to top left

			// Reverse the line, this is fine since the graph is just points
			const newLine = {
				start: line.end,
				end: line.start,
			};

			this.drawDiagonalLine(newLine);
		}
	}

	private findMaximums(lines: readonly Line[]): Point {
		const xs = lines.map(vent => Math.max(vent.start.x, vent.end.x));
		const ys = lines.map(vent => Math.max(vent.start.y, vent.end.y));

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
			ocean.drawLine(vent, {ignoreDiagonal: true});
			oceanWithDiagonals.drawLine(vent, {ignoreDiagonal: false});
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
