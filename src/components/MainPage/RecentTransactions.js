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
            liveTrClass: "flat"
        }
    }

    txsocket;
    // latest is the top most recent table row
    latestTx;
    // recent is the rest of the rows called from REST
    recentTx;
    async componentDidMount() {
        this.recentTx = await awaitGetRecentTx()
        this.setState({recentTx: this.recentTX})
        this.txsocket = new WebSocket('wss://explorer.icon.geometry-dev.net/ws/v1/transactions');
       
       
        this.txsocket.onopen = (event) => {
            console.log("connection established")
        }
            this.txsocket.onmessage = async (event) =>  {
            this.latestTx = event.data
            this.setState({liveTrClass:"flat"})
            // console.log(event, "entire socket event")
            this.recentTx = await awaitGetRecentTx()
            this.setState({recentTx: this.recentTx})

                try{
                    const eventObj = JSON.parse(event.data)
                     this.setState({liveTableRow: eventObj})
                     this.setState({liveTrClass:"fade"})
                 }
                 catch (e) {
                     console.log(e, "websocket error")
                 }

    

        }
    }
    
    componentWillUnmount() {
        this.txsocket? this.txsocket.close() : console.log("no websocket open")
       console.log("websocket connection closed")

    }
    render() {


        const loading = false;
        const list = this.state.recentTx ? this.state.recentTx.slice(1, 9) : this.recentTx  ?  this.recentTx.slice(1,9) : []
        const latest = this.state.liveTableRow
        const isSuccess = Number(latest.receipt_status) === 1

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
                            
                            <li key={1} className={`${this.state.liveTrClass}`}>
                                         <p className={'icon'}>T</p>
                                        <p className="a">
                                            Status
                                            <em>
                                            {isSuccess ? 'Success' : 'Fail'}
                                            </em>
                                        </p> 
                                         <p className="b">
                                            Amount
                                            <em>
                                            
                                            {latest.value? convertHexToValue(latest.value).toFixed(2): list[0]? list[0].value:null} ICX

                                            </em>
                                        </p>
                                        <p className="c"> 
                                            Hash
                                             <em>
                                                
                                                <TransactionLink to={latest.hash? latest.hash : list[0]? list[0].hash : null} label={latest.hash ? latest.hash : null} />
                                            </em>
                                        </p>
                                         <p className="d">
                                            Fee
                                            <em>
                                            {latest.transaction_fee ? convertHexToValue(latest.transaction_fee) : list[0]? list[0].transaction_fee : null} ICX
                                            </em>
                                        </p> 
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
