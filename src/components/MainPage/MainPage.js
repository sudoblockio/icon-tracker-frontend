import React, { Component } from 'react'
import { InfoSummary, RecentBlocks, RecentTransactions } from '../../components'
import { search } from '../../redux/store/search';
import { connect } from 'react-redux'

class MainPage extends Component {

    state = {
        value: '',
        focused: false
    }

    input = null
    notFocus = true
    focused = false

    handleChange = e => {
        
        const { value } = e.target
        this.setState({ value })
    }
    
    handleKeyDown = e => {
        if (e.key === 'Enter') {
            this.props.search(this.state.value)
        }
        if (e.key === 'Escape') {
            this.setState({ value: '' }, () => {
                this.input.blur()
            })
        }
        
    }


    render() {
        
        return (
            <div className="content-wrap">
                <div className="screen2">
                    <div className="wrap-holder">
                        <div className="content">
                            <p>ICON Blockchain Explorer</p>
                            <div className="search-group txt fixing">
                                <input id='main-top-search-bar'
                                    ref={ref => { 
                                        this.input = ref 
                                        if (this.input) {
                                            this.input.onfocus = () => {
                                                this.focused = true;
                                            };
                                            this.input.onblur = () => {
                                                this.focused = false;
                                            };
                                        }
                                    }}
                                    type="text"
                                    className="txt-type-search"
                                    placeholder="Address, TxHash, Block, SCORE"
                                    value={this.state.value}
                                    onKeyDown={this.handleKeyDown}
                                    onChange={this.handleChange}
                                />
                                {/* {!this.state.value && 
                                <span onMouseDown={() => {
                                        this.notFocus = this.focused
                                    }} 
                                    onMouseUp={e => {
                                    if (!this.notFocus) {
                                        this.notFocus = true
                                        this.input.focus()
                                    }
                                }}>
                                    <i className="img"></i>
                                </span>} */}
                                {this.state.value &&
                                <em onMouseDown={() => {
                                    this.setState({ value: '' })
                                }}>
                                    <i className="img"></i>
                                </em>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="screen0">
                    <div className="wrap-holder">
                        <ul className="content">
                            <InfoSummary {...this.props} />
                        </ul>
                    </div>
                </div>
                <div className="screen1">
                    <div className="bg">
                        <div className="wrap-holder">
                            <ul className="content">
                                
                                <RecentBlocks {...this.props} />
                                <RecentTransactions {...this.props} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        search: param => dispatch(search(param))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
