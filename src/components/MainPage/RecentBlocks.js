import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { numberWithCommas, getTimezoneMomentTime, getTimezoneMomentKSTTime } from '../../utils/utils';
import { LoadingComponent, BlockLink } from '../../components';

function RecentBlocks (props) {
    console.log(props, "recentBlocks props")
    const { loading, blocks } = props
    const list = blocks ? blocks.slice(0, 10) : []

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
                                const { number, createDate, timestamp, hash, transaction_count } = block
                                return (
                                    <li key={index}>
                                        <p className="icon">B</p>
                                        <p className="a">
                                            Block
                                            <em>
                                                <BlockLink to={number} label={numberWithCommas(number)} />
                                            </em>
                                        </p>
                                        <p className="b">
                                            Transactions
                                            <em>{numberWithCommas(transaction_count)}</em>
                                        </p>
                                        <p className="c">
                                            Hash
                                            <em>
                                                <BlockLink to={number} label={hash} />
                                            </em>
                                        </p>
                                        <p className="d">
                                            Time (UTC+9)
                                            {console.log(timestamp)}
                                            <em>{getTimezoneMomentTime(timestamp)}</em>
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

export default RecentBlocks
