import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { numberWithCommas, getTimezoneMomentTime } from '../../utils/utils'
import { LoadingComponent, BlockLink } from '../../components'
class RecentBlocks extends Component {
    render() {
        const { loading, tmainBlock } = this.props
        const list = tmainBlock ? tmainBlock.slice(0, 10) : []
        return (
            <li className="left">
                <p className="title">Blocks</p>
                <div className="list-group">
                    {loading ? (
                        <div style={{ height: '511px' }}>
                            <LoadingComponent />
                        </div>
                    ) : (
                        <ul className={"list"} style={{ height: list.length === 0 ? 511 : '' }}>
                            {list.map((block, index) => {
                                const { blockHeight, createDate, hash, txCount } = block
                                return (
                                    <li key={index}>
                                        <p className="icon">B</p>
                                        <p className="a">
                                            Block
                                            <em>
                                                <BlockLink to={blockHeight} label={numberWithCommas(blockHeight)} />
                                            </em>
                                        </p>
                                        <p className="b">
                                            Transactions
                                            <em>{numberWithCommas(txCount)}</em>
                                        </p>
                                        <p className="c">
                                            Hash
                                            <em>
                                                <BlockLink to={blockHeight} label={hash} />
                                            </em>
                                        </p>
                                        <p className="d">
                                            Time (UTC+9)
                                            <em>{getTimezoneMomentTime(createDate)}</em>
                                        </p>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
                <Link to="/blocks">
                    <p className="all">
                        View all
                        <em className="img" />
                    </p>
                </Link>
            </li>
        )
    }
}

export default RecentBlocks
