import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { convertNumberToText, convertHexToValue } from '../../utils/utils'
import { awaitGetRecentTx } from '../../redux/store/iiss'
import { LoadingComponent, TransactionLink } from '../../components'



class RecentTransactions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recentTx: 0,
            liveTableRow: {},
            liveTrClass: "fade"
        }
    }

    // initialize 
    txsocket;
    latestTx;
    async componentDidMount() {
        const recentTx = await awaitGetRecentTx()
        this.setState({recentTx})
        this.txsocket = new WebSocket('wss://explorer.icon.geometry-dev.net/ws/v1/blocks');
        console.log(this.txsocket)
        this.txsocket.onopen = (event) => {
            console.log("connection established")
        }
        this.txsocket.onmessage = (event) =>  {
            this.latestTx = event.data
            this.setState({liveTrClass:"fade"})
            
            // this.setState({liveTableRow: event.data})
            // console.log(this.latestTx, "this")
            try{
               const eventObj = JSON.parse(event.data)
                this.setState({liveTableRow: eventObj})
                this.setState({liveTrClass:"flat"})
                console.log("hit the try block")
                
            }
            catch (e) {
                console.log(e, "websocket error")
            }
        }
    }

    componentWillUnmount() {
       this.txsocket.close()
    }
    render() {

        const loading = false;
        const list = this.state.recentTx ? this.state.recentTx.slice(0, 10) : []
        const latest = this.state.liveTableRow
        console.log(latest.hash, "the latest")
        console.log(this.state.liveTrClass, "the class in use")

        return (
            <li className="right">
                <p className="title">Transactions</p>
                <div className="list-group">
                    {loading ? (
                        <div style={{ height: '511px' }}>
                            <LoadingComponent />
                        </div>
                    ) : (
                        <ul className={`list ${this.state.liveTrClass}`} style={{ height: list.length === 0 ? 511 : '' }}>
                            <li key={1}>
                                        {/* <p className={`icon ${!isSuccess ? 'fail' : ''}`}>T</p>
                                        <p className="a">
                                            Status
                                            <em>
                                                {isSuccess ? 'Success' : 'Fail'}
                                            </em>
                                        </p> */}
                                        {/* <p className="b">
                                            Amount
                                            <em>
                                            {convertHexToValue(value).toFixed(2)} ICX
                                            </em>
                                        </p> */}
                                        <p className="c"> 
                                            Hash
                                             <em>
                                                <TransactionLink to={latest.hash? latest.hash : null} label={latest.hash ? latest.hash : null} />
                                            </em>
                                        </p>
                                        {/* <p className="d">
                                            Fee
                                            <em>
                                                {convertHexToValue(transaction_fee)} ICX
                                            </em>
                                        </p> */}
                             </li>
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
