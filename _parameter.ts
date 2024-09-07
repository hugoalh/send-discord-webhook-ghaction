import { isStringSingleLine } from "ISSTRINGSINGLELINE";
export interface GitHubActionsInputOptions<T> {
	defaultValue?: T;
	/**
	 * Whether the input is require.
	 * @default false
	 */
	require?: boolean;
}
/**
 * Get the raw value of an input.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @param {string} key Key of the input.
 * @returns {string} Raw value of the input.
 */
function getInputRaw(key: string): string {
	if (!isStringSingleLine(key)) {
		throw new SyntaxError(`\`${key}\` is not a valid GitHub Actions input key!`);
	}
	return Deno.env.get(`INPUT_${key.replaceAll(" ", "_").toUpperCase()}`) ?? "";
}
/**
 * Get the value of an input.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @param {string} key Key of the input.
 * @param {GitHubActionsInputOptions<string>} [options={}] Options.
 * @returns {string} Value of the input.
 */
export function getInput(key: string, options: GitHubActionsInputOptions<string> = {}): string {
	const value: string = getInputRaw(key);
	if (value.length === 0) {
		if (options.require) {
			throw new ReferenceError(`Input \`${key}\` is not defined!`);
		}
		return options.defaultValue ?? "";
	}
	return value;
}
/**
 * Get the boolean value of an input.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @param {string} key Key of the input.
 * @param {GitHubActionsInputOptions<boolean>} [options={}] Options.
 * @returns {boolean} Boolean value of the input.
 */
export function getInputBoolean(key: string, options: GitHubActionsInputOptions<boolean> = {}): boolean {
	const value: string = getInputRaw(key);
	if (value.length === 0) {
		if (options.require) {
			throw new ReferenceError(`Input \`${key}\` is not defined!`);
		}
		return options.defaultValue ?? false;
	}
	if (/^[Ff]alse$|^FALSE$/.test(value)) {
		return false;
	}
	if (/^[Tt]rue$|^TRUE$/.test(value)) {
		return true;
	}
	throw new SyntaxError(`\`${value}\` (input \`${key}\`) is not a valid boolean!`);
}
/**
 * Get the number value of an input.
 * 
 * > **🛡️ Require Permission**
 * >
 * > - Environment Variable (`allow-env`)
 * @param {string} key Key of the input.
 * @param {GitHubActionsInputOptions<number>} [options={}] Options.
 * @returns {number} Number value of the input.
 */
export function getInputNumber(key: string, options: GitHubActionsInputOptions<number> = {}): number {
	const value: string = getInputRaw(key);
	if (value.length === 0) {
		if (options.require) {
			throw new ReferenceError(`Input \`${key}\` is not defined!`);
		}
		return options.defaultValue ?? 0;
	}
	return Number(value);
}
