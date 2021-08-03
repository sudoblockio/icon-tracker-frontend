import React, { Component } from 'react'
import withClickOut from '../../HOC/withClickOut'

class SearchGroup extends Component {
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
            <div className="search-group">
                <span style={{ cursor: 'default' }}>
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
                    // onBlur={this.props.closeSearch}
                />
                <em style={{ 
                        opacity: this.state.value ? 1 : 0,
                        cursor: this.state.value ? 'pointer' : 'default'
                    }}
                >
                    <i className="img" 
                        onClick={() => {
                            this.setState({ value: '' })                            
                        }}
                    />
                </em>}
            </div>
        )
    }
}

const SearchGroupWithClickOut = withClickOut(SearchGroup)

export default class Search extends Component {
    render() {
        return (
            <div key="search" className="pop-search">
                <div className="dimmed" />
                <SearchGroupWithClickOut {...this.props} onClickOut={this.props.closeSearch} />
            </div>
        )
    }
}
