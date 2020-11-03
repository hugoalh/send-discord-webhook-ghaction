/*==================
[GitHub Action] Send To Discord - Setup
	Language:
		NodeJS/12.13.0
==================*/
const childProcess = require("child_process");
childProcess.execSync(
	`npm install`,
	{
		cwd: __dirname
	}
);
