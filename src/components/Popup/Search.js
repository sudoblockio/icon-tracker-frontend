import React, { Component } from 'react'

export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
        }
    }

    handleInputChange = e => {
        this.setState({
            value: e.target.value,
        })
    }

    handleKeyPress = e => {
        if (!this.state.value) return
        if (e.key === 'Enter') {
            this.props.data.search(this.state.value.replace(/\s/gi, ''))
            this.setState(
                {
                    value: '',
                },
                () => {
                    this.props.closeSearch()
                },
            )
        }
    }

    handleSubmit = () => {
        if (!this.state.value) return
        this.props.data.search(this.state.value.replace(/\s/gi, ''))
        this.setState(
            {
                value: '',
            },
            () => {
                this.props.closeSearch()
            },
        )
    }
    render() {
        return (
            <div key="search" className="pop-search">
                <div className="dimmed" />
                <div className="search-group">
                    <span>
                        <i className="img" />
                    </span>
                    <input
                        type="text"
                        className="txt-type-search"
                        onChange={this.handleInputChange}
                        onKeyPress={this.handleKeyPress}
                        placeholder="Address, TxHash, Block, SCORE"
                        value={this.state.value}
                    />
                    <em>
                        <i className="img" onClick={this.props.closeSearch} />
                    </em>
                </div>
            </div>
        )
    }
}
