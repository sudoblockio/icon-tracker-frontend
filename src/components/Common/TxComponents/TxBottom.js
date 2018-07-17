import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    LoadingComponent,
    TxTableHead,
    TxTableBody,
    NoBox
} from '../../../components'
import {
    numberWithCommas
} from '../../../utils/utils'

class TxBottom extends Component {

    render() {
        const Contents = (_props) => {
            const { 
                txData, 
                txType, 
                goAllTx,
                address,
                tableClassName, 
                noBoxText, 
                totalText,
            } = _props
            
            const {             
                data, 
                totalData,
                loading
            } = txData
            
            if (loading) {
                return (
                    <LoadingComponent height='349px' />
                )
            }
            else if (data.length === 0) {
                console.log(noBoxText)
                return (
                    <NoBox text={noBoxText} />
                )
            }
            else {
                return (
                    <div className="contents">
                        <p className="txt">
                            <span>
                                Latest<em>{totalData < 10 ? totalData : 10}</em> txns from a total of
                                <em className="mint" onClick={goAllTx}>{numberWithCommas(totalData)} {totalText}</em>
                            </span>
                        </p>
                        <table className={tableClassName}>
                            <thead>
                                <TxTableHead txType={txType} />
                            </thead>
                            <tbody>
                                {
                                    data.map((item, index) => (
                                        <TxTableBody key={index} data={item} txType={txType} address={address}/>
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

export default withRouter(TxBottom);
