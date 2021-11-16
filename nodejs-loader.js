const childProcess = require("child_process");
/**
 * @private
 * @function $execute
 * @param {string} command
 * @returns {Promise<any>}
 */
function $execute(command) {
	return new Promise((resolve, reject) => {
		childProcess.exec(
			command,
			{
				cwd: __dirname,
				encoding: "utf8",
				windowsHide: true
			},
			(error, stdout, stderr) => {
				if (stdout.length > 0) {
					console.log(stdout);
				};
				if (stderr.length > 0) {
					console.error(stderr);
				};
				if (typeof error !== "undefined" && error !== null) {
					return reject(error);
				};
				return resolve();
			}
		);
	});
};
(async () => {
	await $execute("npm ci");
	await $execute("node main.js");
})().catch((reason) => {
	console.error(reason);
	process.exit(1);
});
