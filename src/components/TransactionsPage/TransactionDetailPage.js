import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    startsWith,
    findTabIndex,
    noSpaceLowerCase
} from '../../utils/utils'
import {
    TRANSACTIONS_TABS
} from '../../utils/const'
import {
	NotFound,
    TransactionInfo,
    TransactionTabs
} from '../../components'

class TransactionDetailPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            on: 0
        }
    }

    componentWillMount() {
        this.allDetailInfo(this.props.url)
    }

    componentWillReceiveProps(nextProps) {
        const { pathname: currentPath } = this.props.url
        const { pathname: nextPath } = nextProps.url
        if (currentPath !== nextPath && startsWith(nextPath, '/transaction')) {
            this.allDetailInfo(nextProps.url)
            return
        }

        const { hash: currentHash } = this.props.url
        const { hash: nextHash } = nextProps.url
        if (currentHash !== nextHash) {
            this.setTab(findTabIndex(TRANSACTIONS_TABS, nextHash))
        }
    }

    allDetailInfo = (url) => {
        const txHash = url.pathname.split("/")[2]
        if (txHash) {
            this.props.transactionTxDetail({ txHash })
            this.setTab(findTabIndex(TRANSACTIONS_TABS, url.hash), txHash)
        }
	}
	
    setTab = (_index, _txHAsh) => {
        if (_index !== -1) {
            window.location.hash = noSpaceLowerCase(TRANSACTIONS_TABS[_index])
        }
        const index = _index !== -1 ? _index : 0
        this.setState({ on: index }, () => {
			const txHash = _txHAsh ? _txHAsh : this.props.url.pathname.split("/")[2]
			// TODO 맞추기
			const page = 1, count = 10
            switch (index) {
				case 0:
					this.props.transactionEventLogList({ txHash, page, count })
                    break
                default:
            }
        })
    }

	render() {
        const { transaction } = this.props
        const { loading, error } = transaction

        const Content = () => {
            if (!loading && error) {
                return <NotFound error={error} />
            }
            else {
                return (
                    <div className="content-wrap">
                        <TransactionInfo transaction={transaction} />
                        <TransactionTabs {...this.props} {...this.state} setTab={this.setTab} />
                    </div>
                )
            }
        }

        return Content();
	}
}

export default withRouter(TransactionDetailPage);
