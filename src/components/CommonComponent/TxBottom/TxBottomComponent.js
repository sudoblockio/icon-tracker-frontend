import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import TxBottomTitle from './TxBottomTitle'
import { TxTableHead, TxTableBody, LoadingComponent, NoBox } from '../../../components'

class TxBottomComponent extends Component {
    render() {
        const { txData, txType, goAllTx, address, tableClassName, noBoxText } = this.props
        const { data, listSize, totalSize, loading } = txData
        console.log(txData, "the data")
        console.log(goAllTx, "the data")

        const Content = () => {
            if (loading) {
                return <LoadingComponent height="349px" />
            } else if (!data || data.length === 0) {
                return <NoBox text={noBoxText} />
            } else {
                const { from_address, to_address } = data[0]
                return (
                    <div className="contents">
                        {console.log(totalSize, "from bottom")}
                        <TxBottomTitle txType={txType} listSize={data.length} totalSize={Number(totalSize)} goAllTx={goAllTx} fromAddr={from_address} toAddr={to_address} />
                        <div className="table-box">
                            <table className={tableClassName}>
                                <thead>
                                    <TxTableHead txType={txType} />
                                </thead>
                                <tbody>
                                    {(data || []).map((item, index) => (
                                        <TxTableBody key={index} data={item} txType={txType} address={address} />
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
