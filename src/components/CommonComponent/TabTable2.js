import React from 'react'
import style from "./TabTable3.module.scss"

import { LoadingComponent } from '../../components'
import clsx from 'clsx'

const TabTable2 = (props) => {
    const { on, loading, TableContents, onClickTab, TABS } = props
    const Contents = () => {
        if (loading) {
            return <LoadingComponent height="513px" />
        } else {
            return (
                <div className={clsx(style.wrapper, "screen1")}>
                    <div className={clsx("wrap-holder", style.innerWrapper)}>
                        <div className={style.container}>
                            <div className="tab-holder">
                                <ul>
                                    {TABS.map((tab, index) => (
                                        <li
                                            key={index}
                                            className={on === index ? 'on' : ''}
                                            onClick={() => {
                                                onClickTab(index)
                                            }}>
                                            {tab}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {TableContents(on)}
                        </div>
                    </div>
                </div>
            )
        }
    }

    return Contents()
}

export default TabTable2
