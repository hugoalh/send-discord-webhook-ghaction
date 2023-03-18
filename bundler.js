import { dirname as pathDirName, join as pathJoin } from "node:path";
import { existsSync as fsExistsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { minify as terser } from "terser";
import { mkdir as fsMKDir, readdir as fsReadDir, rm as fsRemove, writeFile as fsWriteFile } from "node:fs/promises";
import ncc from "@vercel/ncc";
const scriptRoot = pathDirName(fileURLToPath(import.meta.url));
const scriptFileName = "main.js";
const inputDirectoryPath = pathJoin(scriptRoot, "src");
const inputFilePath = pathJoin(inputDirectoryPath, scriptFileName);
const outputDirectoryPath = pathJoin(scriptRoot, "dist");
const outputFilePath = pathJoin(outputDirectoryPath, scriptFileName);
async function readOutputDirectory() {
	try {
		return await fsReadDir(outputDirectoryPath, { withFileTypes: true });
	} catch {
		return [];
	}
}

/* Clean up or initialize output directory (need to await in order to prevent race conditions). */
if (fsExistsSync(outputDirectoryPath)) {
	for (const outputFile of await readOutputDirectory()) {
		await fsRemove(pathJoin(outputDirectoryPath, outputFile.name));
	}
} else {
	await fsMKDir(outputDirectoryPath, { recursive: true });
}

/* Create bundle. */
let code;
try {
	code = (await ncc(inputFilePath, {
		assetBuilds: false,
		cache: false,
		debugLog: false,
		license: "",
		minify: false,
		quiet: false,
		sourceMap: false,
		sourceMapRegister: false,
		target: "es2022",
		v8cache: false,
		watch: false
	})).code;
	code = (await terser(code, {
		compress: {
			defaults: false,
			drop_debugger: true,
			ecma: 2022,
			keep_classnames: true,
			keep_fargs: true,
			keep_fnames: true,
			keep_infinity: true,
			module: true,
			passes: 1
		},
		ecma: 2022,
		format: {
			braces: true,
			comments: false,
			ecma: 2022,
			keep_numbers: true,
			quote_style: 3,
			semicolons: false,
		},
		keep_classnames: true,
		keep_fnames: true,
		mangle: {
			keep_classnames: true,
			keep_fnames: true,
			module: true
		},
		module: true,
		sourceMap: false,
		toplevel: false
	})).code;
} catch (error) {
	console.error(error);
} finally {
	await fsWriteFile(outputFilePath, code, { encoding: "utf8" });
}
