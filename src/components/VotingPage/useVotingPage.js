import { useEffect, useState } from 'react'
import config from '../../config'

import scores from '../../utils/rawTxMaker/scores'
import { decimalToHex, makeTxCallRPCObj } from '../../utils/rawTxMaker/api/helpers'

import { getDelegation, getStake, getPReps, getPRepsRPC } from '../../redux/store/iiss'

import { requestJsonRpc } from '../../utils/connect'
import { calculatePercentageWithoutTrunc } from '../../utils/utils'
import { toast } from 'react-toastify'
import { IconConverter, IconAmount } from 'icon-sdk-js'
import { getPrepsForAutoVote } from './utils'

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

        sortKey: "bond_percent",
        sortOrder: "-",

        isLoadingPreps: false,
        delegatedOriginal: [],

        searchString: '',
        filteredPreps: [],
    })

    function handleSubmitAutoVote(payload) {
        const prevState = { ...state };
        const newState = getPrepsForAutoVote(prevState, payload)
        console.log(newState)
        setState(newState)
    }


    function handleChangeSearch(e) {
        const { value } = e.target;
        setState(prev => {
            if (value === "")
                return { ...prev, searchString: '', filteredPreps: prev.preps }

            const filtered = prev.filteredPreps.filter(f => f.name.toLowerCase().includes(value.toLowerCase()));
            return { ...prev, searchString: value, filteredPreps: filtered }
        })
    }

    async function handleClickHeader(sortKey) {
        function getNewSortOrder(sortKey) {
            if (sortKey === state.sortKey) {
                if (state.sortOrder === "-") {
                    return ''
                } else {
                    return '-'
                }
            } else {
                return '-'
            }
        }

        setState(prev => ({ ...prev, isLoadingPreps: true }))

        try {
            const newSortOrder = getNewSortOrder(sortKey);
            const newSortKey = `${newSortOrder}${sortKey}`

            const query = { sort: newSortKey }
            const resp = await getPReps(query);

            const filtered = resp.data.filter(f => f.name.toLowerCase().includes(state.searchString.toLowerCase()))

            setState(prev => ({ ...prev, preps: resp.data, sortKey, sortOrder: newSortOrder, filteredPreps: filtered }))
        } catch (err) {
            console.log(err)
        } finally {
            setState(prev => ({ ...prev, isLoadingPreps: false }))
        }
    }

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
                [address]: { ...prev.selectedMap[address], voteAmt: Number(amt), votePercent: calculatePercentageWithoutTrunc(Number(amt), prev.stakedAmount) },
            },
        }))
    }

    function handleChangeVotePercent(address, value) {
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
            await requestJsonRpc(rawTx.params)
            toast.success("Transaction success")
            init();
            toggleIsOpenPopup();
        } catch (err) {
            toast.error("Transaction failed")
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


    async function init() {
        try {
            const selectedMap = {}

            setState(prev => ({ ...prev, isLoadingPreps: true }))

            const respPreps = await getPReps()
            const { totalDelegated: totalVotedLoop } = await getPRepsRPC()

            const totalVoted = !totalVotedLoop ?
                0 :
                IconConverter.toNumber(IconAmount.of(totalVotedLoop || 0x0, IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX).value.toString(10))

            const { data: dataPreps } = respPreps
            dataPreps.forEach(prep => {
                prep.commissionBondPercent = Number(prep.commission_rate) * Number(prep.bond_percent)
                prep.overBondPercent = 100 - Number(prep.bond_percent)
                prep.isJailed = parseInt(prep.jail_flags, 16) !== 0
            })
            const delegationData = await getDelegation({ address })
            const dataStake = await getStake(address)
            const stakedAmount = Number(dataStake.stake / Math.pow(10, 18))

            delegationData.delegations.forEach(({ address, value }) => {
                const foundPrep = findDelegInPreps(address, dataPreps)
                const voteAmt = Number(value / Math.pow(10, 18))

                selectedMap[address] = {
                    ...foundPrep,
                    voteAmt,
                    votePercent: calculatePercentageWithoutTrunc(voteAmt, stakedAmount)
                }
            })

            setState((prev) => ({
                ...prev,
                delegatedOriginal: delegationData.delegations,
                preps: dataPreps,
                filteredPreps: dataPreps,
                selectedMap,
                maxVoteAmt: stakedAmount,
                totAvailVoteAmt: stakedAmount,
                totVotedAmt: 0,
                stakedAmount,
                totalVoted,
                isLoadingPreps: false
            }))

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
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
        handleDeleteVoted,
        handleClickHeader,
        handleChangeSearch,
        handleSubmitAutoVote,
        getPrepsForAutoVote
    }
}