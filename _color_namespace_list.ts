import colorNamespaceListCommunity from "COLORNAMESPACELISTCOMMUNITY";
interface ColorNamespaceListEntry {
	hex: `#${string}`;
	name: string;
}
export const colorNamespaceList: Map<ColorNamespaceListEntry["name"], ColorNamespaceListEntry["hex"]> = new Map<ColorNamespaceListEntry["name"], ColorNamespaceListEntry["hex"]>();
for (const { name, hex } of (colorNamespaceListCommunity as ColorNamespaceListEntry[])) {
	colorNamespaceList.set(name, hex);
}
colorNamespaceList.set("Discord Blurple", "#5865F2");
colorNamespaceList.set("Discord Embed Background Dark", "#2F3136");
colorNamespaceList.set("Discord Embed Default", "#202225");
colorNamespaceList.set("Discord Fuchsia", "#EB459E");
colorNamespaceList.set("Discord Green", "#57F287");
colorNamespaceList.set("Discord Red", "#ED4245");
colorNamespaceList.set("Discord Yellow", "#FEE75C");
