function getSegmentedABI(abi) {
    if (!abi) return [];


    const result = [...abi];
    result.sort((a, b) => (a.type === "eventlog" ? -1 : 1));
    return result;
}

module.exports = { getSegmentedABI }