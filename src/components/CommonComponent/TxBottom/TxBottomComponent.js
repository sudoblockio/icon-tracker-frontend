import React, { useState, Component, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import TxBottomTitle from './TxBottomTitle'
import { TxTableHead, TxTableBody, LoadingComponent, NoBox } from '../../../components'
// import { getBondList } from '../../../redux/store/iiss'
import BondersModal from '../../BondersUpdateModal/bondersUpdateModal'
import BondedModal from '../../BondUpdateModal/bondUpdateModal'
import customStyles from './TxBottomComponent.module.css'
import clsx from 'clsx'
import { TX_TYPE } from '../../../utils/const'

class TxBottomComponent extends Component {
    render() {
        const {
            txData,
            txDataParsed,
            txType,
            goAllTx,
            address,
            tableClassName,
            noBoxText,
            tokenTotal,
            onClickTab,
            wallet,
            isBondingModalOpen
        } = this.props

        const { totalSize, loading } = txData
        let totalCount = txData.headers ? txData.headers['x-total-count'] : 0

        let tableBodyData
        if (txTypeIsBonderOrBonded(txType)) {
            tableBodyData = txData.filter((f) => {
                return this.props.bondMap[f] !== null
            })
            totalCount = tableBodyData.length
        } else if (txType === 'addressdelegations') {
            tableBodyData = txData.delegations
        }
        else if (txType === TX_TYPE.TRANSACTION_EVENTS || txType === TX_TYPE.CONTRACT_EVENTS) {
            tableBodyData = txDataParsed.isLoading ? txData.data : txDataParsed.data
        }
        else {
            tableBodyData = txData.data
        }


        const Content = () => {
            if (loading) {
                return <LoadingComponent height="349px" />
            } else if (txTypeIsBonderOrBonded(txType)) {
                return (
                    <div className="contents">
                        <CustomHeader
                            txData={txData}
                            txType={txType}
                            totalCount={totalCount}
                            goAllTx={goAllTx}
                            bondMap={this.props.bondMap}
                            address={this.props.address}
                            walletAddress={this.props.walletAddress}
                            wallet={wallet}
                            isBondingModalOpen={isBondingModalOpen}

                        />
                        <div className="table-box">
                            <table className={tableClassName}>
                                <thead>
                                    <TxTableHead txType={txType} />
                                </thead>
                                <tbody>
                                    {tableBodyData.map((item, index) => (
                                        <TxTableBody
                                            key={`${index}-${address}`}
                                            bondMap={this.props.bondMap}
                                            totalSupply={tokenTotal}
                                            rank={index + 1}
                                            data={item}
                                            txType={txType}
                                            address={address}
                                            tokenTotal={tokenTotal}
                                            onClickTab={onClickTab}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            } else if (
                (!tableBodyData || tableBodyData.length === 0) &&
                txType !== 'addressBonded'
            ) {
                return <NoBox text={noBoxText} />
            } else {
                const { from_address, to_address } = tableBodyData[0] || this.props.txData
                return (
                    <div className="contents">
                        <TxBottomTitle
                            txType={txType}
                            total={this.props.total}
                            listSize={Number(tableBodyData.length)}
                            totalSize={
                                txType === 'addressvoters' ||
                                    txType === 'addressreward' ||
                                    txType === 'addresstokentx' ||
                                    txType === 'addressinternaltx'
                                    ? totalCount
                                    : totalSize
                            }
                            goAllTx={goAllTx}
                            fromAddr={from_address || tableBodyData[0].token_contract_address}
                            toAddr={to_address}
                        />

                        <div className={clsx("table-box", this.props.noBorder && customStyles.noBorder)}   >
                            <table className={clsx(tableClassName, txType)} >
                                <thead>
                                    <TxTableHead txType={txType} />
                                </thead>
                                <tbody>
                                    {(tableBodyData || []).map((item, index) => {
                                        return (
                                            <TxTableBody
                                                key={index}
                                                totalSupply={tokenTotal}
                                                rank={index + 1}
                                                data={item}
                                                txType={txType}
                                                address={address}
                                                tokenTotal={tokenTotal}
                                                isLoading={txDataParsed?.isLoading ?? null}
                                            />
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div >
                )
            }
        }
        return Content()
    }
}

export default withRouter(TxBottomComponent)

function txTypeIsBonderOrBonded(txType) {
    return txTypeIsBonder(txType) || txTypeIsBonded(txType)
}

function txTypeIsBonded(txType) {
    const ar = ['addressbonded', 'addressBonded']

    return ar.includes(txType)
}

function txTypeIsBonder(txType) {
    const ar = ['addressbonders', 'addressBonders']

    return ar.includes(txType)
}

function CustomHeader({
    txData,
    txType,
    totalCount,
    goAllTx,
    bondMap,
    address,
    walletAddress,
    wallet,
    isBondingModalOpen
}) {
    const [isBondersModalOpen, setIsBondersModalOpen] = useState(false)
    const [isBondedModalOpen, setIsBondedModalOpen] = useState(false)
    const isLogged = walletAddress === address
    const isLoggedAsPrep = isLogged && wallet.data.is_prep

    function openBondersModal() {
        closeBondedModal()
        setIsBondersModalOpen(true)
    }

    function closeBondersModal() {
        setIsBondersModalOpen(false)
    }

    function openBondedModal() {
        closeBondersModal()
        setIsBondedModalOpen(true)
    }

    function closeBondedModal() {
        setIsBondedModalOpen(false)
    }

    useEffect(() => {
        setIsBondedModalOpen(isBondingModalOpen)
    }, [isBondingModalOpen])

    return (
        <>
            <BondersModal
                bondMap={bondMap}
                address={address}
                isOpen={isBondersModalOpen}
                onClose={closeBondersModal}
                walletAddress={walletAddress}
            />
            <BondedModal
                address={address}
                isOpen={isBondedModalOpen}
                onClose={closeBondedModal}
                walletAddress={walletAddress}
            />
            <div className={customStyles.headerContainer}>
                <TxBottomTitle
                    txType={txType}
                    listSize={Number(txData.length)}
                    totalSize={txType === 'addressBonders' ? totalCount : Number(txData.length)}
                    goAllTx={goAllTx}
                    fromAddr={'hello'}
                />
                {txTypeIsBonded(txType) && isLogged ? (
                    <button onClick={openBondedModal} className={customStyles.button}>
                        Update
                    </button>
                ) : txTypeIsBonder(txType) && isLoggedAsPrep ? (
                    <button onClick={openBondersModal} className={customStyles.button}>
                        Update
                    </button>
                ) : (
                    <></>
                )}
            </div>
        </>
    )
}
