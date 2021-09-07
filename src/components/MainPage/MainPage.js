import React, { Component } from 'react'
import { InfoSummary, RecentBlocks, RecentTransactions, SearchInput } from '../../components'
import { search } from '../../redux/actions/searchActions';
import { blockList } from '../../redux/store/blocks'
import { txList } from '../../redux/store/transactions'
import { connect } from 'react-redux'


class MainPage extends Component {

    state = {
        'value': '',
        'focused': 'false'
    }
    input = null
    notFocus = true
    focused = false

    handleChange = e => {
        const { value } = e.target
        this.setState({ value })
    }

    handleKeyDown = e => {
        if (e.key === 'Enter') {
            this.props.search(this.state.value)
        }
        if (e.key === 'Escape') {
            this.setState({ value: '' }, () => {
                this.input.blur()
            })
        }
    }

    componentWillMount() {
        const payload = {count: 10, page: 1}
        this.props.blockList(payload)
        this.props.txList(payload)
    }

    render() {
        return (
            <div className="content-wrap">
                <div className="screen2">
                    <div className="wrap-holder">
                        <div className="content">
                            <p>ICON Blockchain Explorer</p>
                            <div className="search-group txt fixing">
                                < SearchInput />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="screen0">
                    <div className="wrap-holder">
                        <ul className="content">
                            <InfoSummary {...this.props} />
                        </ul>
                    </div>
                </div>
                <div className="screen1">
                    <div className="bg">
                        <div className="wrap-holder">
                            <ul className="content">
                                <RecentBlocks {...this.props} />
                                <RecentTransactions {...this.props} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
        return {
            blocks: state.blocks.blocks.data,
            transactions: state.transactions.recentTx
        }
}

function mapDispatchToProps(dispatch) {
    return {
        search: param => dispatch(search(param)),
        blockList: payload => dispatch(blockList(payload)),
        txList: payload => dispatch(txList(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
