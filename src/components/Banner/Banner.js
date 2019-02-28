import React, { Component } from 'react';
import bannerT from '../../style/image/banner_t.png'
import { connect } from 'react-redux';
import { setBannerOption } from '../../redux/actions/storageActions'
import BodyClassName from 'react-body-classname'
import moment from 'moment'

class Banner extends Component {

    constructor(props) {
        super(props);
        this.state = {
            close: false,
            checked: false
        };
    }

    handleChange = () => {
        this.setState({ checked: !this.state.checked })
    }

    onCloseClick = () => {
        this.setState({ close: true })
        const bannerExpireDate = this.state.checked ? moment().add(7, 'day') : undefined
        this.props.setBannerOption({ bannerExpireDate })
    }

    displayBanner = () => {
        if (this.state.close) {
            return false
        }

        if (this.props.bannerExpireDate) {
            const bannerExpireDate = moment(this.props.bannerExpireDate)
            const now = moment()
            console.log(bannerExpireDate.format('YYYY-MM-DD'), now.format('YYYY-MM-DD'))
            if (now.isAfter(bannerExpireDate, 'day')) {
                return true
            }
            else {
                return false
            }
        }
        else {
            return true
        }
    }
    
    render() {
        const _displayBanner = this.displayBanner()

        return (!_displayBanner ? null :
            <BodyClassName className='isBanner'>
                <div className="banner-wrap">
                    <div className="banner">
                        <a className="link" href="https://icon.community/iconsensus/" target="_blank" rel="noopener noreferrer">
                            <img src={bannerT} alt='banner_t' />
                        </a>
                        <i className="bubble"></i>
                        <i className="bubble"></i>
                        <i className="bubble"></i>
                        <div className="view">
                            <input id="cbox-01" className="cbox-type" type="checkbox" name="" onChange={this.handleChange} checked={this.state.checked} />
                            <label htmlFor="cbox-01" className="label _img">Do not show 7 days</label>
                            <i className="img close" onClick={this.onCloseClick}></i>
                        </div>
                    </div>
                </div>
            </BodyClassName>
        );
    }
}


function mapStateToProps(state) {
    return {
        ...state.storage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setBannerOption: payload => dispatch(setBannerOption(payload)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
