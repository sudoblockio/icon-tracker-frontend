import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import TxBottomTitle from './TxBottomTitle'
import { TxTableHead, TxTableBody, LoadingComponent, NoBox } from '../../../components'

class TxBottomComponent extends Component {
    render() {
        
        const { txData, txType, goAllTx, hash, tableClassName, noBoxText } = this.props
        console.log(this.props, "tx bottom props")
        const { data, listSize, totalSize, loading } = txData

        const Content = () => {
            if (loading) {
                return <LoadingComponent height="349px" />
            } else if (!data || data.length === 0) {
                return <NoBox text={noBoxText} />
            } else {

                const { from_address, to_address } = data

                return (
                    <div className="contents">
                        
                        <TxBottomTitle txType={txType} listSize={listSize} totalSize={totalSize} goAllTx={goAllTx} fromAddr={from_address} toAddr={to_address} />
                        <div className="table-box">
                            <table className={tableClassName}>
                                <thead>
                                    {console.log(txType, "tx Type from compo")}
                                    <TxTableHead txType={txType} />
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        console.log(item, "item/index"),
                                        console.log(index, "zee index")
                                    ))}
                                    {/* THIS I WAS [data], keep an eye out for code breaks */}
                                    {data.map((item, index) => (
                                        
                                        <TxTableBody key={index} data={item} txType={txType} address={hash} />
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
