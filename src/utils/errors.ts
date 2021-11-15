export class CommandError extends Error {
	constructor(message: string, stack = false) {
		super(message);
		this.name = 'CommandError';

		if (!stack) {
			this.stack = undefined;
		}
	}
}
