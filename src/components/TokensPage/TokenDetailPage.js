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
        this.allDetailInfo(this.props.url.pathname)
    }

    componentWillReceiveProps(nextProps) {
        const current = this.props.url.pathname
        const next = nextProps.url.pathname
        if (current !== next && startsWith(next, '/token')) {
            this.allDetailInfo(next)
        }
    }

    allDetailInfo = (pathname) => {
        const contractAddr = pathname.split("/")[2]
        if (contractAddr) {
            this.props.tokenSummary({ contractAddr })
            this.props.tokenTransfersList({ contractAddr, page: 1, count: 10 })
        }
    }

    render() {
        const { token } = this.props;
        const { loading, error } = token

        const Content = () => {
            if (!loading && error) {
                return (
                    <NotFound error={error} />
                )
            }
            else {
                return (
                    <div className="content-wrap">
                        <TokenSummary token={token} />
                        <TokenTabs {...this.props} />
                    </div>
                )
            }
        }

        return Content();
    }
}

export default TokenDetailPage;
