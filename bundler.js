import { existsSync as fsExistsSync } from "node:fs";
import { mkdir as fsMKDir, readdir as fsReadDir, rm as fsRemove, writeFile as fsWriteFile } from "node:fs/promises";
import { dirname as pathDirname, join as pathJoin } from "node:path";
import { fileURLToPath } from "node:url";
import ncc from "@vercel/ncc";
const root = pathDirname(fileURLToPath(import.meta.url));
const scriptEntryPointFileName = "main.js";
const inputDirectoryPath = pathJoin(root, "src");
const inputFilePath = pathJoin(inputDirectoryPath, scriptEntryPointFileName);
const outputDirectoryPath = pathJoin(root, "dist");
const outputFilePath = pathJoin(outputDirectoryPath, scriptEntryPointFileName);
async function getDirectoryItem(directoryPath, relativeBasePath) {
	if (typeof relativeBasePath === "undefined") {
		relativeBasePath = directoryPath;
	}
	try {
		let result = [];
		for (let item of await fsReadDir(directoryPath, { withFileTypes: true })) {
			if (item.isDirectory()) {
				result.push(...await getDirectoryItem(pathJoin(directoryPath, item.name), relativeBasePath));
			} else {
				result.push(pathJoin(directoryPath, item.name).slice(relativeBasePath.length + 1).replace(/\\/gu, "/"));
			}
		}
		return result;
	} catch (error) {
		return [];
	}
}

/* Clean up or initialize output directory (need to await in order to prevent race conditions). */
if (fsExistsSync(outputDirectoryPath)) {
	for (let fileName of await getDirectoryItem(outputDirectoryPath)) {
		await fsRemove(pathJoin(outputDirectoryPath, fileName), { recursive: true });
	}
} else {
	await fsMKDir(outputDirectoryPath, { recursive: true });
}

/* Create bundle. */
let { code } = await ncc(inputFilePath, {
	assetBuilds: false,
	cache: false,
	debugLog: false,
	license: "",
	minify: true,
	quiet: false,
	sourceMap: false,
	sourceMapRegister: false,
	target: "es2022",
	v8cache: false,
	watch: false
});
await fsWriteFile(outputFilePath, code, { encoding: "utf8" });
