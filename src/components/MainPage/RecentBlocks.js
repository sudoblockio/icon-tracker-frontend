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
            console.log(event.data, "latest block")
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
        const list = this.state.recentTx ? this.state.recentBx.slice(1, 10) : this.recentBx  ?  this.recentBx.slice(1,10) : []
        const latest = this.state.liveTableRow
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
                                                <BlockLink to={latest.number? latest.number : list[0]? list[0].number : null} label={latest.number ? latest.number : null} label={latest.number? latest.number : list[0]? list[0].number : null} label={latest.number ? latest.number : null} />
                                            </em>
                                        </p>
                                        <p className="b">
                                            Transactions
                                            {/* <em>{numberWithCommas(transaction_count)}</em> */}
                                        </p>
                                        <p className="c">
                                            Hash
                                            <em>
                                                {/* <BlockLink to={number} label={hash} /> */}
                                            </em>
                                        </p>
                                        <p className="d">
                                            Time (UTC+9)
                                            {/* <em>{getTimezoneMomentTime(createDate)}</em> */}
                                        </p>
                                    </li>

                            {list.map((block, index) => {
                                const { number, createDate, hash, transaction_count } = block
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
                                            <em>{getTimezoneMomentTime(createDate)}</em>
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
