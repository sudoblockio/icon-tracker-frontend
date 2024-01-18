import React, { useState, useEffect } from 'react'
import { IconConverter } from 'icon-sdk-js'
import { PROPOSAL_TABS } from '../../utils/const'
import { getProposal } from '../../redux/store/iiss'
import { ProposalStatus, ProposalStatusClass, ProposalType, VIEW_NUMBER } from '../../utils/const'
import {
    valueToString,
    convertNumberToText,
    findTabIndex,
    dateToUTC,
    getUTCString,
    convertLoopToIcxDecimal,
    closeEm,
} from '../../utils/utils'
import { blockInfo } from '../../redux/store/blocks'
import { getLastBlock, getPRepsRPC } from '../../redux/store/iiss'
import { addressInfo } from '../../redux/store/addresses'
import { governanceMethods } from '../../utils/rawTxMaker'
import { icxSendTransaction } from '../../redux/api/jsProvider/icx'
import config from '../../config'

// SET THE FOLLOWING FLAG AS true FOR TESTING
const USE_TESTING_PARAMS = false

const nid = USE_TESTING_PARAMS ? 3 : config.nid

const { approveNetworkProposal, rejectNetworkProposal, applyNetworkProposal } = governanceMethods

function useProposalPage(props) {
    const [state, setPageState] = useState({
        loading: true,
        error: false,
        proposal: {},
        tab: getTab(props),
        startTimeDate: '',
        currentBlockHeight: '',
        endingBlockHeight: '',
        prepsList: null,
        showVoteButton: false,
        showApplyButton: false,
        walletInfo: null,
        votedAgree: false,
        votedDisagree: false,
        isVoter: false,
    })

    const { walletAddress } = props
    function getTruncVotes(amount) {
        const totalTokenVotesNumber = Number(convertLoopToIcxDecimal(amount))
        return convertNumberToText(totalTokenVotesNumber.toFixed(0))
    }

    async function getLastBlockHeight(endBlockHeight, currentBlockHeight) {
        const endBlockHeightNumber = IconConverter.toNumber(endBlockHeight)
        if (Number(currentBlockHeight) > endBlockHeightNumber) {
            const payload = {
                height: endBlockHeightNumber,
            }
            const res = await blockInfo(payload)
            const date = new Date((res.data.timestamp / 1e6) * 1000)

            setPageState((currentState) => {
                return { ...currentState, endingBlockHeight: date }
            })
        } else {
            const difference = Number(endBlockHeightNumber) - Number(currentBlockHeight)
            const miliseconds = difference * 2 * 1000
            const latestDate = new Date().valueOf()
            const totalSum = miliseconds + latestDate
            const date = new Date(totalSum)

            setPageState((currentState) => {
                return { ...currentState, endingBlockHeight: date }
            })
        }
    }

    async function getStartBlockHeight(startBlockHeight) {
        const payload = {
            height: IconConverter.toNumber(startBlockHeight),
        }
        const res = await blockInfo(payload)
        const date = new Date((res.data.timestamp / 1e6) * 1000)
        setPageState((currentState) => {
            return { ...currentState, startTimeDate: date }
        })
    }

    function getId(pathname) {
        return pathname.split('/')[2]
    }

    function getTab(props) {
        const locationObject = Object.keys(props.url).includes('location')
            ? props.url.location
            : props.url
        console.log('locationObj')
        console.log(locationObject)
        const { hash } = locationObject
        const index = findTabIndex(PROPOSAL_TABS, hash)
        return PROPOSAL_TABS[index === -1 ? 0 : index]
    }

    function changeTab(tab) {
        setPageState((currentState) => {
            return { ...currentState, tab }
        })
    }

    function getTabList(vote) {
        if (!vote) return []

        const { agree, disagree, noVote } = vote
        let result = []

        if (agree) {
            agree.list.forEach((item) => {
                item.answer = 'Agree'
                result.push(item)
            })
        }

        if (disagree) {
            disagree.list.forEach((item) => {
                item.answer = 'Disagree'
                result.push(item)
            })
        }

        if (vote && noVote && state.prepsList != null) {
            noVote.list.forEach((item) => {
                const data = state.prepsList.filter((e) => {
                    return e.address === item
                })
                if (!data[0]) {
                    result.push({
                        address: '--',
                        amount: '--',
                        name: 'Unregistered Prop',
                        answer: 'No Vote',
                    })
                } else {
                    result.push({
                        address: item,
                        amount: data[0]?.power,
                        name: data[0]?.name,
                        answer: 'No Vote',
                    })
                }
            })
        }
        return result.sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
    }

    function getContentsValue(value) {
        try {
            if (value.hasOwnProperty('data')) {
                return JSON.parse(valueToString(value))
            }
            return value
        } catch (e) {
            console.log('JSON Parsing Error: ', e)
        }
    }

    function getContentsDeepOfValue(value) {
        try {
            if (value.hasOwnProperty('data')) {
                return 2
            }
            return 1
        } catch (e) {
            console.log('JSON Parsing Error: ', e)
        }
    }

    function setVoteButtonVisibility(endblockHeightAsHex, currentBlockHeightAsNumber) {
        const endBlockHeight = parseInt(endblockHeightAsHex, 16)
        const currentBlockHeight = currentBlockHeightAsNumber

        const flowCondition = USE_TESTING_PARAMS ? true : endBlockHeight > currentBlockHeight
        if (flowCondition) {
            setPageState((currentState) => {
                return {
                    ...currentState,
                    showVoteButton: true,
                }
            })
        } else {
            setPageState((currentState) => {
                return {
                    ...currentState,
                    showVoteButton: false,
                }
            })
        }
    }
    async function handleClickOnAccept() {
        //
        if (state.proposal.id != null && walletAddress != null && walletAddress != '') {
            const rawTransaction = approveNetworkProposal(state.proposal.id, walletAddress, nid)

            const response = await icxSendTransaction({
                rawTx: rawTransaction,
                index: 0,
            })
            console.log('network vote response', response)
        }
    }

    async function handleClickOnApply() {
        //
        if (state.proposal.id != null && walletAddress != null && walletAddress != '') {
            const rawTransaction = applyNetworkProposal(state.proposal.id, walletAddress, nid)

            const response = await icxSendTransaction({
                rawTx: rawTransaction,
                index: 0,
            })
            console.log('proposal apply response', response)
        }
    }

    async function handleClickOnReject() {
        //
        if (state.proposal.id != null && walletAddress != null && walletAddress != '') {
            const rawTransaction = rejectNetworkProposal(state.proposal.id, walletAddress, nid)

            const response = await icxSendTransaction({
                rawTx: rawTransaction,
                index: 0,
            })
            console.log('network vote response', response)
        }
    }

    function checkIfVoted(arrayOfVotesObject, walletAddress) {
        if (arrayOfVotesObject == null) {
            return false
        }
        const voted = arrayOfVotesObject.filter((vote) => {
            return vote.address === walletAddress
        })
        return voted.length > 0
    }

    useEffect(() => {
        async function getWalletInfo(wallet) {
            let walletInfo
            try {
                walletInfo = await addressInfo({
                    address: wallet,
                    limit: 10,
                    skip: 0,
                })
            } catch (e) {
                walletInfo = null
            }
            setPageState((currentState) => {
                return { ...currentState, walletInfo: walletInfo }
            })
        }

        async function fetchInit() {
            try {
                const proposal = await getProposal(id)
                const data = await getLastBlock()
                const prepRpc = await getPRepsRPC()

                setPageState((currentState) => {
                    return {
                        ...currentState,
                        currentBlockHeight: data.height,
                        loading: false,
                        proposal: proposal,
                        prepsList: prepRpc.preps,
                    }
                })

                await getStartBlockHeight(proposal.startBlockHeight)
                await getLastBlockHeight(proposal.endBlockHeight, data.height)
                setVoteButtonVisibility(proposal.endBlockHeight, data.height)
            } catch (e) {
                console.error(e)
                setPageState((currentState) => {
                    return { ...currentState, error: id }
                })
            }
        }

        const locationObject = Object.keys(props.url).includes('location')
            ? props.url.location
            : props.url
        const id = getId(locationObject.pathname)
        fetchInit()

        if (typeof walletAddress === 'string' && walletAddress !== '') {
            getWalletInfo(walletAddress)
        }
    }, [])

    useEffect(() => {
        async function getVoters(height) {
            let allPreps = null
            try {
                allPreps = await getPRepsRPC(height)
                if (allPreps.error != null) {
                    allPreps = await getPRepsRPC()
                }
            } catch (e) {
                console.log('error in getVoters')
            }
            if (allPreps != null) {
                return allPreps.preps
                    .filter((prep) => {
                        return prep.grade === '0x0'
                    })
                    .map((prep) => {
                        return prep.address
                    })
            } else {
                return []
            }
        }
        async function asyncTask() {
            const { agree, disagree, noVote } = state.proposal.vote

            const votedAgree = checkIfVoted(agree.list, walletAddress)
            let votedDisagree = false
            if (!votedAgree) {
                votedDisagree = checkIfVoted(disagree.list, walletAddress)
            }
            const voters = await getVoters(state.proposal.startBlockHeight)
            const isVoter = USE_TESTING_PARAMS ? true : voters.includes(walletAddress)

            const showApplyButton = isVoter || votedAgree || votedDisagree
            setPageState((currentState) => {
                return {
                    ...currentState,
                    votedAgree: votedAgree,
                    votedDisagree: votedDisagree,
                    isVoter: isVoter,
                    showApplyButton: showApplyButton,
                }
            })
        }
        if (
            state.proposal != null &&
            state.proposal.vote != null &&
            typeof walletAddress === 'string' &&
            walletAddress !== '' &&
            state.prepsList != null &&
            state.prepsList.length > 0
        ) {
            asyncTask()
        }
    }, [state.proposal, walletAddress])

    return {
        state,
        setPageState,
        getTabList,
        handleClickOnApply,
        handleClickOnReject,
        handleClickOnAccept,
        getContentsValue,
        getContentsDeepOfValue,
        getTruncVotes,
        changeTab,
    }
}

export default useProposalPage
