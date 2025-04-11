import { configureDenoLintPlugin } from "HUGOALH_DENO_LINT_RULES";
export default configureDenoLintPlugin({
	"max-file-size": true,
	"no-alert": true,
	"no-confirm": true,
	"no-iife": true,
	"no-import-dynamic": true,
	"no-import-npm": true,
	"no-prompt": true
}) satisfies Deno.lint.Plugin as Deno.lint.Plugin;
