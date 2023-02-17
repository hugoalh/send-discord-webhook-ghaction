import { dirname, join as pathJoin } from "node:path";
import { exec } from "node:child_process";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { readdir, readFile, rename, rm, writeFile } from "node:fs/promises";
const childProcessExec = promisify(exec);
const outputDirectory = "dist";
const outputDirectoryFullPath = pathJoin(dirname(fileURLToPath(import.meta.url)), outputDirectory);
/* Remove all of the files in the `outputDirectory`, need to await in order to prevent race conditions. */
for (const outputFile of await readdir(outputDirectoryFullPath, { withFileTypes: true })) {
	await rm(pathJoin(outputDirectoryFullPath, outputFile.name));
}
/* Invoke `ncc` bundler. */
console.log(await childProcessExec(`"./node_modules/.bin/ncc.cmd" build src/main.js --out "${outputDirectory}" --no-cache --no-source-map-register --target es2021`));
/* Fix `ncc` bundler issues, no need to await due to no race conditions. */
for (const outputFile of await readdir(outputDirectoryFullPath, { withFileTypes: true })) {
	const outputFileFullPath = pathJoin(outputDirectoryFullPath, outputFile.name);
	if (outputFile.name === "index.js") {
		/* Fix incorrect paths. */
		await writeFile(outputFileFullPath, (await readFile(outputFileFullPath)).toString().replaceAll("\"file:///C:/Users/User/Documents/GitHub/send-discord-webhook-ghaction/src/main.js\"", "import.meta.url"));
		rename(outputFileFullPath, pathJoin(outputDirectoryFullPath, "main.js"));
	} else {
		rm(outputFileFullPath);
	}
}
