// import { calculatePercentageWithoutTrunc } from "../../utils/utils";

// Importing from utils was causing tests to fail because of setup issues
function calculatePercentageWithoutTrunc(part, whole) {
    if (typeof part !== 'number' || typeof whole !== 'number' || whole === 0) {
        return 0;
    }
    return Number((((part) / (whole)) * 100));
}

function getPrepsForAutoVote(oldState, payload) {
    const toUpdate = { ...oldState, selectedMap: {} };
    const { prepCount, commissionRateCutoff, overBondingCutoff, priority, voteAmt } = payload;

    const votePerPrep = voteAmt / prepCount;
    const prepsFilteredSorted = toUpdate.preps.filter(f =>
        f.commission_rate > commissionRateCutoff && f.bond_percent > overBondingCutoff
    )

    switch (priority) {
        case "mostOptimised":
            prepsFilteredSorted.sort((a, b) => b.comissionBondPercent - a.comissionBondPercent)
            break;
        case "commissionRate":
            prepsFilteredSorted.sort((a, b) => b.commission_rate - a.commission_rate)
            break;
        case "bondingPercent":
            prepsFilteredSorted.sort((a, b) => b.bond_percent - a.bond_percent)
            break;
        default:
            break;

    }

    const topNPreps = prepsFilteredSorted.slice(0, prepCount);
    topNPreps.forEach(prep => {
        const { address } = prep;
        toUpdate.autoVotedPreps = topNPreps;
        toUpdate.selectedMap[address] = {
            ...prep,
            voteAmt: Number(votePerPrep),
            votePercent: calculatePercentageWithoutTrunc(Number(votePerPrep), toUpdate.stakedAmount)
        }
    })
    return toUpdate;

}

module.exports = { getPrepsForAutoVote }