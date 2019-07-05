import React, { Component, Fragment } from 'react'
import { numberWithCommas, convertNumberToText, getIsSolo } from 'utils/utils'

class InfoSummary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSolo: false,
        }
    }

    async componentDidMount() {
        const isSolo = await getIsSolo()
        this.setState({ isSolo })
    }

    render() {
        const { tmainInfo } = this.props.info || {}
        const { icxSupply, marketCap, transactionCount, icxCirculationy } = tmainInfo || {}
        const marketCapStr = numberWithCommas(Math.floor(marketCap))
        return (
            <Fragment>
                <li>
                    <p className="subTitle">Market Cap(USD)</p>
                    <p className={`num a ${marketCapStr.length >= 17 && 'small'}`}>{marketCapStr}</p>
                </li>
                <li>
                    <p className="subTitle">ICX Supply</p>
                    <p className="num b">{numberWithCommas(icxSupply)}</p>
                </li>
                <li>
                    <p className="subTitle">ICX Circulation</p>
                    <p className="num c">{convertNumberToText(icxCirculationy, 0)}</p>
                </li>
                <li>
                    <p className="subTitle">All Transactions</p>
                    <p>{numberWithCommas(transactionCount)}</p>
                </li>
            </Fragment>
        )
    }
}

export default InfoSummary
