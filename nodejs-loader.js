import { dirname as pathDirname } from "path";
import { exec as childProcessExec } from "child_process";
import { fileURLToPath } from "url";
const __dirname = pathDirname(fileURLToPath(import.meta.url));
/**
 * @private
 * @function $execute
 * @param {string} command
 * @returns {Promise<any>}
 */
function $execute(command) {
	return new Promise((resolve) => {
		childProcessExec(
			command,
			{
				cwd: __dirname,
				encoding: "utf8",
				windowsHide: true
			},
			(error, stdout, stderr) => {
				return resolve({
					error,
					stderr,
					stdout
				});
			}
		);
	});
};
(async () => {
	let npmCleanInstallResult = await $execute("npm ci");
	let npmCleanInstallResultStdErr = npmCleanInstallResult.stderr.trim();
	let npmCleanInstallResultStdOut = npmCleanInstallResult.stdout.trim();
	if (npmCleanInstallResultStdOut.length > 0) {
		console.log(npmCleanInstallResultStdOut);
	};
	if (npmCleanInstallResultStdErr.length > 0) {
		console.log(npmCleanInstallResultStdErr);
	};
	if (npmCleanInstallResult.error) {
		throw new Error(`Unable to install action's dependencies! (Error Code: ${npmCleanInstallResult.error.code})`);
	};
	return import("./main.js");
})().catch((reason) => {
	console.error(reason);
	process.exit(1);
});
