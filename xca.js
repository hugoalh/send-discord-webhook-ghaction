/*==================
[GitHub Action] Send To Discord - XCA
	Language:
		NodeJS/12.13.0
==================*/
const advancedDetermine = require("@hugoalh/advanced-determine"),
	githubAction = {
		core: require("@actions/core"),
		github: require("@actions/github")
	};
async function xca(path) {
	githubAction.core.info(`Import workflow argument (stage XCA). ([GitHub Action] Send To Discord)`);
	let githubToken = githubAction.core.getInput("github_token");
	githubAction.core.info(`Analysis workflow argument (stage XCA). ([GitHub Action] Send To Discord)`);
	if (advancedDetermine.isString(githubToken) === false) {
		throw new TypeError(`Workflow argument "github_token" must be type of string! ([GitHub Action] Send To Discord)`);
	};
	githubAction.core.info(`Send network request to GitHub. ([GitHub Action] Send To Discord)`);
	const octokit = githubAction.github.getOctokit(githubToken);
	let [repositoryOwner, repositoryName] = process.env.GITHUB_REPOSITORY.split("/");
	let data = await octokit.repos.getContent({
		owner: repositoryOwner,
		path: path,
		repo: repositoryName
	}).catch((error) => {
		throw error;
	});
	githubAction.core.info(`Receive network response from GitHub. ([GitHub Action] Send To Discord)`);
	if (data.status !== 200) {
		githubAction.core.warning(`Receive status code ${data.status}! May cause error in the beyond. ([GitHub Action] Send To Discord)`);
	};
	githubAction.core.info(`Analysis network response from GitHub. ([GitHub Action] Send To Discord)`);
	let content;
	switch (data.data.encoding) {
		case "base64":
			content = Buffer.from(data.data.content).toString();
			break;
		case "utf8":
		case "utf-8":
			content = data.data.content;
			break;
		default:
			throw new Error(`File is not exist, or using unsupported encoding! ([GitHub Action] Send To Discord)`);
	};
	githubAction.core.info(`Construct configuration argument (stage XCA). ([GitHub Action] Send To Discord)`);
	const dynamicRequire = require("./dynamicrequire.js");
	let result;
	if (path.search(/\.json$/gu) !== -1) {
		result = JSON.parse(content);
	} else if (configuration.search(/\.jsonc$/gu) !== -1) {
		const JSONC = dynamicRequire("jsonc");
		result = JSONC.parse(content);
	} else {
		const YAML = dynamicRequire("yaml");
		result = YAML.parse(content);
	};
	githubAction.core.debug(`Configuration Argument (Stage XCA): ${JSON.stringify(result)} ([GitHub Action] Send To Discord)`);
	return result;
};
module.exports = xca;
