import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { numberWithCommas } from '../../utils/utils'
import { LoadingComponent, BlockLink } from '../../components'
import { blockList } from '../../redux/store/blocks'
import configJson from '../../config'

class RecentBlocks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recentBx: [],
            liveTableRow: {},
            liveTrClass: "flat",
            play: true,
            bxRows: [],
            loading: true,
            
        }
    }

    bxsocket;
    latestBx;
    recentBx;
    msgCounter = 0
    bxRows = []

    async componentDidMount() {
        // const blockListData = await blockList()
        // this.recentBx = blockListData.data
        // this.setState({recentBx: this.recentBx, bxRows: blockListData.data})

        this.bxsocket = new WebSocket(`${configJson.TRACKER_WS_URL}`+"/ws/v1/blocks");
        
        this.bxsocket.onopen = async (event) => {
          console.log("connection established");
        //   this.state.bxRows
        //     ? this.state.bxRows.unshift(this.state.recentBx)
        //     : console.log("no rows");

          this.setState({loading:false})
          const blockListData = await blockList()
          this.recentBx = blockListData.data
          this.setState({recentBx: blockListData.data.slice(0,8), bxRows: blockListData.data})
        }

        this.bxsocket.onmessage = async (event) =>  {
            this.setState({liveTrClass:"flat"})

                // this.latestBx = event.data 
                // this.state.bxRows? this.state.bxRows.unshift(JSON.parse(this.latestBx)) : console.log("no tx rows")

                  this.setState((prev) => {
                    const newArray = [
                      { ...JSON.parse(event.data), isNew: true },
                    ]
                      .concat(prev.recentBx)
                      .slice(0, 8);
                    return { recentBx: newArray };
                  });

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


        }
    }

    componentWillUnmount() {
        this.bxsocket? this.bxsocket.close() :console.log("no websocket open")
        console.log("websocket connection closed")
     }

     handleKeyDown = e => {
        if (e.key === 'i') {
            this.setState({play: this.state.play === true ? false : true})
            if (this.state.play === false) {
                this.bxsocket.close()
            } else {
                this.bxsocket = new WebSocket("wss" + `${configJson.TRACKER_API_URL.slice(5 , configJson.TRACKER_API_URL.length)}`+"/ws/v1/blocks");
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
        const loading = this.state.loading;
        const list = this.state.recentBx;
        const latest = this.state.liveTableRow

        console.log({loading})

        return (
            <li className="left">
                <p className="title">Blocks</p>
                <div className="list-group">
                    {loading ? (
                        <div style={{ height: '522px' }}>
                            <LoadingComponent />
                        </div>
                    ) : (
                        
                        <ul className={"list"} style={{ height: list.length === 0 ? 511 : '' }}>
                                {/* <li key={1}  className={`${this.state.liveTrClass}`}>
                                        <p className="icon">B</p>
                                        <p className="a">
                                            Block
                                            <em>
                                                <BlockLink to={latest.number? latest.number : list[0] ? list[0].number : null}  label={ latest.number ? numberWithCommas(latest.number) : list[0] ? numberWithCommas(list[0].number) : null } />
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
                                            <em>{latest.timestamp? new Date(latest.timestamp / 1000).toLocaleTimeString() : list[0]? new Date(list[0].timestamp / 1000).toLocaleTimeString(): null}</em>
                                        </p>
                                </li> */}

                            {list.map((block, index) => {
                                const { number, hash, transaction_count, timestamp } = block
                                const time = timestamp !== undefined? timestamp : new Date()
                                    return (
                                      <li
                                        key={index} className={ block.isNew ? `fade-in-anim` : ""}
                                      >
                                        <p className="icon">B</p>
                                        <p className="a">
                                          Block
                                          <em>
                                            <BlockLink
                                              to={number || latest.number - 1}
                                              label={
                                                numberWithCommas(number) ||
                                                numberWithCommas(
                                                  latest.number - 1
                                                )
                                              }
                                            />
                                          </em>
                                        </p>
                                        <p className="b">
                                          Transactions
                                          <em>
                                            {numberWithCommas(
                                              transaction_count ||
                                                latest.transaction_count
                                            )}
                                          </em>
                                        </p>
                                        <p className="c">
                                          Hash
                                          <em>
                                            <BlockLink
                                              to={number || latest.number - 1}
                                              label={hash || latest.hash}
                                            />
                                          </em>
                                        </p>
                                        <p className="d">
                                          Time (UTC+9)
                                          <em>
                                            {new Date(
                                              time / 1000
                                            ).toLocaleTimeString()}
                                          </em>
                                        </p>
                                      </li>
                                    ); 
                              

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
