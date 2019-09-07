import React, { Component } from 'react'

export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
        }
        this.input = null
    }

    componentDidMount() {
        if (this.input) {
            this.input.focus()
        }
    }

    handleInputChange = e => {
        this.setState({
            value: e.target.value,
        })
    }

    handleKeyDown = e => {
        if (e.key === 'Enter' && this.state.value) {
            this.props.data.search(this.state.value)
            this.setState({ value: '' }, this.props.closeSearch)
        }

        if (e.key === 'Escape') {
            this.props.closeSearch()
        }
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
                        ref={ref => { this.input = ref }} 
                        type="text"
                        className="txt-type-search"
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleKeyDown}
                        placeholder="Address, TxHash, Block, SCORE"
                        value={this.state.value}
                        onBlur={this.props.closeSearch}
                    />
                    <em>
                        <i className="img" onClick={this.props.closeSearch} />
                    </em>
                </div>
            </div>
        )
    }
}
