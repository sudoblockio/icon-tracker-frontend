import React, { Component } from 'react';
import {
    LoadingComponent,
} from 'components'

class TabTable extends Component {

    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown)
    }

    handleKeyDown = (e) => {
        const { TABS, on } = this.props
        const { code } = e
        switch (code) {
            case "ArrowLeft":
                const prev = on - 1
                if (prev >= 0) {
                    this.props.changeTab(prev)
                }
                break
            case "ArrowRight":
                const next = on + 1
                if (next < TABS.length) {
                    this.props.changeTab(next)
                }
                break
            default:
        }
    }

    render() {
        const { on, loading, TableContents } = this.props
        const Contents = () => {
            if (loading) {
                return <LoadingComponent height='513px' />
            }
            else {
                const { TABS } = this.props
                return (
                    <div className="screen1">
                        <div className="wrap-holder">
                            <div className="tab-holder">
                                <ul>
                                    {
                                        TABS.map((tab, index) => (
                                            <li key={index} className={on === index ? 'on' : ''} onClick={() => { this.props.changeTab(index) }}>{tab}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            {TableContents(on)}
                        </div>
                    </div>
                )
            }
        }
        return Contents()
    }
}

export default TabTable
