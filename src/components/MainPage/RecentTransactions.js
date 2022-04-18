import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { convertHexToValue, numberWithCommas } from '../../utils/utils'
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
            play: true,
            txRows: []
        }
    }
    txsocket;
    latestTx;
    recentTx;
    msgCounter = 0 
    txRows = []

    async componentDidMount() {
        const txListData = await transactionRecentTx()
        this.recentTx = txListData.data
        this.setState({recentTx: this.recentTx, txRows: txListData.data})
        this.txsocket = new WebSocket(`${configJson.TRACKER_WS_URL}`+"/ws/v1/transactions");
        
        this.txsocket.onopen = () => {
            this.state.txRows? this.state.txRows.push(this.state.recentTx) : console.log("no rows")
        };

            this.txsocket.onmessage = async (event) =>  {
                this.setState({liveTrClass:"flat"})

                this.latestTx = event.data 
                this.state.txRows? this.state.txRows.unshift(JSON.parse(this.latestTx)) : console.log("no tx rows")
                try{
                    if (this.msgCounter === 0){
                        this.msgCounter++ 
                    const eventObj = JSON.parse(event.data)
                     this.setState({liveTableRow: eventObj})
                     this.setState({liveTrClass:"fade"})
                    } else {
                        this.msgCounter = 0
                    }
                 }
                 catch (e) {
                     console.log(e, "websocket error")
                 }


        }/*, 500)*/
    }
    componentWillUnmount() {
        this.txsocket? this.txsocket.close() : console.log("no websocket open")
    }
    handleKeyDown = e => {
        if (e.key === 'i') {
            this.setState({play: this.state.play === true ? false : true})
            if (this.state.play === false) {
                this.txsocket.close()
            } else {
                this.txsocket = new WebSocket(`${configJson.TRACKER_WS_URL}`+"/ws/v1/transactions");
                this.txsocket.onmessage = async (event) =>  {
                    this.latestTx = event.data
                    this.setState({liveTrClass:"flat"})
                    const txListData = await transactionRecentTx()
                    this.recentTx = txListData.data
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
        }
        
    }
    render() {
        document.addEventListener('keydown', this.handleKeyDown)
        const loading = false;
        const list = this.state.recentTx ? this.state.recentTx.slice(1, 8) : this.recentTx  ?  this.recentTx.slice(1,8) : []
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
                            
                            <li key={1}  className={`${this.state.liveTrClass}`}>
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
                                            
                                            {latest.value? numberWithCommas(convertHexToValue(latest.value).toFixed(2)): list[0]? convertHexToValue(list[0].value) :null} ICX

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
                                            {latest.transaction_fee ? convertHexToValue(latest.transaction_fee) : list[0]? convertHexToValue(list[0].transaction_fee)  : null} ICX
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
