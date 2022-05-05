import React, {Fragment, useState, useEffect } from 'react'
import { numberWithCommas, getIsSolo } from '../../utils/utils'
import {getTotalSupply, coinGeckoCurrentUSD, getBalance} from '../../redux/store/iiss'
import {transactionRecentTx} from '../../redux/store/transactions'

function InfoSummary(props) {

    const [recentTx, setRecentTx] = useState("")
    const [isSolo, setIsSolo] = useState(false)
    const [totalSupply, setTotalSupply] = useState("")
    const [currentPrice, setCurrentPrice] = useState("")
    const [burnData, setBurnData] = useState("")

    const checkData = async () => {
        const isSoloData = await getIsSolo()
        setIsSolo(isSoloData)

        const totalSupplyData = await getTotalSupply()
        setTotalSupply(totalSupplyData)

        // Burn address balance
        const burnWalletBalance = await getBalance("hx1000000000000000000000000000000000000000")
        setBurnData(burnWalletBalance)

        const currentPrice = await coinGeckoCurrentUSD()
        setCurrentPrice(currentPrice)

        const recentTxData = await transactionRecentTx()
        setRecentTx(recentTxData? recentTxData.headers["x-total-count"] : 0)
    }

    const normalizedTotalSupply = Number(totalSupply / Math.pow(10, 18))
    const marketCapStr = numberWithCommas(Math.floor((normalizedTotalSupply - Number(burnData) / Math.pow(10, 18)) * currentPrice))
    const icxCirculationStr = normalizedTotalSupply ? numberWithCommas(Math.floor(normalizedTotalSupply - Number(burnData) / Math.pow(10, 18))) : 0;
    const totalSupplyStr = numberWithCommas(Math.floor(normalizedTotalSupply))

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
