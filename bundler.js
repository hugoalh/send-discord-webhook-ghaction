import { dirname as pathDirName, join as pathJoin } from "node:path";
import { existsSync as fsExistsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { mkdir as fsMKDir, readdir as fsReadDir, rm as fsRemove, writeFile as fsWriteFile } from "node:fs/promises";
import ncc from "@vercel/ncc";
const root = pathDirName(fileURLToPath(import.meta.url));
const scriptEntryPointFileName = "main.js";
const inputDirectoryPath = pathJoin(root, "src");
const inputFilePath = pathJoin(inputDirectoryPath, scriptEntryPointFileName);
const outputDirectoryPath = pathJoin(root, "dist");
const outputFilePath = pathJoin(outputDirectoryPath, scriptEntryPointFileName);
async function getDirectoryItem(directoryPath) {
	try {
		return await fsReadDir(directoryPath, { withFileTypes: true });
	} catch {
		return [];
	}
}

/* Clean up or initialize output directory (need to await in order to prevent race conditions). */
if (fsExistsSync(outputDirectoryPath)) {
	for (const outputFile of await getDirectoryItem(outputDirectoryPath)) {
		await fsRemove(pathJoin(outputDirectoryPath, outputFile.name), { recursive: true });
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
