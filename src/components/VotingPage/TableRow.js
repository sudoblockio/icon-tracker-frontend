import { Component } from "react"
import { numberWithCommas } from "../../utils/utils"
import { IconConverter, IconAmount } from 'icon-sdk-js'

import styles from "./TableRow.module.scss"
import Checkbox from "rc-checkbox"


class TableRow extends Component {
    state = {
        logoError: false,
        loaded: false,
        activeStatus: this.statusList,
    }

    loadImage = () => {
        this.setState({ loaded: true })
    }

    getMainBadge = (grade, node_state) => {
        const className = node_state === 'Synced' ? 'prep-tag' : node_state === 'Inactive' ? 'prep-tag off' : 'prep-tag block-synced'
        switch (grade) {
            case 0:
            case '0x0':
                return <span className={className}><i></i>Main P-Rep</span>
            case 1:
            case '0x1':
                return <span className={className}><i></i>Sub P-Rep</span>
            case 2:
            case '0x2':
                return <span className={className}><i></i>Candidate</span>
            default:
                return null
        }
    }
    // We only care on the table view if a prep is un-jailing or jailed.
    getJailBadge = (jail_flag) => {
        let badgeText = '';
        let badgeClass = '';
        if (jail_flag === 0 || isNaN(jail_flag)) {
            return false;
        }
        if ([2, 3, 6, 10].includes(jail_flag)) {
            badgeText = 'Unjailing';
            badgeClass = 'unjailing';
        } else {
            badgeText = 'Jail';
            badgeClass = 'jail';
        }
        return <div><span className={`jail-badge ${badgeClass}`}>{badgeText}</span></div>;
    }
    goAddress = address => {
        this.props.history.push('/address/' + address)
    }
    onError = () => {
        this.setState({ logoError: true })
    }
    loadImage = () => {
        this.setState({ loaded: true })
    }
    render() {
        const {
            logoError
        } = this.state
        const {
            totalVoted,
            rrep,
            prep,
            lastBlockHeight,
            blackChecked,
            index,
            governanceStatus,

            statusData,
        } = this.props
        const {
            // rank,
            logo_256,
            logo_svg,
            name,
            address,
            grade,
            total_blocks,
            validated_blocks,
            stake,
            delegated,
            irep,
            irepUpdatedBlockHeight,
            node_state,
            jail_flags,
            logo,
            status,
            commission_rate,
            max_commission_change_rate,
            max_commission_rate,
            reward_monthly, reward_monthly_usd,
            sponsored_cps_grants,
            cps_governance,
            bonded,
            power

            // balance,
            // unstake,
        } = prep
        const sugComRate = ((1 / totalVoted * 100 * 12 * irep / 2) / ((rrep * 3 / 10000) + 1 / totalVoted * 100 * 12 * irep / 2)) * 100;
        const productivity = !total_blocks || Number(total_blocks) === 0 ? 'None' : (Number(validated_blocks) === 0 ? '0.00%' : `${(Number(validated_blocks) / Number(total_blocks) * 100).toFixed(2)}%`)
        const prepVoted = IconConverter.toNumber(delegated || 0)
        const votedRate = !totalVoted ? 0 : prepVoted / totalVoted
        const mainBadge = this.getMainBadge(grade, prep.node_state)

        const jailBadge = this.getJailBadge(parseInt(prep.jail_flags, 16))
        const rank = index + 1
        const bondedRate = !totalVoted ? 0 : (20 * (bonded / Math.pow(10, 18)).toFixed()) / (prepVoted + bonded / Math.pow(10, 18))

        return (
            <tr className={styles.wrapper}>
                {/* <td className="rank">
                    <span>{rank || '-'}</span>
                </td> */}
                <td>
                    <Checkbox
                        onChange={this.props.onChangeCheckbox.bind(this, prep)}
                        checked={prep.isChecked}
                    />
                </td>
                <td className={Number(grade) > 2 || grade === '0x3' ? 'black' : 'on'}>
                    <span className={styles.nameRow}>
                        <span className={styles.img}>
                            {logo_256 ? (
                                <img
                                    src={logo_256 ? logo_256 : logo_svg}
                                    onError={this.onError}
                                    onLoad={this.loadImage}
                                    style={this.state.loaded ? {} : { display: 'none' }}
                                    alt="logo"
                                />
                            ) : (
                                ''
                            )}
                        </span>
                        <span className={styles.nameAddr}>
                            <span>
                                {mainBadge} {name}
                            </span>

                            <span className={styles.addr}>
                                {address}
                            </span>
                        </span>
                    </span>



                    {/* <ul className={styles.custom001}>
                        <li>
                            {mainBadge}
                            {jailBadge}
                        </li>
                        <li>
                            {logo_256 ? (
                                <img
                                    src={logo_256 ? logo_256 : logo_svg}
                                    onError={this.onError}
                                    onLoad={this.loadImage}
                                    style={this.state.loaded ? {} : { display: 'none' }}
                                    alt="logo"
                                />
                            ) : (
                                ''
                            )}
                        </li>
                        <li>
                            <span
                                className="ellipsis pointer"
                                onClick={() => {
                                    this.goAddress(address)
                                }}>
                                {name}
                            </span>
                            <em
                                className="ellipsis pointer"
                                onClick={() => {
                                    this.goAddress(address)
                                }}>
                                {address}
                            </em>
                        </li>
                    </ul> */}
                </td>


                {/* <td>{numberWithCommas(Number(power / Math.pow(10, 18)).toFixed())}</td> */}

                <td className={'bonded'}>
                    <span>{numberWithCommas(Number(bonded / Math.pow(10, 18)).toFixed())}</span>
                    <br />
                    <em>{Number(bondedRate * 100).toFixed(1)}%</em>
                </td>

                <td>
                    <span>{numberWithCommas(Number(reward_monthly).toFixed())}</span>
                    <br />
                    <em>{numberWithCommas(Number(reward_monthly_usd).toFixed())}</em>
                </td>

                <td>
                    {isNaN(commission_rate) && isNaN(max_commission_change_rate) && isNaN(max_commission_rate) ? (
                        '-'
                    ) : (
                        <>
                            <em>
                                <span>
                                    {isNaN(commission_rate) ? '-' : numberWithCommas(Number(commission_rate).toFixed())}%
                                </span>
                            </em>
                            <br />
                            <em>
                                {isNaN(max_commission_change_rate) ? '-' : numberWithCommas(Number(max_commission_change_rate).toFixed())}/{' '}
                                {isNaN(max_commission_rate) ? '-' : numberWithCommas(Number(max_commission_rate).toFixed())}
                            </em>
                        </>
                    )}
                </td>
                {/* 
                <td>
                    <span>{numberWithCommas(prepVoted.toFixed(0))}</span>
                    <em>{Number(votedRate * 100).toFixed(1)}%</em>
                </td> */}




                {/* <td>
                    {cps_governance ? (sponsored_cps_grants === 0 || sponsored_cps_grants === null ? '✓' : sponsored_cps_grants) : '-'}
                </td> */}
                {/* <td>
                    <span>{productivity !== 'None' ? productivity : '0.00%'}</span>
                    <em>
                        {numberWithCommas(Number(validated_blocks))}/ {' '}
                        {numberWithCommas(Number(total_blocks))}
                    </em>
                </td>
              
                {!blackChecked && (
                    <td>
                        <span>{numberWithCommas(prepVoted.toFixed(0))}</span>
                        <em>{Number(votedRate * 100).toFixed(1)}%</em>
                    </td>
                )} */}
            </tr>
        )
    }
}


export default TableRow