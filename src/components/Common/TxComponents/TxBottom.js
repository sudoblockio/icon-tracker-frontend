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
        const { 
            txData, 
            txType, 
            goAllTx,
            address,
            tableClassName, 
            noBoxText, 
            totalText,
        } = this.props
        
        const {             
            data, 
            listSize,
            loading
        } = txData
        
        const Content = () => {
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
                                Latest<em>{listSize < 10 ? listSize : 10}</em> txns from a total of
                                <em className="mint" onClick={goAllTx}>{numberWithCommas(listSize)} {totalText}</em>
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
        return Content()
    }
}

export default withRouter(TxBottom);
