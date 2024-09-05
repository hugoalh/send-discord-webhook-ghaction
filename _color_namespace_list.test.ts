import { assertEquals } from "STD/assert/equals";
import { colorNamespaceList } from "./_color_namespace_list.ts";
Deno.test("1", { permissions: "none" }, () => {
	assertEquals(colorNamespaceList.get("Discord Embed Default"), "#202225");
});
