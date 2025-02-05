import React, { Component } from 'react'
import { TxBottom } from '../../../../components'
import { contractDetail } from '../../../../redux/store/contracts';
import { getEventsByName, getParsedLog } from '../../../../libs/event-log-parser';

class ContractEvents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            txDataParsed: [],
            isLoading: true
        };
    }

    componentDidMount() {
        this.parseLogs();

    }

    componentDidUpdate(prevProps) {
        if (prevProps.txData !== this.props.txData) {
            this.parseLogs();
        }
    }

    async parseLogs() {
        if (!(this.props.txData?.data) ||
            (!Array.isArray(this.props.txData.data)) ||
            (this.props.txData.data.length === 0)
        ) {
            this.setState({ isLoading: false })
            return;
        }

        this.setState({ isLoading: true })
        const { txData } = this.props;
        const toUpdate = [...txData.data];


        const contractData = await contractDetail(this.props.txData.data[0].address)
        const abi = contractData.data.abi;

        for (const log of toUpdate) {
            const eventsByName = getEventsByName(abi);
            log.parsedLog = getParsedLog(log, eventsByName)
        }

        this.setState({ txDataParsed: toUpdate, isLoading: false })
    }
    render() {
        return <TxBottom {...this.props}
            txData={{ ...this.props.txData, isLoading: this.state.isLoading, data: this.props.txData.data }}
            txDataParsed={{ isLoading: this.state.isLoading, data: this.state.txDataParsed }} />
    }
}

export default ContractEvents
