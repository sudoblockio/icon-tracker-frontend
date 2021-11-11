import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { numberWithCommas, getTimezoneMomentTime } from '../../utils/utils'
import { awaitGetRecentBlocks } from '../../redux/store/iiss'
import { LoadingComponent, BlockLink } from '../../components'

class RecentBlocks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recentBx: 0,
            liveTableRow: {},
            liveTrClass: "flat"
        }
    }

    bxsocket;
    latestBx;
    recentBx;

    async componentDidMount() {
        this.recentBx = await awaitGetRecentBlocks()
        this.setState({recentBx: this.recentTx})
        this.bxsocket = new WebSocket('wss://explorer.icon.geometry-dev.net/ws/v1/blocks');
    this.bxsocket.onopen = (event) => {
            console.log("connection established")
        }
        this.bxsocket.onmessage = async (event) =>  {
            this.latestBx = event.data
            this.setState({liveTrClass:"flat"})
            this.recentBx = await awaitGetRecentBlocks()
            this.setState({recentBx: this.recentBx})
            // this.setState({liveTableRow: event.data})
            // console.log(this.latestTx, "this")

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
        this.bxsocket.close()
     }
    render() {
        const loading = false;
        const list = this.state.recentTx ? this.state.recentBx.slice(1, 9) : this.recentBx  ?  this.recentBx.slice(1,9) : []
        const latest = this.state.liveTableRow
        console.log(latest, "the latest")
        return (
            <li className="left">
                <p className="title">Blocks</p>
                <div className="list-group">
                    {loading ? (
                        <div style={{ height: '511px' }}>
                            <LoadingComponent />
                        </div>
                    ) : (
                        
                        <ul className={"list"} style={{ height: list.length === 0 ? 511 : '' }}>
                                <li key={1}  className={`${this.state.liveTrClass}`}>
                                        <p className="icon">B</p>
                                        <p className="a">
                                            Block
                                            <em>
                                                <BlockLink to={latest.number? latest.number : list[0]? list[0].number : null}  label={ numberWithCommas(latest.number ? latest.number : null) } />
                                            </em>
                                        </p>
                                        <p className="b">
                                            Transactions
                                            <em>{numberWithCommas(latest.transaction_count? latest.transaction_count : list[0]? list[0].transaction_count : null)}</em>
                                        </p>
                                        <p className="c">
                                            Hash
                                            <em>
                                                <BlockLink to={latest.number? latest.number : list[0]? list[0].number : null} label={latest.hash? latest.hash : list[0]? list[0].hash : null} />
                                            </em>
                                        </p>
                                        <p className="d">
                                            Time (UTC+9)
                                            {/*  */}
                                            <em>{latest.timestamp? new Date(latest.timestamp / 1000).toLocaleTimeString() : list[0]? new Date(list[0].timestamp / 1000).toLocaleTimeString(): null}</em>
                                        </p>
                                    </li>

                            {list.map((block, index) => {
                                const { number, createDate, hash, transaction_count, timestamp } = block
                                return (
                                    <li key={index}>
                                        <p className="icon">B</p>
                                        <p className="a">
                                            Block
                                            <em>
                                                <BlockLink to={number} label={numberWithCommas(number)} />
                                            </em>
                                        </p>
                                        <p className="b">
                                            Transactions
                                            <em>{numberWithCommas(transaction_count)}</em>
                                        </p>
                                        <p className="c">
                                            Hash
                                            <em>
                                                <BlockLink to={number} label={hash} />
                                            </em>
                                        </p>
                                        <p className="d">
                                            Time (UTC+9)

                                            <em>{ new Date(timestamp / 1000).toLocaleTimeString()}</em>
                                        </p>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
                <Link to="/blocks">
                    <p className="all">
                        View all
                        <em className="img" />
                    </p>
                </Link>
            </li>
        )
    }
}

export default RecentBlocks
