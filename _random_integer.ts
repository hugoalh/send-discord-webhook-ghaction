export interface RandomIntegerOptions {
	base?: number;
	d?: number;
}
export function generateRandomInteger(options: RandomIntegerOptions = {}): number {
	const {
		base = 0,
		d = 2
	}: RandomIntegerOptions = options;
	if (!Number.isSafeInteger(base)) {
		throw new TypeError(`Parameter \`options.base\` is not a number which is integer and safe!`);
	}
	if (!(Number.isSafeInteger(d) && d >= 2)) {
		throw new TypeError(`Parameter \`options.d\` is not a number which is integer, safe, and >= 2!`);
	}
	return Math.floor(Math.random() * d + base);
}
