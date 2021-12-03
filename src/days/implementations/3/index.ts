import assert from 'node:assert/strict';
import {count, lines} from '@jonahsnider/util';
import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

type Binary = '1' | '0';

const ZERO_MOST_COMMON = {mostCommon: '0', leastCommon: '1'} as const;
const ONE_MOST_COMMON = {mostCommon: '1', leastCommon: '0'} as const;

export class Day3 extends Day {
	solve(input: string): SolutionPair {
		const binaryStrings = lines(input);

		const LINE_LENGTH = binaryStrings[0].length;

		let gamma = '';
		let epsilon = '';

		for (let columnIndex = 0; columnIndex < LINE_LENGTH; columnIndex++) {
			const {mostCommon, leastCommon} = this.binaryFrequencyForColumn(binaryStrings, columnIndex);

			gamma += mostCommon;
			epsilon += leastCommon;
		}

		let oxygenBinaryStrings = [...binaryStrings];
		let co2BinaryStrings = [...binaryStrings];
		for (let columnIndex = 0; columnIndex < LINE_LENGTH; columnIndex++) {
			if (co2BinaryStrings.length === 1 && oxygenBinaryStrings.length === 1) {
				break;
			}

			if (oxygenBinaryStrings.length > 1) {
				const oxygenFrequencies = this.binaryFrequencyForColumn(oxygenBinaryStrings, columnIndex);
				oxygenBinaryStrings = oxygenBinaryStrings.filter(x => x[columnIndex] === oxygenFrequencies.mostCommon);
				assert.notEqual(oxygenBinaryStrings.length, 0);
			}

			if (co2BinaryStrings.length > 1) {
				const co2Frequencies = this.binaryFrequencyForColumn(co2BinaryStrings, columnIndex);

				co2BinaryStrings = co2BinaryStrings.filter(x => x[columnIndex] === co2Frequencies.leastCommon);
				assert.notEqual(co2BinaryStrings.length, 0);
			}
		}

		assert.equal(oxygenBinaryStrings.length, 1);
		assert.equal(co2BinaryStrings.length, 1);

		const [oxygen] = oxygenBinaryStrings;
		const [co2] = co2BinaryStrings;

		return [Number.parseInt(gamma, 2) * Number.parseInt(epsilon, 2), Number.parseInt(oxygen, 2) * Number.parseInt(co2, 2)];
	}

	private binaryFrequencyForColumn(binaryStrings: readonly string[], column: number): {mostCommon: Binary; leastCommon: Binary} {
		const oneFrequency = count(
			binaryStrings.map(x => x[column] as Binary),
			x => x === '1',
		);
		const zeroFrequency = binaryStrings.length - oneFrequency;

		return oneFrequency >= zeroFrequency ? ONE_MOST_COMMON : ZERO_MOST_COMMON;
	}
}
