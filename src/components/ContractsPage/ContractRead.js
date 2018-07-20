import React, { Component } from 'react';
import BigNumber from 'bignumber.js'

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

    handleClick = (e) => {
        const { name } = e.target

    }
 
    render() {
        const {
            params
        } = this.state

        const {
            contract,
            contractReadInfo
        } = this.props

        const {
            data
        } = contract

        const {
            address
        } = data

        const {
            funcList,
            funcOutput
        } = contractReadInfo

        console.log(funcList, funcOutput)

        return (
            <div className="contents">
                <div className="code-box read">
                    <div className="title-group">
                        <span className="title">Read contract information</span>
                    </div>
                    <div className="scroll">
                        <ul className="list">
                            {
                                funcList.map((func, index) => {
                                    const outputs = funcOutput[index]
                                    const isArray = Array.isArray(outputs)
                                    const inputs = func["inputs"]
                                    const isQuery = inputs.length > 0
                                    if (isQuery) {
                                        return [
                                            <li key="li0">{index + 1}. {func["name"]} > {
                                                inputs.map((item, i) => {
                                                    const name = item["name"], type = item["type"]
                                                    const placeholder = `${name} (${type})`
                                                    const value = this.state.params[name] || ''
                                                    return <input type="text" key={i} name={name} placeholder={placeholder} value={value} onChange={this.handleChange} />
                                                })
                                            }<button key='button' className="btn-type-query" onClick={()=>{
                                                const payload = {
                                                    address,
                                                    params,
                                                    index,
                                                    method: func["name"],
                                                }
                                            }} name="1">Query</button></li>,
                                            <li key="li1" className="result">
                                                <p>┗<em>Unit256</em></p>
                                                {<div>
                                                    <p>[ {func["name"]} method response ]</p>
                                                    <p>>><em>Unit256</em>:  BigNumber Error: new BigNumber() not a number: AAA</p>
                                                </div>}
                                            </li>
                                        ]
                                    }
                                    else if (isArray) {
                                        return <li key={index}>{index + 1}. {func["name"]} > {
                                            outputs.map((value, i) => {
                                                const outType = func["outputs"][i]["type"]
                                                const outValue = outType === 'int' ? new BigNumber(value).toString() : value
                                                return [
                                                    <span key='span'>{outValue}</span>,
                                                    <em key='em'>{outType}</em>
                                                ]
                                            })
                                        }</li>
                                    }
                                    else {
                                        const outType = func["outputs"][0]["type"]
                                        const outValue = outType === 'int' ? new BigNumber(outputs).toString() : outputs
                                        return <li key={index}>{index + 1}. {func["name"]} > <span>{outValue}</span><em>{outType}</em></li>
                                    }
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}

export default ContractRead
