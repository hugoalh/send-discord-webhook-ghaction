import { deepStrictEqual } from "node:assert";
import { parse as yamlParse } from "STD/yaml/parse";
Deno.test("1", { permissions: "none" }, () => {
	deepStrictEqual(yamlParse(""), null);
});
Deno.test("2", { permissions: "none" }, () => {
	deepStrictEqual(yamlParse("") ?? [], []);
});
