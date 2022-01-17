import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import TxBottomTitle from './TxBottomTitle'
import { TxTableHead, TxTableBody, LoadingComponent, NoBox } from '../../../components'
import { getTokenTotalSupply } from '../../../redux/store/iiss'

class TxBottomComponent extends Component {
    tts ;
    render() {
        const { txData, txType, goAllTx, address, tableClassName, noBoxText, tokenTotal } = this.props
        const { data, listSize, totalSize, loading, } = txData

        const Content = () => {
            // if (this.props.txType === 'tokenHolders') {
            //     this.tts = await getTokenTotalSupply(this.props.data.token_contract_address)
    
            // }

            if (loading) {
                return <LoadingComponent height="349px" />
            } else if (!data || data.length === 0) {
                return <NoBox text={noBoxText} />
            } else {
                const { from_address, to_address } = data[0]
                return (
                    <div className="contents">
                        <TxBottomTitle txType={txType} listSize={totalSize} totalSize={Number(data.length)} goAllTx={goAllTx} fromAddr={from_address} toAddr={to_address} />
                        <div className="table-box">
                            <table className={tableClassName}>
                                <thead>
                                    <TxTableHead txType={txType} />
                                </thead>
                                <tbody>
                                    {(data || []).map((item, index) => (
                                        <TxTableBody key={index} totalSupply={tokenTotal} rank={index +1} data={item} txType={txType} address={address} tokenTotal={tokenTotal} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
        }
        return Content()
    }
}

export default withRouter(TxBottomComponent)
