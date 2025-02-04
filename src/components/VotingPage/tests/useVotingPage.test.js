
const { getPrepsForAutoVote } = require("../utils")
const { oldState, defaultPayload } = require("./fixture")

describe("TEST AUTOVOTE FUNCTION", () => {
    it("should have all the fields", () => {
        const newState = getPrepsForAutoVote(oldState, defaultPayload);
        expect(newState).toHaveProperty("autoVotedPreps")
        expect(newState).toHaveProperty("selectedMap")
    })

    it("should return selected preps", () => {
        const newState = getPrepsForAutoVote(oldState, defaultPayload);
        const { selectedMap, autoVotedPreps } = newState;

        autoVotedPreps.forEach(prep => {
            expect(selectedMap).toHaveProperty(prep.address);
        });
    })

    it("should return the right number of preps", () => {
        const newState = getPrepsForAutoVote(oldState, defaultPayload);
        expect(newState).toHaveProperty("autoVotedPreps")
        expect(newState.autoVotedPreps.length).toEqual(defaultPayload.prepCount)
    })

    it("should return preps with commission rate less than the threshold", () => {
        const newState = getPrepsForAutoVote(oldState, defaultPayload);
        const { autoVotedPreps } = newState;
        autoVotedPreps.forEach(prep => {
            expect(prep.commission_rate).toBeLessThanOrEqual(defaultPayload.commissionRateCutoff)
        })
    })

    it("should return preps with over bond percent greater than the threshold", () => {
        const newState = getPrepsForAutoVote(oldState, defaultPayload);
        const { autoVotedPreps } = newState;
        autoVotedPreps.forEach(prep => {
            expect(prep.overBondPercent).toBeGreaterThanOrEqual(defaultPayload.overBondCutoff)
        })
    })

    it("should return sorted preps for mostOptimised", () => {
        const newState = getPrepsForAutoVote(oldState, defaultPayload);
        const { autoVotedPreps } = newState;
        testArraySort(autoVotedPreps, "commissionBondPercent")
    })

    it("should return sorted preps for commissionRate", () => {
        const payloadCommissionRate = { ...defaultPayload, priority: "commissionRate" }
        const newState = getPrepsForAutoVote(oldState, payloadCommissionRate);
        const { autoVotedPreps } = newState;
        testArraySort(autoVotedPreps, "commission_rate", "ASC")
    })

    it("should return sorted preps for bondPercent", () => {
        const payload = { ...defaultPayload, priority: "bondPercent" }
        const newState = getPrepsForAutoVote(oldState, payload);
        const { autoVotedPreps } = newState;
        testArraySort(autoVotedPreps, "bond_percent")
    })

    it("should only return unjailed preps", () => {
        const newState = getPrepsForAutoVote(oldState, defaultPayload);
        const { autoVotedPreps } = newState;

        autoVotedPreps.forEach(prep => {
            expect(prep.isJailed).toBe(false)
        })
    })

    // it("should also return jailed preps", () => {
    //     const newState = getPrepsForAutoVote(oldState, { ...defaultPayload, excludeJailed: false });
    //     const { autoVotedPreps } = newState;

    //     const jailedPreps = autoVotedPreps.filter(f => f.isJailed === true)
    //     expect(jailedPreps.length).toBeGreaterThanOrEqual(1);
    // })

    it("should sort by commission_rate in case of commissionBondPercent tie", () => {
        const newState = getPrepsForAutoVote(oldState, { ...defaultPayload });
        const { autoVotedPreps } = newState;

        for (let i = 0; i < autoVotedPreps.length - 1; i++) {
            const current = autoVotedPreps[i];
            const next = autoVotedPreps[i + 1];


            if (current.commissionBondPercent === next.commissionBondPercent) {
                console.log("Collission")
                expect(current.commission_rate).toBeGreaterThanOrEqual(next.commission_rate);
            }
        }
    });

    it("should sort by delegated in case of commissionRate tie", () => {
        const payload = { ...defaultPayload, priority: "commissionRate" }
        const newState = getPrepsForAutoVote(oldState, payload);
        const { autoVotedPreps } = newState;

        for (let i = 0; i < autoVotedPreps.length - 1; i++) {
            const current = autoVotedPreps[i];
            const next = autoVotedPreps[i + 1];


            if (current.commission_rate === next.commission_rate) {
                expect(current.delegated).toBeGreaterThanOrEqual(next.delegated);
            }
        }
    });

    it("should sort by delegated in case of bondPercent tie", () => {
        const payload = { ...defaultPayload, priority: "bondPercent" }
        const newState = getPrepsForAutoVote(oldState, payload);
        const { autoVotedPreps } = newState;

        for (let i = 0; i < autoVotedPreps.length - 1; i++) {
            const current = autoVotedPreps[i];
            const next = autoVotedPreps[i + 1];


            if (current.bond_percent === next.bond_percent) {
                expect(current.delegated).toBeGreaterThanOrEqual(next.delegated);
            }
        }
    });
})


/* ---------------------------------------------------------------------------- */

function testArraySort(arr, field, sortOrder = "DESC") {
    console.log({ arr, field, sortOrder })

    if (sortOrder === "DESC") {
        for (let i = 0; i < arr.length - 1; i++) {
            expect(arr[i][field])
                .toBeGreaterThanOrEqual(arr[i + 1][field]);
        }
    } else {

        for (let i = 0; i < arr.length - 1; i++) {
            expect(arr[i][field])
                .toBeLessThanOrEqual(arr[i + 1][field]);
        }
    }

}