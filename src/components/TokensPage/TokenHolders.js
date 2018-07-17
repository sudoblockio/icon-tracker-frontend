import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { 
    LoadingComponent, 
    AddressTableBody,
    NoBox
} from '../../components'
import { TX_TYPE } from '../../utils/const'

// TODO LoadingComponent 추가 필요
class TokenHolders extends Component {
    
    render() {   
        const Contents = (_data, _totalData, _loading) => {
            if (_loading) {
                return (
                    <LoadingComponent height='349px'/>
                )
            }
            else if (_data.length === 0) {
                return (
                    <NoBox text='No Holder'/>
                )
            }
            else {
                return (
                    <div className="contents">
                        <p className="txt"><span>Top<em className="mint" onClick={this.props.goAllTx}>{_totalData} Holders</em><em className="gray">(from a total of 999,999 holders)</em></span></p>
                        <table className="table-typeM">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Address</th>
                                    <th>Quantity</th>
                                    <th>Percentage<em>%</em></th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                _data.map((holder, index) => (
                                    <AddressTableBody key={index} txType={TX_TYPE.TOKEN_HOLDERS} data={holder} />
                                ))
                            }                     
                            </tbody>
                        </table>
                    </div>
                )            
            }
        }

        const { tokenHolders } = this.props 
        const { data, totalData, loading } = tokenHolders
        return Contents(data, totalData, loading)
    }
}

export default withRouter(TokenHolders);
