import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { convertNumberToText, convertHexToValue } from '../../utils/utils'
import { awaitGetRecentTx } from '../../redux/api/restV3/iiss'
import { LoadingComponent, TransactionLink } from '../../components'



// potential web socket pattern:
// when the component mounts, establish a connection.
// when there is a message from the web socket (a new block or transaction),
// populate entire recent block or recent tx component by hitting new data, NOT RERENDERING ENTIRE PAGE
// make the first row of the table a special class that increases opacity percentage (fade in)



class RecentTransactions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recentTx: 0
        }
    }
    async componentDidMount() {
        const recentTx = await awaitGetRecentTx()
        this.setState({recentTx})
        const txsocket = new WebSocket('wss://echo.websocket.org');
        console.log(txsocket)
        txsocket.onopen = function(event) {
            console.log("connection established")
        }
    }
    render() {

        const loading = false;
        const list = this.state.recentTx ? this.state.recentTx.slice(0, 10) : []
        
        return (
            <li className="right">
                <p className="title">Transactions</p>
                <div className="list-group">
                    {loading ? (
                        <div style={{ height: '511px' }}>
                            <LoadingComponent />
                        </div>
                    ) : (
                        <ul className="list" style={{ height: list.length === 0 ? 511 : '' }}>
                            {list.map((tx, index) => {
                                const { hash, value, transaction_fee, receipt_status } = tx
                                const isSuccess = Number(receipt_status) === 1
                                return (
                                    <li key={index}>
                                        <p className={`icon ${!isSuccess ? 'fail' : ''}`}>T</p>
                                        <p className="a">
                                            Status
                                            <em>
                                                {isSuccess ? 'Success' : 'Fail'}
                                            </em>
                                        </p>
                                        <p className="b">
                                            Amount
                                            <em>
                                            {convertHexToValue(value).toFixed(2)} ICX
                                            </em>
                                        </p>
                                        <p className="c">
                                            Hash
                                            <em>
                                                <TransactionLink to={hash} label={hash} />
                                            </em>
                                        </p>
                                        <p className="d">
                                            Fee
                                            <em>
                                                {convertHexToValue(transaction_fee)} ICX
                                            </em>
                                        </p>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
                <Link to="/transactions">
                    <p className="all">View all</p>
                </Link>
            </li>
        )
    }
}

export default RecentTransactions
