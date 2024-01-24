import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { NETWORK_NAME, NETWORK_HOST } from '../../utils/const'
import { SUPPORT_URL } from '../../utils/const'
import discordLogo from '../../../src/style-custom/discordLogo.png'

class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: NETWORK_NAME[window.location.host] || 'Mainnet',
        }
    }

    onNetworkClick = (key) => {
        window.open(`https://${NETWORK_HOST[key]}/`, '_blank')
    }

    render() {
        return (
            <div className="footer-wrap">
                <div className="screen0">
                    <div className="wrap-holder">
                        <p>©{new Date().getFullYear()} ICON Foundation</p>
                        <div className="sns">
                            <p className="mail">
                                <a href="https://discord.com/channels/880651922682560582/888476176237080687" rel="noopener noreferrer" target="_blank">
                                    Get Support
                                </a>
                            </p>
                            <ul>
                                <li className="icon">
                                    <a target="_black" href="https://www.icon.community/">
                                        <span className="img"></span>
                                    </a>
                                </li>
                                <li className="twitter">
                                    <a target="_black" href="https://twitter.com/helloiconworld">
                                        <span className="img"></span>
                                    </a>
                                </li>
                                <li className="discord">
                                    <a target="_blank" href="https://discord.com/channels/880651922682560582/1014165836740690110">
                                        <span className="discord-icon" style={{ backgroundImage: `url(${discordLogo})`, }}></span>
                                    </a>
                                </li>
                                <li className="github">
                                    <a
                                        target="_black"
                                        href="https://github.com/icon-project">
                                        <span className="img"></span>
                                    </a>
                                </li>
                                {/*<li className="medium">*/}
                                {/*    <a target="_black" href="https://medium.com/@helloiconworld">*/}
                                {/*        <span className="img"></span>*/}
                                {/*    </a>*/}
                                {/*</li>*/}
                                {/*<li className="brunch">*/}
                                {/*    <a target="_black" href="https://brunch.co.kr/@helloiconworld">*/}
                                {/*        <span className="img"></span>*/}
                                {/*    </a>*/}
                                {/*</li>*/}
                                {/*<li className="facebook">*/}
                                {/*    <a target="_black" href="https://www.facebook.com/helloicon">*/}
                                {/*        <span className="img"></span>*/}
                                {/*    </a>*/}
                                {/*</li>*/}
                            </ul>
                            <div className="mainnet">
                                <p>
                                    {this.state.current}
                                    <i className="img"></i>
                                </p>
                                <ul>
                                    {Object.keys(NETWORK_HOST).map((key) => (
                                        <li key={key}>
                                            <span
                                                onClick={() => {
                                                    this.onNetworkClick(key)
                                                }}>
                                                {key}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Footer)
