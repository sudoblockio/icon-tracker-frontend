import React, { Component } from 'react';
class ContractRead extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { 
            contractReadInfo 
        } = this.props
        
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
                                const output = funcOutput[index]
                                return [
                                    <li key={index}>
                                    {index + 1}. {func["name"]} >
                                    {
                                        output ?                                        
                                        [
                                            <span>{output}</span>, 
                                            <em>{func["outputs"][0]["type"]}</em>
                                        ]:[
                                            <input type="text" class="txt-type over" placeholder="_owner (address)" value=""/>,
                                            <button class="btn-type-query">Query</button>
                                        ]
                                    }                                    
                                    </li>
                                ]
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
