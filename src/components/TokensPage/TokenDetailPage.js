import React, { Component } from 'react';
import {
    startsWith
} from '../../utils/utils'
import {
    NotFound,
    TokenSummary,
    TokenTabs
} from '../../components'

class TokenDetailPage extends Component {
    componentWillMount() {
        this.allTokenInfo(this.props.url.pathname)
    }

    componentWillReceiveProps(nextProps) {
        const current = this.props.url.pathname
        const next = nextProps.url.pathname
        if (current !== next && startsWith(next, '/token')) {
            this.allTokenInfo(next)
        }
    }

    allTokenInfo = (pathname) => {
        const contractAddr = pathname.split("/")[2]
        this.props.tokenSummary({ contractAddr })
        this.props.tokenTransfersList({ contractAddr, page: 1, count: 10 })
    }

    render() {
        const {
            token,
            tokenTransfers,
            tokenHolders,
        } = this.props;

        const {
            loading,
            error
        } = token

        console.log(this.props)

        const Content = () => {
            if (!loading && error) {
                return (
                    <NotFound error={error}/>
                )
            }
            else {
                return (
                    <div className="content-wrap">
                        <TokenSummary
                            token={token}
                        />
                    <TokenTabs
                        token={token}
                        tokenTransfers={tokenTransfers}
                        tokenHolders={tokenHolders}
                        tokenTransfersList={this.props.tokenTransfersList}
                        tokenHoldersList={this.props.tokenHoldersList}
                    />
                    </div>
                )
            }
        }

        return Content();
    }
}

export default TokenDetailPage;
