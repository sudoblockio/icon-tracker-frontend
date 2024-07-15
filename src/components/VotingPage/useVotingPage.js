import { useEffect, useState } from 'react'
import config from '../../config'

import scores from '../../utils/rawTxMaker/scores'
import { decimalToHex, makeTxCallRPCObj } from '../../utils/rawTxMaker/api/helpers'

import { getDelegation, getStake, getPReps } from '../../redux/store/iiss'

import { requestJsonRpc } from '../../utils/connect'
import { calculatePercentage } from '../../utils/utils'
import { toast } from 'react-toastify'

function findDelegInPreps(addr, preps) {
    return preps.find((f) => f.address === addr)
}

export function useVotingPage(address, history) {
    const [state, setState] = useState({
        preps: [],
        selectedMap: {},
        totVotedAmt: 0,
        totVotedPercent: 0,
        maxVoteAmt: 0,
        totAvailVoteAmt: 0,
        isOpenPopup: false,
        validationErrors: { amount: null, percent: null },

        delegatedOriginal: [],
    })

    function toggleIsOpenPopup() {
        setState(prev => ({ ...prev, isOpenPopup: !prev.isOpenPopup }))
    }

    function handleChangeCheckbox(prep) {
        setState((prev) => {
            const map = { ...prev.selectedMap }
            if (map[prep.address]) delete map[prep.address]
            else map[prep.address] = prep
            return { ...prev, selectedMap: map }
        })
    }

    function handleChangeVoteAmt(address, amt) {
        setState((prev) => ({
            ...prev,
            selectedMap: {
                ...prev.selectedMap,
                [address]: { ...prev.selectedMap[address], voteAmt: Number(amt) },
            },
        }))
    }

    function handleChangeVotePercent(address, value) {
        console.log({ address, value })
        setState((prev) => ({
            ...prev,
            selectedMap: {
                ...prev.selectedMap,
                [address]: {
                    ...prev.selectedMap[address],
                    voteAmt: (value / 100) * prev.stakedAmount,
                    votePercent: Number(value)
                },
            },
        }))
    }

    async function handleSubmitVoting() {
        if (!Object.entries(state.selectedMap).length) return

        const delegs = []
        for (const key in state.selectedMap) {
            const prep = state.selectedMap[key]
            delegs.push({
                address: prep.address,
                value: decimalToHex(Number(prep.voteAmt) * Math.pow(10, 18)),
            })
        }

        const params = {
            from: address,
            to: scores[config.network].governance,
            nid: config.nid,
            data: {
                method: 'setDelegation',
                params: { delegations: delegs },
            },
        }

        try {
            const rawTx = await makeTxCallRPCObj(
                params.from,
                params.to,
                params.data.method,
                params.data.params,
                params.nid
            )
            const resp = await requestJsonRpc(rawTx.params)
            toast.success("Successful")
            toggleIsOpenPopup();
        } catch (err) {
            console.log(err)
        }
    }

    function handleDeleteVoted(candidate) {
        setState(prev => {
            const toUpdate = { ...prev };
            delete toUpdate.selectedMap[candidate.address]
            return toUpdate;
        })
    }


    function updateAvailVoteAmt(votedAmt) {
        setState((prev) => ({
            ...prev,
            totAvailVoteAmt: prev.maxVoteAmt - prev.totVotedAmt,
            currMax: (votedAmt ? votedAmt : 0) + prev.totAvailVoteAmt,
        }))
    }

    useEffect(() => {
        const toUpdate = { ...state };
        console.log({ abcd: state.totVotedPercent })

        toUpdate.validationErrors = {};
        if (state.totVotedAmt > state.maxVoteAmt) {
            toUpdate.validationErrors["amount"] = {};
            toUpdate.validationErrors.amount = { msg: `Can't be greater than ${state.maxVoteAmt.toFixed(3)} ` }
        } else {
            toUpdate.validationErrors.amount = null;
        }
        if (state.totVotedPercent > 100) {
            toUpdate.validationErrors["percent"] = {};
            toUpdate.validationErrors.percent = { msg: `Can't be greater than ${100}` }
        } else {
            toUpdate.validationErrors.percent = null;
        }

        setState(toUpdate)
    }, [state.totVotedAmt, state.totVotedPercent])


    useEffect(() => {
        async function init() {
            try {
                const selectedMap = {}
                const respPreps = await getPReps()
                const { data: dataPreps } = respPreps
                const delegationData = await getDelegation({ address })
                const dataStake = await getStake(address)
                const stakedAmount = Number(dataStake.stake / Math.pow(10, 18))

                delegationData.delegations.forEach(({ address, value }) => {
                    const foundPrep = findDelegInPreps(address, dataPreps)
                    const voteAmt = Number(value / Math.pow(10, 18))

                    selectedMap[address] = {
                        ...foundPrep,
                        voteAmt,
                        votePercent: calculatePercentage(voteAmt, stakedAmount)
                    }
                })

                setState((prev) => ({
                    ...prev,
                    delegatedOriginal: delegationData.delegations,
                    preps: dataPreps,
                    selectedMap,
                    maxVoteAmt: stakedAmount,
                    totAvailVoteAmt: stakedAmount,
                    totVotedAmt: 0,
                    stakedAmount,
                }))
            } catch (err) {
                console.log(err)
            }
        }

        init()
    }, [address,])

    useEffect(() => {
        const { preps, selectedMap } = state
        if (!preps || !selectedMap) return

        const toUpdatePreps = [...preps]
        for (const prep of toUpdatePreps) {
            if (selectedMap[prep.address]) prep.isChecked = true
            else prep.isChecked = false
        }

        let totVoted = 0
        for (const key in selectedMap) {
            totVoted += selectedMap[key].voteAmt || 0
        }

        setState((prev) => ({
            ...prev,
            preps: toUpdatePreps,
            totVotedAmt: totVoted,
            totAvailVoteAmt: prev.maxVoteAmt - totVoted > 0 ? prev.maxVoteAmt - totVoted : 0,
        }))
    }, [state.selectedMap])


    useEffect(() => {
        const votedList = Object.entries(state.selectedMap).map(([key, value]) => { return value })
        let totVotedAmt = 0;
        let totVotedPercent = 0;
        votedList.forEach(item => {
            totVotedAmt += Number(item.voteAmt)
            totVotedPercent += Number(item.votePercent)
        })

        setState(prev => ({ ...prev, totVotedAmt, totVotedPercent }))

    }, [state.selectedMap])


    return {
        state,
        handleChangeCheckbox,
        handleChangeVoteAmt,
        updateAvailVoteAmt,
        handleSubmitVoting,
        toggleIsOpenPopup,
        handleChangeVotePercent,
        handleDeleteVoted
    }
}