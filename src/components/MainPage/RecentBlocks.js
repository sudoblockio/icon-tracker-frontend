import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { numberWithCommas, getTimezoneMomentTime } from '../../utils/utils'
import { LoadingComponent, BlockLink } from '../../components'
import { blockList } from '../../redux/store/blocks'
import configJson from '../../config'

class RecentBlocks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recentBx: 0,
            liveTableRow: {},
            liveTrClass: "flat",
            play: true,
            bxRows: []
        }
    }

    bxsocket;
    // latest is the top most recent table row
    latestBx;
    // recent is the rest of the rows called from REST
    recentBx;
    bxRows = []

    async componentDidMount() {
        const blockListData = await blockList()
        this.recentBx = blockListData.data
        this.setState({recentBx: this.recentBx, bxRows: this.recentBx})

        this.bxsocket = new WebSocket("wss" + `${configJson.TRACKER_API_URL.slice(5 , configJson.TRACKER_API_URL.length)}`+"/ws/v1/blocks");
        console.log(this.state.liveTableRow, "live table row at did mount")
        this.bxsocket.onopen = (event) => {
            console.log("connection established")
            console.log(this.state.liveTableRow, "live table row at websocket open")
            // this.state.bxRows.unshift(this.state.recentBx)
        }

        this.bxsocket.onmessage = async (event) =>  {
            this.latestBx = event.data
            this.state.bxRows.unshift(JSON.parse(this.latestBx))
            this.setState({liveTrClass:"flat"})
            this.recentBx = this.state.recentBx
            this.setState({recentBx: this.recentBx})

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
        this.bxsocket? this.bxsocket.close() :console.log("no websocket open")
        console.log("websocket connection closed")
     }

     handleKeyDown = e => {
        if (e.key === 'p') {
            this.setState({play: this.state.play === true ? false : true})
            if (this.state.play === false) {
                this.bxsocket.close()
            } else {
                this.bxsocket = new WebSocket('wss://explorer.icon.geometry-dev.net/ws/v1/blocks')
                this.bxsocket.onmessage = async (event) =>  {
                    this.latestBx = event.data
                    this.setState({liveTrClass:"flat"})
                    const blockListData = await blockList()
                    this.recentBx = blockListData.data
                    this.setState({recentBx: this.recentBx})
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
        const list = this.state.recentBx ? this.state.recentBx.slice(1, 8) : this.recentBx  ?  this.recentBx.slice(1,8) : []

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
                                                <BlockLink to={latest.number? latest.number : list[0]? list[0].number : null}  label={ latest.number ? numberWithCommas(latest.number) : null } />
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
