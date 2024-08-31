// import { calculatePercentageWithoutTrunc } from "../../utils/utils";

// Importing from utils was causing tests to fail because of setup issues
function calculatePercentageWithoutTrunc(part, whole) {
    if (typeof part !== 'number' || typeof whole !== 'number' || whole === 0) {
        return 0;
    }
    return Number((((part) / (whole)) * 100));
}

function getPrepsForAutoVote(oldState, payload) {
    // console.log(oldState)
    // console.log(payload)
    const toUpdate = { ...oldState, selectedMap: {} };
    const { prepCount, commissionRateCutoff, overBondCutoff, priority, voteAmt, excludeJailed } = payload;

    const votePerPrep = voteAmt / prepCount;


    toUpdate.preps.filter(f => {
        let condition = f.commission_rate > commissionRateCutoff && f.overBondPercent > overBondCutoff;
        if (excludeJailed) {
            condition = condition && f.isJailed === false
        }

        return condition;
    })

    const prepsFilteredSorted = toUpdate.preps.filter(f => {
        let condition = f.commission_rate > commissionRateCutoff && f.overBondPercent > overBondCutoff;
        if (excludeJailed) {
            condition = condition && f.isJailed === false
        }

        return condition;
    })

    switch (priority) {
        case "mostOptimised":
            prepsFilteredSorted.sort((a, b) => b.commissionBondPercent - a.commissionBondPercent || b.commission_rate - a.commission_rate || b.bond_percent - a.bond_percent)
            break;
        case "commissionRate":
            prepsFilteredSorted.sort((a, b) => b.commission_rate - a.commission_rate || b.delegated - a.delegated)
            break;
        case "bondPercent":
            prepsFilteredSorted.sort((a, b) => b.bond_percent - a.bond_percent || b.delegated - a.delegated)
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