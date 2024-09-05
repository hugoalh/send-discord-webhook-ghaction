import { assertEquals } from "STD/assert/equals";
import { parse as yamlParse } from "STD/yaml/parse";
Deno.test("1", { permissions: "none" }, () => {
	assertEquals(yamlParse(""), null);
});
Deno.test("2", { permissions: "none" }, () => {
	assertEquals(yamlParse("") ?? [], []);
});
