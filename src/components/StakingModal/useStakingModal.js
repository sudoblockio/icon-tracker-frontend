import { useEffect, useState } from 'react'

import config from '../../config'

import scores from '../../utils/rawTxMaker/scores'
import { requestJsonRpc } from '../../utils/connect'
import { decimalToHex, makeTxCallRPCObj } from '../../utils/rawTxMaker/api/helpers'
import { getDelegation, getStake, getStepPrice } from '../../redux/store/iiss'
import { calculatePercentage } from '../../utils/utils'
import { toast } from 'react-toastify'

function isNil(value) {
    return value === null || value === undefined;
}

export function useStakingModal(wallet, onClose) {
    const [state, setState] = useState({
        balance: null,

        stakedAmount: 0,
        unstakedAmount: 0,
        totVoted: 0,
        unstakes: [],
        newStake: null,

        minStake: 0,
        maxStake: 0,

        stepPrice: null,
        stepLimit: 0,

        isLoading: true,
        isErrStaking: false,
    })

    async function getTx() {
        const params = {
            from: wallet.data.address,
            to: scores[config.network].governance,
            nid: config.nid,
            data: {
                method: 'setStake',
                params: {
                    value: decimalToHex(Number(state.newStake) * Math.pow(10, 18)),
                },
            },
        }
        const rawTx = await makeTxCallRPCObj(
            params.from,
            params.to,
            params.data.method,
            params.data.params,
            params.nid
        )
        return rawTx;
    }


    function handleChangeForm(e) {
        let { name, value } = e.target


        if (name === "newStakePercent") {
            setState(prev => ({ ...prev, "newStake": (value / 100) * state.balance }))
        }

        if (name === "newStake") {
            const newStakePercent = calculatePercentage(parseFloat(value), state.balance)
            setState(prev => ({ ...prev, "newStakePercent": newStakePercent }))
        }

        setState((prev) => ({ ...prev, [name]: value }))
    }
    useEffect(() => {
        const value = state.newStakePercent;
        if (value < calculatePercentage(state.totVoted, state.balance) || value > 100) {
            setState(prev => ({ ...prev, isErrStaking: true }))
        } else {
            setState(prev => ({ ...prev, isErrStaking: false }))
        }
    }, [state.newStakePercent])

    useEffect(() => {
        const value = state.newStake;
        if (value < state.minStake || value > state.maxStake) {
            setState(prev => ({ ...prev, isErrStaking: true }))
        } else {
            setState(prev => ({ ...prev, isErrStaking: false }))
        }
    }, [state.newStake])


    function handleAfterSliderChange() {
        const newStake = Number(state.newStake)
        calcStats(newStake)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (state.newStake < state.totVoted) {
            setState((prev) => ({ ...prev, isErrStaking: true }))
            return
        }

        try {
            const rawTx = await getTx();
            await requestJsonRpc(rawTx.params)
            toast.success("Success")
            onClose();
        } catch (err) {
            console.log("Error")
        }
    }

    const calcStats = async () => {
        const rawTx = await getTx();
        const stepPrice = Number(await getStepPrice());
        setState(prev => ({ ...prev, stepLimit: Number(rawTx.params.stepLimit), stepPrice: Number(stepPrice / Math.pow(10, 18)) }))
    }


    const getAddrStake = async () => {
        const res = await getStake(wallet.data.address)
        const stakedAmount = Number(res.stake / Math.pow(10, 18))

        const unstakes = res.unstakes.map(item => ({
            amount: Number(item.unstake / Math.pow(10, 18)),
            target: Number(item.unstakeBlockHeight),
            timeInSec: Number(item.remainingBlocks) * 2,
            remainingBlocks: Number(item.remainingBlocks)
        }))

        const unstakedAmount = res.unstakes.reduce(
            (accum, curr) => accum + Number(curr.unstake / Math.pow(10, 18)),
            0
        )
        setState((prev) => ({ ...prev, stakedAmount, unstakedAmount, unstakes }))
    }

    const getAddrDelegation = async () => {
        const res = await getDelegation(wallet.data.address)
        const totVoted = Number(res.totalDelegated / Math.pow(10, 18))
        setState((prev) => ({ ...prev, totVoted, minStake: totVoted }))
    }
    useEffect(() => {
        if (!wallet) return
        Promise.all([getAddrStake(), getAddrDelegation(),])
            .then((resp) => { })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setState((prev) => ({
                    ...prev,
                    isLoading: false,
                }))
            })
    }, [wallet])

    useEffect(() => {
        if (state.balance === null) return;
        calcStats();
    }, [state.balance])

    useEffect(() => {
        if (isNil(wallet) || isNil(state.stakedAmount) || isNil(state.unstakedAmount)) return
        const balance = Number(wallet.data.available) + state.stakedAmount + state.unstakedAmount
        const gasBuffer = 0.02; // 1% buffer for gas fees
        const maxStake = balance * (1 - gasBuffer); // Reduce maxStake by 1%
        setState((prev) => ({ ...prev, newStake: state.stakedAmount, maxStake, balance }))
    }, [state.stakedAmount, state.unstakedAmount, wallet])


    return { state, handleChangeForm, handleSubmit, handleAfterSliderChange }
}
