import React, { Component, Fragment } from 'react'
import { numberWithCommas, getIsSolo } from '../../utils/utils'
import { getTotalSupply, coinGeckoMarketCap} from '../../redux/store/iiss'
import { getSupplyMetrics } from '../../redux/api/restV3/main'

class InfoSummary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSolo: false,
        }
    }

    async componentDidMount() {
        const totalTxs = this.props.getRecentTransactions
        const payload = {page: 1, count:1, limit: 1}
        totalTxs(payload)
        let totalTx;
        const isSolo = await getIsSolo()
        const totalSupply = await getTotalSupply()
        const marketCap = await coinGeckoMarketCap()
        const supplyMetrics = await getSupplyMetrics()
        this.setState({ isSolo, totalSupply, marketCap,supplyMetrics, totalTx })
    }

    render() {
        const { tmainInfo } = this.props.info || {}
        const { icxCirculationy } = tmainInfo || {}
        const marketCapStr = numberWithCommas(Math.floor(this.state.marketCap))
        const totalSupplyStr = numberWithCommas(Math.floor(this.state.totalSupply))
        const icxCirculationStr = this.state.supplyMetrics ? numberWithCommas(Math.floor(this.state.supplyMetrics.data.circulating_supply / Math.pow(10, 18))) : 0;
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
                        <p>{numberWithCommas(this.props.recentTx.totalSize)}</p>									
                    </div>
                </li>
            </Fragment>
        )
    }
}

export default InfoSummary
