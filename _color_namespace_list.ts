import {
	colornames,
	type ColorName
} from "COLORNAMESPACELIST";
export const colorNamespaceList: Map<string, string> = new Map<string, string>([
	...colornames.map(({
		hex,
		name
	}: ColorName): readonly [string, string] => {
		return [name, hex];
	}),
	["Discord Blurple", "#5865F2"],
	["Discord Embed Background Dark", "#2F3136"],
	["Discord Embed Default", "#202225"],
	["Discord Fuchsia", "#EB459E"],
	["Discord Green", "#57F287"],
	["Discord Red", "#ED4245"],
	["Discord Yellow", "#FEE75C"]
]);
