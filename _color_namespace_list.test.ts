import { deepStrictEqual } from "node:assert";
import { colorNamespaceList } from "./_color_namespace_list.ts";
Deno.test("1", { permissions: "none" }, () => {
	deepStrictEqual(colorNamespaceList.get("Discord Embed Default"), "#202225");
});
