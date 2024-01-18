import React, { Component } from 'react'
import { TOKEN_STANDARDS } from '../../utils/const'

class TokenStandardHolder extends Component {
    onClick = () => {
        window.dispatchEvent(new CustomEvent('CUSTOM_FX', { detail: { type: 'TOKEN_STANDARD' } }))
    }

    render() {
        return (
            <th className="status-holder">
                <span onClick={this.onClick}>
                    Token Standard<em className="img"></em>
                </span>
                <ul>
                    {TOKEN_STANDARDS.map((type, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                this.props.getData(type !== 'All' ? type : '')
                            }}>
                            <span>{type}</span>
                        </li>
                    ))}
                </ul>
            </th>
        )
    }
}

export default TokenStandardHolder
