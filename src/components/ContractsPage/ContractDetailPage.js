import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    startsWith,
    findTabIndex,
    noSpaceLowerCase
} from '../../utils/utils'
import {
    CONTRACT_TABS
} from '../../utils/const'
import {
    NotFound,
    ContractInfo,
    ContractTabs
} from '../../components'

class ContractDetailPage extends Component {

    constructor(props) {
        super(props)
        this.addr = ''
        this.state = {
            on: 0
        }
    }

    componentWillMount() {
        const { pathname, hash } = this.props.url
        const index = findTabIndex(CONTRACT_TABS, hash)
        this.setState({ on: index },
          () => {
            this.allDetailInfo(pathname)
          }
        )
      }
    
    componentWillReceiveProps(nextProps) {
        const { pathname: current } = this.props.url
        const { pathname: next } = nextProps.url
        if (current !== next && startsWith(next, '/contract')) {
            this.allDetailInfo(next)
        }
    }

    allDetailInfo = (pathname) => {
        this.addr = pathname.split("/")[2]
        const { addr } = this
        if (addr) {
            this.props.contractInfo({ addr })
            this.setTab(this.state.on)
        }
    }

    setTab = (index) => {
        window.location.hash = noSpaceLowerCase(CONTRACT_TABS[index])
        this.setState({ on: index }, () => {
            const { addr } = this
            switch (index) {
                case 0:
                    this.props.contractTxList({ addr, page: 1, count: 10 })
                    break
                case 1:
                    this.props.contractTokenTxList({ addr, page: 1, count: 10 })
                    break
                case 2:
                    this.props.icxGetScore({ address: addr })
                    break
                case 3:
                    this.props.readContractInformation({ address: addr })
                    break
                case 4:
                    this.props.contractEventLogList({ address: addr, page: 1, count: 10  })
                    break
                default:
            }
        })
    }

    render() {
        const { contract } = this.props
        const { loading, error } = contract

        const Content = () => {
            if (!loading && error) {
                return <NotFound error={error} />
            }
            else {
                return (
                    <div className="content-wrap">
                        <ContractInfo contract={contract} />
                        <ContractTabs {...this.props} {...this.state} setTab={this.setTab}/>
                    </div>
                )
            }
        }

        return Content();
    }
}

export default withRouter(ContractDetailPage);
