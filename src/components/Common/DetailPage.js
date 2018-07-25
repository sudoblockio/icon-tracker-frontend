import React, { Component } from 'react';
import {
    startsWith,
    findTabIndex,
    noSpaceLowerCase
} from '../../utils/utils'
import {
    NotFound,
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
        const { ROUTE } = this.props
        if (currentPath !== nextPath && startsWith(nextPath, ROUTE)) {
            this.allDetailInfo(nextProps.url)
            return
        }

        const { hash: currentHash } = this.props.url
        const { hash: nextHash } = nextProps.url
        if (currentHash !== nextHash) {
            const { TABS } = this.props
            this.setTab(findTabIndex(TABS, nextHash))
        }
    }

    allDetailInfo = (url) => {
        const query = url.pathname.split("/")[2]
        if (query) {
            const { TABS } = this.props
            this.props.getInfo(query)
            this.setTab(findTabIndex(TABS, url.hash), query)
        }
    }

    setTab = (index, query) => {
        if (index !== -1) {
            const { TABS } = this.props
            window.location.hash = noSpaceLowerCase(TABS[index])
        }
        const _index = index !== -1 ? index : 0
        this.setState({ on: _index },
            () => {
                this.setList(this.props.getList[_index], query)
            }
        )
    }

    setList = (getListFunc, query) => {
        const _query = query ? query : this.props.url.pathname.split("/")[2]
        if (typeof getListFunc === 'function') {
            getListFunc(_query)
        }
    }

    render() {
        const { loading, error } = this.props
        const Content = () => {
            if (error !== "" && !loading) {
                return <NotFound error={error}/>
            }
            else {
                const { InfoComponent, TabsComponent } = this.props
                return (
                    <div className="content-wrap">
                        <InfoComponent {...this.props}/>
                        <TabsComponent {...this.props} {...this.state} setTab={this.setTab}/>
                    </div>
                )
            }
        }
        return Content();
    }
}

export default DetailPage;
