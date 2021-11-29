import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { convertNumberToText, convertHexToValue } from '../../utils/utils'
import { LoadingComponent, TransactionLink } from '../../components'
import { transactionRecentTx } from '../../redux/store/transactions'
import configJson from '../../config'

class RecentTransactions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recentTx: 0,
            liveTableRow: {},
            liveTrClass: "flat",
            txRows: []
        }
    }

    txsocket;
    // latest is the top most recent table row
    latestTx;
    // recent is the rest of the rows called from REST
    recentTx;
    msgCounter = 0 
    txRows = []
// hit the endpoint one time
// open the websocket connection
// collect each message and push to this.txRows
// get all rows from  this.TxRows 

    async componentDidMount() {
        // hit REST when the component first mounst 
        const txListData = await transactionRecentTx()
        // save that response data , 10 rows. 
        this.recentTx = txListData.data
        // set the recent tx and 
        this.setState({recentTx: this.recentTx, txRows: this.recentTx})
        // open the websocket
        this.txsocket = new WebSocket("wss" + `${configJson.TRACKER_API_URL.slice(5 , configJson.TRACKER_API_URL.length)}`+"/ws/v1/transactions")
        this.txsocket.onopen = (event) => {
            console.log("connection established")
            // if the websocket opens, push the 10 REST rows into the instance row array, this.txRows.

            this.state.txRows.unshift(this.state.recentTx)

        }
            this.txsocket.onmessage = async (event) =>  {
                // When a new message comes in, check if the msgCounter has reset. 
            if (this.msgCounter === 0){
                this.msgCounter++ 
                // set the top row as the most recent websocket message.
                this.latestTx = event.data 
                this.state.txRows.unshift(this.latestTx)
                // flip the css class for the fade effect
            this.setState({liveTrClass:"flat"})
            // const txListData = await transactionRecentTx()
            this.recentTx = this.state.recentTx
            this.setState({recentTx: this.recentTx})
                try{
                    const eventObj = JSON.parse(event.data)
                     this.setState({liveTableRow: eventObj})
                     this.setState({liveTrClass:"fade"})
                 }
                 catch (e) {
                     console.log(e, "websocket error")
                 }

            } else {
                this.msgCounter = 0
            }
        }

    }

    componentWillUnmount() {
        this.txsocket? this.txsocket.close() : console.log("no websocket open")

    }
    
    render() {
        const loading = false;
        const list = this.state.recentTx ? this.state.recentTx.slice(1, 8) : this.recentTx  ?  this.recentTx.slice(1,8) : []
        {console.log(this.state.recentTx, "this state recent tx")}
        {console.log(this.recentTx, "this recent tx")}
        {console.log(list, "list in render")}
        const latest = this.state.liveTableRow
        const isSuccess = latest.receipt_status? Number(latest.receipt_status) === 1 : 1

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
