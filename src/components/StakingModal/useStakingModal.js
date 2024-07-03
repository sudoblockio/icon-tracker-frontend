import { useEffect, useState } from 'react'
import { getBondList, getDelegation, getStake } from '../../redux/store/iiss'
import config from '../../config'
import scores from '../../utils/rawTxMaker/scores'
import { decimalToHex, makeTxCallRPCObj } from '../../utils/rawTxMaker/api/helpers'
import { requestJsonRpc } from '../../utils/connect'


export function useStakingModal(wallet) {
    const [state, setState] = useState({
        minStake: 0,
        maxStake: 0,
        newStake: null,
        totBonded: 0,
        totVoted: 0,

        stepLimit: 0,

        isLoading: true,
        isErrStaking: false,
    })

    function handleChangeForm(e) {
        const { name, value } = e.target
        setState((prev) => ({ ...prev, [name]: value }))
    }

    function handleAfterSliderChange() {
        const newStake = Number(state.newStake)
        setState((prev) => ({
            ...prev,
            stakedAmount: newStake,
            unstakedAmount: prev.unstakedAmount - (newStake - prev.stakedAmount),
            available: prev.balance - prev.newStake,
        }))

        calcStats();
    }

    async function handleSubmit(e) {
        e.preventDefault()

        if (state.newStake < state.totVoted) {
            setState((prev) => ({ ...prev, isErrStaking: true }))
            return
        }

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
        await requestJsonRpc(rawTx.params)
    }

    const getAddrStake = async () => {
        const res = await getStake(wallet.data.address)
        const stakedAmount = Number(res.stake / Math.pow(10, 18))
        const unstakedAmount = res.unstakes.reduce(
            (accum, curr) => accum + Number(curr.unstake / Math.pow(10, 18)),
            0
        )
        setState((prev) => ({ ...prev, stakedAmount, unstakedAmount }))
    }

    const getAddrDelegation = async () => {
        const res = await getDelegation(wallet.data.address)
        const totVoted = Number(res.totalDelegated / Math.pow(10, 18))
        setState((prev) => ({ ...prev, totVoted, minStake: totVoted }))
    }

    const getAddrBond = async () => {
        let payload = { address: `${wallet.data.address}` }

        const res = await getBondList(payload)
        if (res.length) {
            const totBonded = Number(res[0].value) / Math.pow(10, 18)
            setState((prev) => ({ ...prev, totBonded }))
        } else {
            setState((prev) => ({ ...prev, totBonded: 0, bondedPercent: 0 }))
        }
    }


    const calcStats = async () => {
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

        setState(prev => ({ ...prev, stepLimit: Number(rawTx.params.stepLimit) }))
    }

    function isNil(value) {
        return value === null || value === undefined;
    }


    useEffect(() => {
        if (isNil(wallet) || isNil(state.stakedAmount) || isNil(state.unstakedAmount)) return


        const balance = Number(wallet.data.available) + state.stakedAmount + state.unstakedAmount
        setState((prev) => ({ ...prev, newStake: state.stakedAmount, maxStake: balance, balance }))
    }, [state.stakedAmount, state.unstakedAmount, wallet])

    useEffect(() => {
        if (!wallet) return
        console.log('wallet', wallet)

        Promise.all([getAddrStake(), getAddrDelegation(), getAddrBond()])
            .then((resp) => { })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setState((prev) => ({
                    ...prev,
                    available: Number(wallet.data.available),
                    isLoading: false,
                }))
            })
    }, [wallet])

    return { state, handleChangeForm, handleSubmit, handleAfterSliderChange }
}
