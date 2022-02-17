import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import TxBottomTitle from './TxBottomTitle'
import { TxTableHead, TxTableBody, LoadingComponent, NoBox } from '../../../components'
import { getBondList } from '../../../redux/store/iiss'

class TxBottomComponent extends Component {
    async componentDidMount() {
        let payload = { address: `${this.props.match.params.addressId}`, page: 1, count: 10 }

        this.bondList = await getBondList(payload)
        console.log(this.bondList, "here bond")
    }
    
    render() {
        const { txData, txType, goAllTx, address, tableClassName, noBoxText, tokenTotal } = this.props
        const { data, listSize, totalSize, loading, } = txData
        const Content = () => {
            // if (this.props.txType === 'tokenHolders') {
            //     this.tts = await getTokenTotalSupply(this.props.data.token_contract_address)
    
            // }
            if (loading) {
                return <LoadingComponent height="349px" />
            } else if(txType === 'addressBonded'){
                // const { from_address, to_address } = data[0]
                console.log(txData, "before return bond list")
                return (
                    <div className="contents">
                        <TxBottomTitle txType={txType} listSize={Number(txData.length)} totalSize={Number(txData.length)} goAllTx={goAllTx} fromAddr={"hello"} />
                        <div className="table-box">
                            <table className={tableClassName}>
                                <thead>
                                    <TxTableHead txType={txType} />
                                </thead>
                                <tbody>
                                    {(txData || []).map((item, index) => (
                                        
                                        <TxTableBody key={index} totalSupply={tokenTotal} rank={index +1} data={item} txType={txType} address={address} tokenTotal={tokenTotal} />
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            } else if (!data || data.length === 0 && txType !== 'addressBonded') {
                return <NoBox text={noBoxText} />
            }
            else {
                const { from_address, to_address } = data[0] || this.props.txData
                return (
                    <div className="contents">
                        <TxBottomTitle txType={txType} listSize={totalSize} totalSize={Number(data.length)} goAllTx={goAllTx} fromAddr={from_address || data[0].token_contract_address} toAddr={to_address} />
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
