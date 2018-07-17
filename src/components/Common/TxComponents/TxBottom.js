import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    LoadingComponent,
    TxTableHead,
    TxTableRow,
    NoBox
} from '../../../components'

class TokenTransfers extends Component {

    render() {
        const Contents = (_props) => {
            const { 
                tokenTransfers, 
                noDataText, 
                goAllTx,
                totalText, 
                tableClassName, 
                txType, 
            } = _props
            
            const {             
                data, 
                totalData,
                loading
            } = tokenTransfers
            
            if (loading) {
                return (
                    <LoadingComponent height='349px' />
                )
            }
            else if (data.length === 0) {
                return (
                    <NoBox text={noDataText} />
                )
            }
            else {
                return (
                    <div className="contents">
                        <p className="txt">
                            <span>A Total of<em className="mint" onClick={goAllTx}>{totalData} {totalText}</em></span>
                        </p>
                        <table className={tableClassName}>
                            <thead>
                                <TxTableHead txType={txType} />
                            </thead>
                            <tbody>
                                {
                                    data.map((item, index) => (
                                        <TxTableRow key={index} txType={txType} data={item} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
        }
        return Contents(this.props)
    }
}

export default withRouter(TokenTransfers);
