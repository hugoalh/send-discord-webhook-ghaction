import { dirname as pathDirectoryName } from "path";
import { exec as childProcessExecute } from "child_process";
import { fileURLToPath } from "url";
const ghactionsActionDirectory = pathDirectoryName(fileURLToPath(import.meta.url));
/**
 * @private
 * @function $execute
 * @param {string} command
 * @returns {Promise<{error:(ExecException|null),stderr:string,stdout:string}}
 */
function $execute(command) {
	return new Promise((resolve) => {
		childProcessExecute(
			command,
			{
				cwd: ghactionsActionDirectory,
				encoding: "utf8",
				windowsHide: true
			},
			(error, stdout, stderr) => {
				return resolve({
					error,
					stderr: stderr.trim(),
					stdout: stdout.trim()
				});
			}
		);
	});
};
(async () => {
	let npmCleanInstallResult = await $execute("npm ci");
	if (npmCleanInstallResult.stdout.length > 0) {
		console.log(npmCleanInstallResult.stdout);
	};
	if (npmCleanInstallResult.stderr.length > 0) {
		console.log(npmCleanInstallResult.stderr);
	};
	if (npmCleanInstallResult.error) {
		throw new Error(`Unable to install action's dependencies: ${npmCleanInstallResult.error})`);
	};
	import("./main.js");
})().catch((reason) => {
	console.error(reason);
	process.exit(1);
});
