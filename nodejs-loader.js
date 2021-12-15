const childProcess = require("child_process");
/**
 * @private
 * @function $execute
 * @param {string} command
 * @returns {Promise<any>}
 */
function $execute(command) {
	return new Promise((resolve) => {
		childProcess.exec(
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
	if (npmCleanInstallResult.stdout.length > 0) {
		console.log(npmCleanInstallResult.stdout);
	};
	if (npmCleanInstallResult.stderr.length > 0) {
		console.error(npmCleanInstallResult.stderr);
	};
	if (npmCleanInstallResult.error) {
		throw new Error(`Unable to install action's dependencies! (Error Code: ${npmCleanInstallResult.error.code})`);
	};
	let actionResult = await $execute("node main.js");
	if (actionResult.stdout.length > 0) {
		console.log(actionResult.stdout);
	};
	if (actionResult.stderr.length > 0) {
		console.error(actionResult.stderr);
	};
	if (actionResult.error) {
		throw actionResult.error;
	};
})().catch((reason) => {
	console.error(reason);
	process.exit(1);
});
