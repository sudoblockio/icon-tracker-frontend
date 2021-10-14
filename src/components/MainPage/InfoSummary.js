import React, { Component, Fragment } from 'react'
import { numberWithCommas, convertNumberToText, getIsSolo } from '../../utils/utils'
import { getTotalSupply, coinGeckoMarketCap, getAllTransactions } from '../../redux/api/restV3/iiss'

class InfoSummary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSolo: false,
        }
    }

    async componentDidMount() {
        const isSolo = await getIsSolo()
        const totalSupply = await getTotalSupply()
        const marketCap = await coinGeckoMarketCap()
        const allTransactions = await getAllTransactions()
        this.setState({ isSolo, totalSupply, marketCap, allTransactions })
    }

    render() {
        const { tmainInfo } = this.props.info || {}
        const { icxCirculationy } = tmainInfo || {}
        const marketCapStr = numberWithCommas(Math.floor(this.state.marketCap))
        const totalSupplyStr = numberWithCommas(Math.floor(this.state.totalSupply))
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
                        <p>{convertNumberToText(icxCirculationy, 0)}</p>									
                    </div>
                </li>
                <li>
                    <div>
                        <span><i className="img">T</i></span>
                        <p>All Transactions</p>
                        <p>{numberWithCommas(this.state.allTransactions)}</p>									
                    </div>
                </li>
            </Fragment>
        )
    }
}

export default InfoSummary
