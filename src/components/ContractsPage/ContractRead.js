import React, { Component } from 'react';
import BigNumber from 'bignumber.js'
import {
    LoadingComponent
} from '../../components'

class ContractRead extends Component {
    constructor(props) {
        super(props)
        this.state = {
            params: {}
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            params: {
                ...this.state.params,
                [name]: value
            }
        })
    }

    handleClick = (address, params, index, method) => {
        const payload = {
            address,
            params,
            index,
            method,
        }
        this.props.icxCall(payload)
    }

    render() {
        const { params } = this.state
        const { contract, contractReadInfo } = this.props
        const { data } = contract
        const { address } = data
        const { loading, funcList, funcOutputs } = contractReadInfo

        return (
            <div className="contents">
                <div className="code-box read">
                    <div className="title-group">
                        <span className="title">Read contract information</span>
                    </div>
                    {
                        loading ?
                            <LoadingComponent height="322px" />
                            :
                            <div className="scroll">
                                <ul className="list">
                                    {
                                        funcList.map((func, index) => {
                                            const outputs = funcOutputs[index]
                                            const inputs = func["inputs"]
                                            const isQuery = inputs.length > 0
                                            if (isQuery) {
                                                return [
                                                    <li key="li0">{index + 1}. {func["name"]} > {
                                                        <Inputs inputs={inputs} params={params} handleChange={this.handleChange} />}
                                                        <button key='button' className="btn-type-query" onClick={() => { this.handleClick(address, params, index, func["name"]) }}>Query</button>
                                                    </li>,
                                                    <li key="li1" className="result">
                                                        <OutputTypes func={func} />
                                                        {!isEmptyOutput(outputs) && <OutputResults func={func} outputs={outputs} />}
                                                    </li>
                                                ]
                                            }
                                            else {
                                                return <Outputs key={index} func={func} outputs={outputs} index={index} />
                                            }
                                        })
                                    }
                                </ul>
                            </div>
                    }
                </div>
            </div>

        )
    }
}

function isEmptyOutput(outputs) {
    if (!outputs) {
        return true
    }
    else {
        const { valueArray, error } = outputs
        return valueArray.length === 0 && !error
    }
}

function getOutValue(type, value) {
    return type === 'int' ? new BigNumber(value).toString() : value
}

const Inputs = ({ inputs, params, handleChange }) => {
    return (
        inputs.map((item, i) => {
            const name = item["name"]
            const type = item["type"]
            const placeholder = `${name} (${type})`
            const value = params[name] || ''
            return <input type="text" key={i} name={name} placeholder={placeholder} value={value} onChange={handleChange} />
        })
    )
}

const OutputTypes = ({ func }) => {
    const list = func["outputs"]
    return (
        list.map((output, index) => {
            const type = output["type"]
            return <p key={index}>┗<em key={index}>{type}</em></p>
        })
    )
}

const OutputResults = ({ func, outputs }) => {
    const name = func["name"]
    const { valueArray, error } = outputs
    return (
        <div>
            <p>[ {name} method response ]</p>
            {
                error ?
                    <p>>> {error}</p>
                    :
                    valueArray.map((value, i) => {
                        const outType = func["outputs"][i]["type"]
                        const outValue = getOutValue(outType, value)
                        return <p key={i}>>><em>{outType}</em>: {outValue}</p>
                    })

            }
        </div>
    )
}

const Outputs = ({ func, outputs, index }) => {
    const { valueArray, error } = outputs
    if (error) {
        return <li key={index}>{index + 1}. {func["name"]} > <span>{error}</span></li>
    }
    else {
        return (
            <li key={index}>{index + 1}. {func["name"]} > {
                valueArray.map((value, i) => {
                    const outType = func["outputs"][i]["type"]
                    const outValue = getOutValue(outType, value)
                    return [<span key='span'>{outValue}</span>, <em key='em'>{outType}</em>]
                })
            }</li>
        )
    }
}

export default ContractRead
