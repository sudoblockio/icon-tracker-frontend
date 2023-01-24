import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import TxBottomTitle from './TxBottomTitle'
import { TxTableHead, TxTableBody, LoadingComponent, NoBox } from '../../../components'
import { getBondList } from '../../../redux/store/iiss'

class TxBottomComponent extends Component {
    
    render() {
        const { txData, txType, goAllTx, address, tableClassName, noBoxText, tokenTotal } = this.props
        const { data, listSize, totalSize, loading, } = txData
        
        let totalCount = txData.headers ? txData.headers["x-total-count"] : 0;


        let tableBodyData;
        if(txType === "addressBonders"){
            tableBodyData = txData.filter(f=> this.props.bondMap[f] !== null)
            totalCount = tableBodyData.length;
        }
        else
            tableBodyData = txData;


        const Content = () => {
            console.log(txType, "tx comp props bonder")
            if (loading) {
                return <LoadingComponent height="349px" />
            } else if(txType === 'addressbonded' || txType === 'addressbonders' || txType === 'addressBonded' || txType === 'addressBonders'){
                return (
                    <div className="contents">
                        <TxBottomTitle txType={txType}  listSize={Number(txData.length)} totalSize={txType === "addressBonders" ? totalCount : Number(txData.length)} goAllTx={goAllTx} fromAddr={"hello"} />
                        <div className="table-box">
                            <table className={tableClassName}>
                                <thead>
                                    <TxTableHead txType={txType} />
                                </thead>
                                <tbody>
                                    {tableBodyData.map((item,index)=>(
                                       <TxTableBody key={index} bondMap={this.props.bondMap} totalSupply={tokenTotal} rank={index +1} data={item} txType={txType} address={address} tokenTotal={tokenTotal} />  
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            } else if ((!data || data.length === 0) && (txType !== 'addressBonded')) {
                return <NoBox text={noBoxText} />
            }
            else {
                const { from_address, to_address } = data[0] || this.props.txData

                return (
                    <div className="contents">
                        <TxBottomTitle txType={txType} total={this.props.total} listSize={Number(data.length)} totalSize={txType === "addressvoters" || txType === "addressreward" || txType === "addresstokentx" ? totalCount : totalSize} goAllTx={goAllTx} fromAddr={from_address || data[0].token_contract_address} toAddr={to_address} />
                        <div className="table-box">
                            <table className={tableClassName}>
                                <thead>
                                    <TxTableHead txType={txType} />
                                </thead>
                                <tbody>
                                    {(data || []).map((item, index) => {
                                        return(
                                        <TxTableBody key={index} totalSupply={tokenTotal} rank={index +1} data={item} txType={txType} address={address} tokenTotal={tokenTotal} />
                                    )})}
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
