import React, { Component } from 'react';
import queryString from 'query-string'
import SearchTableHead from './SearchTableHead'
import SearchTableBody from './SearchTableBody'
import SearchTableDesc from './SearchTableDesc'
import {
  LoadingComponent,
  Pagination,
  SortHolder,
  NoBox,
  SearchInput,
} from 'components';
import {
  calcMaxPageNum,
  isNumeric
} from 'utils/utils';
import {
  SEARCH_TYPE_DATA,
  CONTRACT_STATUS_NUM
} from 'utils/const'

class SearchPage extends Component {

  constructor(props) {
    super(props)
    this.searchType = ''
    this.pageId = 1
    this._getList = () => { }
    this._getListSearch = () => { }
    this.state = {
      keyword: '',
      status: '',
      count: 25,
    }
  }

  componentWillMount() {
    this.initPage(this.props.url)
  }

  componentDidMount() {
    this.setInitialData(this.props.url)
  }

  componentWillReceiveProps(nextProps) {
    const { pathname: currentPath } = this.props.url
    const { pathname: nextPath } = nextProps.url
    const { search: currentSearch } = this.props.url
    const { search: nextSearch } = nextProps.url
    if (currentPath !== nextPath || currentSearch !== nextSearch) {
      this.setInitialData(nextProps.url)
    }
  }

  initPage = (url) => {
    this.getParams(url)
    this.getList(1, 0)
  }

  setInitialData = (url) => {
    this.getParams(url)
    this.setQueryToList(url.search)
  }

  setQueryToList = (search) => {
    const parsed = queryString.parse(search)
    const { keyword } = parsed
    if (keyword) {
      this.setState({ keyword }, () => {
        this._getListSearch({ keyword, page: 1, count: 100 })
      })
    }
    else {
      const { pageId } = this
      const { count, status } = parsed
      this.getList(pageId, count, status)
    }
  }

  getList = (page, count, status) => {
    const query = {
      page: isNumeric(page) ? page : 1,
      count: isNumeric(count) ? count : 25
    }
    if (!!status && !!CONTRACT_STATUS_NUM[status]) {
      query.status = CONTRACT_STATUS_NUM[status]
    }

    this._getList(query)
  }

  getSearchTypeData = () => {
    return SEARCH_TYPE_DATA[this.searchType] || {}
  }
  
  getCount = () => {
    const list = this.props[this.getSearchTypeData()['list']] || {}
    const { count } = list
    return count
  }

  getParams = (url) => {
    const { pathname } = url
    this.searchType = pathname.split("/")[1] || ''
    this._getList = this.props[this.getSearchTypeData()['getList']] || (() => { })
    this._getListSearch = this.props[`${this.getSearchTypeData()['getList']}Search`] || (() => { })
    this.pageId = pathname.split("/")[2] || 1
  }

  getListByPage = (page) => {
    const count = this.getCount()
    const { status } = this.state
    const url = this.makeUrl(page, count, status)
    this.props.history.push(url);
  }

  getListByCount = (count) => {
    const { status } = this.state
    const url = this.makeUrl(1, count, status)
    this.props.history.push(url);
  }

  getListByStatus = (status) => {
    this.setState({ status }, () => {
      const count = this.getCount()
      const url = this.makeUrl(1, count, status)
      this.props.history.push(url);
    })
  }

  makeUrl = (page, count, status) => {
    let url = `/${this.searchType}`
    if (page) {
      url += `/${page}`
    }

    if (count || status) {
      url += '?'
    }

    if (count) {
      url += `count=${count}${status ? '&' : ''}`
    }

    if (status) {
      url += `status=${status}`
    }

    return url
  }

  changeSearch = (nextSearch) => {
    const { keyword } = this.state
    if (keyword === '' && nextSearch === '') {
      return
    }
    this.setState({ keyword: nextSearch }, () => {
      if (nextSearch) {
        this.props.history.push(`/${this.searchType}?keyword=${nextSearch}`);
      }
      else {
        this.props.history.push(`/${this.searchType}`);
      }
    })
  }

  render() {
    const list = this.props[this.getSearchTypeData()['list']] || {}
    const listSearch = this.props[`${this.getSearchTypeData()['list']}Search`]
    const tableClassName = this.getSearchTypeData()['tableClassName'] || ''
    const contentsClassName = this.getSearchTypeData()['contentsClassName'] || ''
    const noBoxText = this.getSearchTypeData()['noBoxText'] || ''
    const placeholder = this.getSearchTypeData()['placeholder'] || ''
    const title = this.getSearchTypeData()['title'] || ''

    const { keyword, status } = this.state
    const ListData = !keyword ? list : listSearch
    const { loading, data, page, listSize, count } = ListData;
    const noData = (data.length === 0) && !status
    const needPageOption = !keyword

    const TableContent = () => {
      if (noData) {
        return <NoBox text={keyword ? 'No Data' : noBoxText} />
      }
      else {
        return ([
          <table key='table' className={tableClassName}>
            <thead>
              <SearchTableHead searchType={this.searchType} getListByStatus={this.getListByStatus} />
            </thead>
            <tbody>
              {
                data.map((item, index) => (
                  <SearchTableBody key={index} data={item} searchType={this.searchType} index={index} />
                ))
              }
            </tbody>
          </table>,
          (needPageOption &&
            <SortHolder //
              key='SortHolder'
              count={count}
              getData={this.getListByCount}
            />),
          (loading &&
            <LoadingComponent
              key='LoadingComponent'
              style={{ position: 'absolute', width: '0', left: '185px', bottom: '10px' }}
            />),
          (needPageOption &&
            <Pagination //
              key='Pagination'
              pageNum={page}
              maxPageNum={calcMaxPageNum(listSize, count)}
              getData={this.getListByPage}
            />)
        ])
      }
    }

    const Content = () => {
      if (loading && noData) {
        return <LoadingComponent height='calc(100vh - 120px - 144px)' />
      }
      else {
        return (
          <div className="screen0">
            <div className="wrap-holder">
              <p className="title">{title}</p>
              <SearchInput
                id="sub-search-input"
                placeholder={placeholder}
                searchKeyword={keyword}
                changeSearch={this.changeSearch}
              />
              <div className={contentsClassName}>
                <SearchTableDesc searchType={this.searchType} listSize={listSize} />
                {TableContent()}
              </div>
            </div>
          </div>
        )
      }
    }

    return (
      <div className="content-wrap">
        {Content()}
      </div>
    );
  }
}

export default SearchPage;
