import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { startsWith } from '../../utils/utils'
import { 
    TokenSummary,
    TokenTabs
} from '../../components'

class TokenDetailPage extends Component {
    constructor(props) {
        super(props)
        this.contractAddr = ''
    }

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
        this.contractAddr = pathname.split("/")[2]
        const { contractAddr } = this
        this.props.tokenGetTokenSummary({ contractAddr })
        this.props.tokenGetTokenTransfers({ contractAddr, page: 1, count: 10 })
    }

    render() {
        const { contractAddr } = this
        const { token, tokenTransfers, tokenHolders } = this.props        
        return (
            <div className="content-wrap">
                <TokenSummary token={token}/>
                <TokenTabs
                    loading={token.loading}
                    contractAddr={contractAddr}
                    tokenTransfers={tokenTransfers}
                    tokenHolders={tokenHolders}
                    tokenGetTokenTransfers={this.props.tokenGetTokenTransfers}
                    tokenGetTokenHolders={this.props.tokenGetTokenHolders}
                />           
            </div>
        )
    }
}

export default withRouter(TokenDetailPage);
