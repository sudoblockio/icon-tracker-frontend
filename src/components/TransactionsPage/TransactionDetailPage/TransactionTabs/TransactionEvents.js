import React, { Component } from 'react'
import { TxBottom } from '../../../../components'
import { getEventsByName, getParsedLog } from '../../../../libs/event-log-parser';
import { contractDetail } from '../../../../redux/store/contracts';

class TransactionEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txDataParsed: [],
            isLoading: true
        };
    }


    componentDidUpdate(prevProps) {
        if (prevProps.txData !== this.props.txData) {
            this.parseLogs();
        }
    }

    componentDidMount() {
        this.parseLogs();

    }

    async parseLogs() {
        this.setState({ isLoading: true })
        const { txData } = this.props;
        const toUpdate = [...txData.data];
        for (const log of toUpdate) {
            const contractData = await contractDetail(log.address)
            const abi = contractData.data.abi;
            const eventsByName = getEventsByName(abi);
            log.parsedLog = getParsedLog(log, eventsByName)
        }

        this.setState({ txDataParsed: toUpdate, isLoading: false })
    }

    render() {
        return <TxBottom {...this.props}
            txData={{ isLoading: this.state.isLoading, data: this.props.txData.data }}
            txDataParsed={{ isLoading: this.state.isLoading, data: this.state.txDataParsed }}
        />
    }
}

export default TransactionEvents
