/*==================
[GitHub Action] Send To Discord - Setup
	Language:
		NodeJS 14
==================*/
const childProcess = require("child_process");
childProcess.execSync(
	`npm install`,
	{
		cwd: __dirname
	}
);
