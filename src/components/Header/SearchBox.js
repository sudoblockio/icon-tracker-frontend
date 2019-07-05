import React, { Component } from 'react'
import { connect } from 'react-redux'
import { POPUP_TYPE } from 'utils/const'
import { setPopup } from '../../redux/actions/popupActions'

class SearchBox extends Component {
    handleClick = () => {
        this.props.setPopup({
            type: POPUP_TYPE.SEARCH,
            data: { search: this.props.search },
        })
    }
    render() {
        return (
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
