import React, { Component, Fragment, useState, useEffect } from 'react'
import { numberWithCommas, getIsSolo } from '../../utils/utils'
import { getTotalSupply, coinGeckoMarketCap} from '../../redux/store/iiss'
import { getSupplyMetrics } from '../../redux/api/restV3/main'

function InfoSummary(props) {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         isSolo: false,
    //     }
    // }
    const [isSolo, setIsSolo] = useState(false)
    const [totalTxs, setTotalTxs] = useState("")
    const [totalSupply, setTotalSupply] = useState("")
    const [marketCap, setMarketCap] = useState("")
    const [supplyMetrics, setSupplyMetrics] = useState("")
    
    const checkData = async () => {
        const isSoloData = await getIsSolo()
        setIsSolo(isSoloData)
        const totalSupplyData = await getTotalSupply()
        setTotalSupply(totalSupplyData)
        const marketCapData = await coinGeckoMarketCap()
        setMarketCap(marketCapData)
        const supplyMetricsData = await getSupplyMetrics()
        setSupplyMetrics(supplyMetricsData)
        
    }

    useEffect(() => {
        checkData()
    })

    // async componentDidMount() {
    //     const totalTxs = this.props.getRecentTransactions
    //     totalTxs(payload)
    //     let totalTx;
    //     this.setState({ isSolo, totalSupply, marketCap,supplyMetrics, totalTx })
    // }
    
    const { tmainInfo } = props.info || {}
    const { icxCirculationy } = tmainInfo || {}
    const marketCapStr = numberWithCommas(Math.floor(marketCap))
    const totalSupplyStr = numberWithCommas(Math.floor(totalSupply))
    const icxCirculationStr = supplyMetrics ? numberWithCommas(Math.floor(supplyMetrics.data.circulating_supply / Math.pow(10, 18))) : 0;
    
        return (
            <Fragment>
                <li>
                    <div>
                        <span className="usd"><i className="img"></i></span>
                        <p>Market Cap <em>(USD)</em></p>
                        <p>{marketCapStr}</p>									
                    </div>
                </li>
                <li>
                    <div>
                        <span className="icx"><i className="img"></i></span>
                        <p>ICX Supply</p>
                        <p>{totalSupplyStr}</p>									
                    </div>
                </li>
                <li>
                    <div>
                        <span className="icx"><i className="img"></i></span>
                        <p>ICX Circulation</p>
                        <p>{numberWithCommas(icxCirculationStr)}</p>									
                    </div>
                </li>
                <li>
                    <div>
                        <span><i className="img">T</i></span>
                        <p>All Transactions</p>
                        <p>{numberWithCommas(props.recentTx.totalSize)}</p>									
                    </div>
                </li>
            </Fragment>
        )
    
}

export default InfoSummary
