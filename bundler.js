import { dirname as pathDirName, join as pathJoin } from "node:path";
import { exec } from "node:child_process";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { readdir as fsReadDir, rename as fsRename, rm as fsRemove } from "node:fs/promises";
const childProcessExec = promisify(exec);
const outputDirectory = "dist";
const outputDirectoryFullPath = pathJoin(pathDirName(fileURLToPath(import.meta.url)), outputDirectory);
async function readOutputDirectory() {
	try {
		return await fsReadDir(outputDirectoryFullPath, { withFileTypes: true });
	} catch {
		return [];
	}
}
/* Remove all of the files in the output directory, need to await in order to prevent race conditions. */
for (const outputFile of await readOutputDirectory()) {
	await fsRemove(pathJoin(outputDirectoryFullPath, outputFile.name));
}
/* Invoke `ncc` bundler. */
console.log(await childProcessExec(`"./node_modules/.bin/ncc.cmd" build src/main.js --out "${outputDirectory}" --no-cache --no-source-map-register --target es2021`));
/* Fix `ncc` bundler issues, no need to await due to no race conditions. */
for (const outputFile of await readOutputDirectory()) {
	const outputFileFullPath = pathJoin(outputDirectoryFullPath, outputFile.name);
	if (outputFile.name === "index.js") {
		fsRename(outputFileFullPath, pathJoin(outputDirectoryFullPath, "main.js"));
	} else {
		fsRemove(outputFileFullPath);
	}
}
