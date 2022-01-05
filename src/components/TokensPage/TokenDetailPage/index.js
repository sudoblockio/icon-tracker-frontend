import React, { Component } from 'react';
import TokenSummary from './TokenSummary'
import TokenTabs from './TokenTabs'
import {
    DetailPage
} from '../../../components';
import {
    TOKEN_TABS
} from '../../../utils/const'
import {tokenTransfersList } from '../../../redux/api/restV3/token'
import { getTokenTotalSupply } from '../../../redux/store/iiss'
class TokenDetailPage extends Component {
    
    async componentDidMount() {
        console.log(this.props.match.params.tokenId, "props for token detail")
        const holderData = await tokenTransfersList({contractAddr: this.props.match.params.tokenId})
        console.log(holderData, "holder data? ")


    }

    render() {
        const { token } = this.props;
        const { loading, error } = token
         
        
        return (
            <DetailPage
                {...this.props}
                loading={loading}
                error={error}
                TABS={TOKEN_TABS}
                ROUTE="/token"
                getInfo={contractAddr => { this.props.tokenSummary({ contractAddr }) }}
                getList={[
                    contractAddr => {
                        this.props.tokenTransfersList({ contractAddr, page: 1, count: 10 })
                    },
                    contractAddr => {
                        this.props.tokenHoldersList({ contractAddr, page: 1, count: 10 })
                    },
                    address => {
                        this.props.readContractInformation({ address  })
                    }
                ]}
                InfoComponent={TokenSummary}
                TabsComponent={TokenTabs}
            />
        )
    }
}

export default TokenDetailPage;
