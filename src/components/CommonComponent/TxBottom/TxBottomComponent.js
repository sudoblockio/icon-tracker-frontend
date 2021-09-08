import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import TxBottomTitle from './TxBottomTitle'
import { TxTableHead, TxTableBody, LoadingComponent, NoBox } from '../../../components'

class TxBottomComponent extends Component {
    render() {
        const { txData, txType, goAllTx, address, tableClassName, noBoxText } = this.props
        console.log(this.props, "yayayayyaya")
        const { data, listSize, totalSize, loading } = txData

        const Content = () => {
            if (loading) {
                return <LoadingComponent height="349px" />
            } else if (!data || data.length === 0) {
                return <NoBox text={noBoxText} />
            } else {
                {console.log(data, "HOLYSHITBALLS")}
                const { fromAddr, toAddr } = data
                return (
                    <div className="contents">
                        <TxBottomTitle txType={txType} listSize={listSize} totalSize={totalSize} goAllTx={goAllTx} fromAddr={fromAddr} toAddr={toAddr} />
                        <div className="table-box">
                            <table className={tableClassName}>
                                <thead>
                                    <TxTableHead txType={txType} />
                                </thead>
                                <tbody>
                                    {console.log(data, "this is it")}
                                    {[data].map((item, index) => (
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
