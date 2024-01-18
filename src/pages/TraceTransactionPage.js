import React, { Component } from 'react'
import Logs from '../components/ErrorBlock/index'
import { getFailMessage } from '../redux/store/iiss'
class TraceTransaction extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logs: null,
            logs_error: [],
            status: true,
        }
    }
    async componentDidMount() {
        try {
            let moreMsg = await getFailMessage(this.props.match.params.txHash, 'wholemsg')
            let err = []
            moreMsg.result.logs.map((e) => {
                if (this.checkError(e.msg)) {
                    err.push(e)
                }
            })
            this.setState({ logs: moreMsg.result.logs, logs_error: err, status: true })
        } catch (error) {
            this.setState({ status: false })
        }
    }
    checkError = (data) => {
        if (
            data.toUpperCase().includes('ERROR') ||
            data.toUpperCase().includes('FAILURE') ||
            data.toUpperCase().includes('INVALID') ||
            data.toUpperCase().includes('SUCCESS=FALSE') ||
            data.toUpperCase().includes('SYSTEMEXCEPTION') ||
            data.toUpperCase().includes('OUTOFSTEP') ||
            data.toUpperCase().includes('REVERTED') ||
            data.toUpperCase().includes('SCOREEXCEPTION') ||
            data.toUpperCase().includes('ONLY NFT OWNER')
        ) {
            return true
        } else {
            return false
        }
    }

    render() {
        console.log(this.state.logs_error.length, 'length========>')
        return (
            <div className="tx-screen0">
                <h2 className="tx-title">Transaction Logs</h2>
                {this.state.status ? (
                    <Logs
                        checkError={this.checkError}
                        logs_error={this.state.logs_error}
                        logs={this.state.logs}
                    />
                ) : (
                    <div className="log_block">
                        <h2>Transaction has been completed successfully</h2>
                    </div>
                )}
            </div>
        )
    }
}

export default TraceTransaction
