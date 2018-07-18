import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    LoadingComponent,
    TxTableHead,
    TxTableBody,
    NoBox,
    TxBottomTitle
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
            totalSize,
            loading
        } = txData
        
        const Content = () => {
            if (loading) {
                return (
                    <LoadingComponent height='349px' />
                )
            }
            else if (data.length === 0) {
                return (
                    <NoBox text={noBoxText} />
                )
            }
            else {
                return (
                    <div className="contents">
                        <TxBottomTitle 
                            txType={txType}
                            listSize={listSize}
                            totalSize={totalSize}
                            goAllTx={goAllTx}
                        />
                        <table className={tableClassName}>
                            <thead>
                                <TxTableHead 
                                    txType={txType}
                                />
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
