import React, { Component } from 'react'
import TokenSummary from './TokenSummary'
import TokenTabs from './TokenTabs'
import { DetailPage } from '../../../components'
import { TOKEN_TABS } from '../../../utils/const'
import { tokenTransfersList } from '../../../redux/api/restV3/token'

class TokenDetailPage extends Component {
    holderData
    async componentDidMount() {
        this.holderData = await tokenTransfersList({
            contractAddr: this.props.match.params.tokenId,
        })
    }

    render() {
        const { token } = this.props
        const { loading, error } = token
        console.log('props check for contracts')
        console.log(this.props)

        return (
            <DetailPage
                {...this.props}
                loading={loading}
                error={error}
                TABS={TOKEN_TABS}
                ROUTE="/token"
                getInfo={(contractAddr) => {
                    this.props.tokenSummary({ contractAddr })
                }}
                getList={[
                    (contractAddr) => {
                        this.props.contractTxList({ addr: contractAddr, page: 1, count: 10 })
                    },
                    (contractAddr) => {
                        this.props.tokenTransfersList({ contractAddr, page: 1, count: 10 })
                    },
                    (contractAddr) => {
                        this.props.tokenHoldersList({ contractAddr, page: 1, count: 10 })
                    },
                    (address) => {
                        this.props.readContractInformation({ address })
                    },
                    (contractAddr) => {
                        this.props.contractEventLogList({ contractAddr, page: 1, count: 10 })
                    },
                ]}
                InfoComponent={TokenSummary}
                addrHolderCount={[
                    this.props.tokenTransfers.totalSize,
                    this.holderData ? this.holderData.headers['x-total-count'] : 0,
                ]}
                TabsComponent={TokenTabs}
            />
        )
    }
}

export default TokenDetailPage
