import React, { Component } from 'react'
import { connect } from 'react-redux'
import { POPUP_TYPE } from 'utils/const'
import { setPopup } from '../../redux/actions/popupActions'

class SearchBox extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         value: '',
    //     }
    // }

    // handleInputChange = e => {
    //     this.setState({
    //         value: e.target.value,
    //     })
    // }

    // handleKeyPress = e => {
    //     if (!this.state.value) return
    //     if (e.key === 'Enter') {
    //         this.props.search(this.state.value.replace(/\s/gi, ''))
    //         this.setState({
    //             value: '',
    //         })
    //     }
    // }

    // handleSubmit = () => {
    //     if (!this.state.value) return
    //     this.props.search(this.state.value.replace(/\s/gi, ''))
    //     this.setState({
    //         value: '',
    //     })
    // }

    handleClick = () => {
        this.props.setPopup({
            type: POPUP_TYPE.SEARCH,
            data: { search: this.props.search },
        })
    }
    render() {
        // const { loading } = this.props
        // const { value } = this.state
        return (
            // <div className="search-group">
            //   <input onChange={this.handleInputChange} onKeyPress={this.handleKeyPress} type="text" className="txt-type-normal" placeholder="Address, TxHash, Block, SCORE" value={value}/>
            //   <span>
            //     {
            //       loading ? <LoadingComponent />
            //               : <em onClick={this.handleSubmit} className="img"></em>
            //     }</span>
            // </div>
            <div className="search-group" onClick={this.handleClick}>
                <span>
                    <em className="img" />
                </span>
            </div>
        )
    }
}

function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        setPopup: payload => dispatch(setPopup(payload)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchBox)
