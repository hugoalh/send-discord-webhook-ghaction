import { build } from "esbuild";
build({
	bundle: true,
	charset: "utf8",
	entryPoints: [
		"./src/main.js"
	],
	format: "esm",
	minify: true,
	outfile: "./dist/main.js",
	platform: "node",
	sourcemap: "linked",
	target: "node16.13",
	treeShaking: true
});
