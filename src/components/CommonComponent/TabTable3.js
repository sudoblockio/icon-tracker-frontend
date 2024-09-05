import React from 'react'
import { LoadingComponent } from '../../components'

import style from "./TabTable3.module.scss"
import clsx from 'clsx'

const TabTable2 = (props) => {
    const { on, loading, children } = props

    const Contents = () => {
        if (loading) {
            return <LoadingComponent height="513px" />
        } else {
            const { TABS } = props
            return (
                <div className={clsx(style.wrapper, "screen1")}>
                    <div className={clsx("wrap-holder", style.innerWrapper)}>
                        <div className={style.container}>
                            <div className={clsx("tab-holder", style.tabHolder)}>
                                <ul>
                                    {TABS.map((tab, index) => (
                                        <li
                                            key={index}
                                            className={on === index ? 'on' : ''}
                                            onClick={() => {
                                                props.onClickTab(index)
                                            }}>
                                            {tab}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={style.children}>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return Contents()
}

export default TabTable2
