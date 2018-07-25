import React, { Component } from 'react';
import {
    startsWith,
    findTabIndex,
    noSpaceLowerCase
} from '../../utils/utils'
import {
    BLOCK_TABS
} from '../../utils/const'
import {
    NotFound,
    BlockInfo,
    BlockTabs
} from '../../components/';

class DetailPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            on: 0
        }
    }

    componentWillMount() {
        this.allDetailInfo(this.props.url)
    }

    componentWillReceiveProps(nextProps) {
        const { pathname: currentPath } = this.props.url
        const { pathname: nextPath } = nextProps.url
        if (currentPath !== nextPath && startsWith(nextPath, this.props.ROUTE)) { //
            this.allDetailInfo(nextProps.url)
            return
        }

        const { hash: currentHash } = this.props.url
        const { hash: nextHash } = nextProps.url
        if (currentHash !== nextHash) {
            this.setTab(findTabIndex(this.props.TABS, nextHash)) //
        }
    }

    allDetailInfo = (url) => {
        const query = url.pathname.split("/")[2]
        if (query) {
            this.props.getInfo({ [this.props.QUERY]: query }) //
            this.setTab(findTabIndex(this.props.TABS, url.hash), query) //
        }
    }

    setTab = (_index, _query) => {
        if (_index !== -1) {
            window.location.hash = noSpaceLowerCase(this.props.TABS[_index]) //
        }
        const index = _index !== -1 ? _index : 0
        this.setState({ on: index },
            () => {
                const query = _query ? _query : this.props.url.pathname.split("/")[2] //
                switch (index) {
                    case 0:
                        this.props.getTxList({ [this.props.QUERY]: query, page: 1, count: 10 }) //
                        break
                    default:
                }
            }
        )
    }

    render() {
        const { loading, error } = this.props //

        const Content = () => {
            if (error !== "" && !loading) {
                return (
                    <NotFound error={error} />
                )
            }
            else {
                const { Info, Tabs } = this.props
                return (
                    <div className="content-wrap">
                        <Info {...this.props}/>
                        <Tabs {...this.props} {...this.state} setTab={this.setTab}/>
                    </div>
                )
            }
        }
        return Content();
    }
}

export default DetailPage;
