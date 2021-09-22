import React, { Component } from 'react'
import { connect } from 'react-redux'
import { POPUP_TYPE } from '../../utils/const'
import { setPopup } from '../../redux/store/popup'

class SearchBox extends Component {
    handleClick = () => {
        const mainTopSearchBar = document.getElementById('main-top-search-bar')
        if (mainTopSearchBar) {
            mainTopSearchBar.focus()
        }
        else {
            this.props.setPopup({
                type: POPUP_TYPE.SEARCH,
                data: { search: this.props.search },
            })
        }
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
