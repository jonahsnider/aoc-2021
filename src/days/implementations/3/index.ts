import {frequencyTable, lines} from '@jonahsnider/util';
import {Day} from '../../../lib/solution.js';
import type {SolutionPair} from '../../../lib/types.js';

export class Day3 extends Day {
	solve(input: string): SolutionPair {
		const solution: SolutionPair = [0, 0];

		const binarys = lines(input);

		let gamma = '';
		let epsilon = '';

		for (let i = 0; i < binarys[0].length; i++) {
			const frequencies = frequencyTable(binarys.map(x => x[i])) as Map<'1' | '0', number>;

			const [one, zero] = [frequencies.get('1')!, frequencies.get('0')!];

			const mostCommon = one > zero ? '1' : '0';
			const leastCommon = one > zero ? '0' : '1';

			gamma += mostCommon;
			epsilon += leastCommon;
		}

		console.log({epsilon, gamma});

		solution[0] = Number.parseInt(gamma, 2) * Number.parseInt(epsilon, 2);

		let oxygenBinarys = [...binarys];

		for (let i = 0; i < binarys[0].length; i++) {
			const frequencies = frequencyTable(oxygenBinarys.map(x => x[i])) as Map<'1' | '0', number>;

			const [one, zero] = [frequencies.get('1')!, frequencies.get('0')!];

			const mostCommon = one >= zero ? '1' : '0';

			oxygenBinarys = oxygenBinarys.filter(x => x[i] === mostCommon);
		}

		let co2Binarys = [...binarys];

		for (let i = 0; i < binarys[0].length; i++) {
			const frequencies = frequencyTable(co2Binarys.map(x => x[i])) as Map<'1' | '0', number>;

			const [one, zero] = [frequencies.get('1')!, frequencies.get('0')!];

			const leastCommon = one >= zero ? '0' : '1';

			co2Binarys = co2Binarys.filter(x => x[i] === leastCommon);
		}

		const oxygen = oxygenBinarys[0];
		const co2 = co2Binarys[0];

		solution[1] = Number.parseInt(oxygen, 2) * Number.parseInt(co2, 2);

		return solution;
	}
}
