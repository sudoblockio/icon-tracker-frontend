import React, { Component } from 'react';
import {
    startsWith,
    findTabIndex
} from '../../utils/utils'
import {
    TOKEN_TABS
} from '../../utils/const'
import {
    NotFound,
    TokenSummary,
    TokenTabs
} from '../../components'

class TokenDetailPage extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            initialTab: 0
        }
    }

    componentWillMount() {
        const { pathname, hash } = this.props.url
        this.allDetailInfo(pathname)
        this.setState({ initialTab: findTabIndex(TOKEN_TABS, hash) })
    }

    componentWillReceiveProps(nextProps) {
        const { pathname: current } = this.props.url
        const { pathname: next } = nextProps.url
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
                        <TokenSummary token={token}/>
                        <TokenTabs {...this.props} {...this.state}/>
                    </div>
                )
            }
        }

        return Content();
    }
}

export default TokenDetailPage;
