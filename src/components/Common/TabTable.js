import React, { Component } from 'react';
import {
    LoadingComponent,
} from '../../components'

class TabTable extends Component {

    render() {
        const { on, loading, TableContents } = this.props      
        const Contents = () => {
            if (loading) {
                return <LoadingComponent height='513px'/>
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
