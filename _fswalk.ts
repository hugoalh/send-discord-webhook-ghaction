import {
	walk as fsWalk,
	type WalkEntry,
	type WalkOptions
} from "STD/fs/walk";
import { isAbsolute as pathIsAbsolute } from "STD/path/is-absolute";
import { join as pathJoin } from "STD/path/join";
import { normalize as pathNormalize } from "STD/path/normalize";
import { relative as pathRelative } from "STD/path/relative";
export interface FSWalkOptions extends WalkOptions {
	/**
	 * Whether the root should include in the yield entries.
	 * @default true
	 */
	includeRoot?: boolean;
}
export interface FSWalkEntry {
	/**
	 * Whether entry is a regular directory. Mutually exclusive to {@linkcode isFile} and {@linkcode isSymlink}.
	 */
	isDirectory: boolean;
	/**
	 * Whether entry is a regular file. Mutually exclusive to {@linkcode isDirectory} and {@linkcode isSymlink}.
	 */
	isFile: boolean;
	/**
	 * Whether entry is a symlink. Mutually exclusive to {@linkcode isDirectory} and {@linkcode isFile}.
	 */
	isSymlink: boolean;
	/**
	 * Name of the entry.
	 */
	name: string;
	/**
	 * Absolute path of the entry.
	 */
	pathAbsolute: string;
	/**
	 * Root based relative path of the entry.
	 */
	pathRelative: string;
}
async function* walkFSIterator(fsWalker: AsyncIterableIterator<WalkEntry>, pathRootAbsolute: string, includeRoot = true): AsyncGenerator<FSWalkEntry> {
	for await (const {
		isDirectory,
		isFile,
		isSymlink,
		name,
		path
	} of fsWalker) {
		if (isDirectory && path === pathRootAbsolute && !includeRoot) {
			continue;
		}
		yield {
			isDirectory,
			isFile,
			isSymlink,
			name,
			pathAbsolute: path,
			pathRelative: pathRelative(pathRootAbsolute, path)
		};
	}
}
export function walkFS(pathRoot: string, options: FSWalkOptions = {}): AsyncGenerator<FSWalkEntry> {
	const pathRootAbsolute: string = pathNormalize(pathIsAbsolute(pathRoot) ? pathRoot : pathJoin(Deno.cwd(), pathRoot));
	return walkFSIterator(fsWalk(pathRootAbsolute, options), pathRootAbsolute, options.includeRoot);
}
