import {sum} from '@jonahsnider/util';
import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

interface BingoCardField {
	value: number;
	checked: boolean;
}

// 5x5
type BingoCard = [
	[BingoCardField, BingoCardField, BingoCardField, BingoCardField, BingoCardField],
	[BingoCardField, BingoCardField, BingoCardField, BingoCardField, BingoCardField],
	[BingoCardField, BingoCardField, BingoCardField, BingoCardField, BingoCardField],
	[BingoCardField, BingoCardField, BingoCardField, BingoCardField, BingoCardField],
	[BingoCardField, BingoCardField, BingoCardField, BingoCardField, BingoCardField],
];

export class Day4 extends Day {
	solve(input: string): SolutionPair {
		const solution: SolutionPair = [0, 0];

		const [rawNumbers, ...rawBingos] = input.split('\n\n');

		const numbers = rawNumbers.split(',').map(x => Number(x));
		const bingoCards = rawBingos.map(x => this.parseBingo(x));
		const winners = new Set<BingoCard>();

		for (const number of numbers) {
			for (const bingoCard of bingoCards) {
				if (winners.size === bingoCards.length) {
					break;
				}

				if (winners.has(bingoCard)) {
					continue;
				}

				this.setNumberChecked(bingoCard, number);

				if (this.bingoIsWinner(bingoCard)) {
					winners.add(bingoCard);

					const unmarkedFields = bingoCard.flat(1).filter(x => !x.checked);
					const unmarked = unmarkedFields.map(x => x.value);
					const unmarkedSum = unmarked.reduce(sum);

					const checksum = unmarkedSum * number;

					solution[0] ||= checksum;
					solution[1] = checksum;
				}
			}
		}

		return solution;
	}

	private setNumberChecked(bingo: BingoCard, number: number): void {
		for (const row of bingo) {
			for (const field of row.filter(field => field.value === number)) {
				field.checked = true;
			}
		}
	}

	private parseBingo(bingo: string): BingoCard {
		const rows = bingo.split('\n');

		const bingoCard: BingoCardField[][] = rows
			.map(row => row.split(' '))
			.map(numberStrings => numberStrings.filter(numberString => numberString.length > 0).map(numberString => Number(numberString)))
			.map(numbers => numbers.map(number => ({value: number, checked: false})));

		return bingoCard as BingoCard;
	}

	// Checks if you win horizontally or vertically
	private bingoIsWinner(bingo: BingoCard): boolean {
		for (const row of bingo) {
			// Check this row
			if (row.every(x => x.checked)) {
				return true;
			}
		}

		for (let i = 0; i < bingo.length; i++) {
			const col = bingo.map(x => x[i]);

			if (col.every(x => x.checked)) {
				return true;
			}
		}

		return false;
	}
}
