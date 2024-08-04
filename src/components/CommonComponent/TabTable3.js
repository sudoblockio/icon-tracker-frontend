import React from 'react'
import { LoadingComponent } from '../../components'

import style from "./TabTable3.module.scss"
import clsx from 'clsx'

const TabTable2 = (props) => {
    // useEffect(() => {
    //     const handleKeyDown = (e) => {
    //         // const { TABS, on } = props;
    //         // const { code } = e;
    //         // switch (code) {
    //         //     case "ArrowLeft":
    //         //         const prev = on - 1;
    //         //         if (prev >= 0) {
    //         //             props.changeTab(prev);
    //         //         }
    //         //         break;
    //         //     case "ArrowRight":
    //         //         const next = on + 1;
    //         //         if (next < TABS.length) {
    //         //             props.changeTab(next);
    //         //         }
    //         //         break;
    //         //     default:
    //         // }
    //     }
    //     //
    //     window.addEventListener('keydown', handleKeyDown)
    //     return () => {
    //         window.removeEventListener('keydown', handleKeyDown)
    //     }
    // }, [])

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
