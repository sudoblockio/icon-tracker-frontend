import React, {Fragment, useState, useEffect } from 'react'
import { numberWithCommas, getIsSolo } from '../../utils/utils'
import { getTotalSupply, coinGeckoMarketCap} from '../../redux/store/iiss'
import { getSupplyMetrics } from '../../redux/api/restV3/main'
import {transactionRecentTx} from '../../redux/store/transactions'

function InfoSummary(props) {

    const [recentTx, setRecentTx] = useState("")
    const [setIsSolo] = useState(false)
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

        const recentTxData = await transactionRecentTx()
        setRecentTx(recentTxData? recentTxData.headers["x-total-count"] : 0)
    }
    
    const marketCapStr = numberWithCommas(Math.floor(marketCap))
    const totalSupplyStr = numberWithCommas(Math.floor(totalSupply))
    const icxCirculationStr = supplyMetrics ? numberWithCommas(Math.floor(supplyMetrics.data.circulating_supply / Math.pow(10, 18))) : 0;
    
    useEffect(() => {
        checkData()
    }, [])
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
                        <p>{numberWithCommas(recentTx)}</p>									
                    </div>
                </li>
            </Fragment>
        )
    
}

export default InfoSummary
