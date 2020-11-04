/*==================
[GitHub Action] Send To Discord - Dynamic Require
	Language:
		NodeJS/12.13.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine");
function dynamicRequire(packageName) {
	if (advancedDetermine.isString(packageName) !== true) {
		throw new TypeError();
	};
	try {
		return require(packageName);
	} catch (error) {
		const fileSystem = require("fs");
		let data = fileSystem.readFileSync(
			"./package.json",
			{
				encoding: "utf8",
				flag: "r"
			}
		);
		let token = JSON.parse(data);
		if (advancedDetermine.isObjectPair(token.dynamicDependencies) !== true) {
			throw error;
		};
		let packageVersion = token.dynamicDependencies[packageName];
		if (advancedDetermine.isString(packageVersion) !== true) {
			throw error;
		};
		const childProcess = require("child_process");
		childProcess.execSync(
			`npm install ${packageName}@${packageVersion}`,
			{
				cwd: __dirname
			}
		);
		return require(packageName);
	};
};
module.exports = dynamicRequire;
