export interface BigIntRootApproximateResult {
    ceil: bigint;
    floor: bigint;
}
/**
 * Return the root of the big integer, approximate. From https://stackoverflow.com/a/64190462.
 * @param {bigint} radicand Radicand.
 * @param {bigint} index Index.
 * @returns {BigIntRootApproximateResult} Root, approximate.
 */
export declare function bigintRootApproximate(radicand: bigint, index?: bigint): BigIntRootApproximateResult;
//# sourceMappingURL=_bigint-root-approximate.d.ts.map