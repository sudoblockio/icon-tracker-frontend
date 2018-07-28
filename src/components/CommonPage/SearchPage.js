import React, { Component } from 'react';
import queryString from 'query-string'
import {
  startsWith,
  calcMaxPageNum,
} from 'utils/utils';
import {
  SEARCH_TYPE,
  SEARCH_TYPE_DATA,
} from 'utils/const'
import {
  LoadingComponent,
  Pagination,
  SortHolder,
  NoBox,
  SearchInput,
  SearchTableHead,
  SearchTableBody,
  SearchTableDesc
} from 'components';

class ContractsPage extends Component {

  constructor(props) {
    super(props)
    this.searchType = ''
    this.pageId = 1
    this.getList = () => { }
    this.getListSearch = () => { }
    this.state = {
      searchKeyword: ''
    }
  }

  componentWillMount() {
    this.setInitialData(this.props.url)
  }

  componentWillReceiveProps(nextProps) {
    const { pathname: currentPath } = this.props.url
    const { pathname: nextPath } = nextProps.url
    if (currentPath !== nextPath && startsWith(nextPath, `/${this.searchType}`)) {
      this.setInitialData(nextProps.url)
    }
    else {
      const { search: currentSearch } = this.props.url
      const { search: nextSearch } = nextProps.url
      if (currentSearch !== nextSearch) {
        this.setSearch(nextSearch)
      }
    }
  }

  setInitialData = (url, sort) => {
    this.getParams(url)
    this.getList = this.props[this.getSearchTypeData()['getList']] || (() => { })
    this.getListSearch = this.props[`${this.getSearchTypeData()['getList']}Search`] || (() => { })
    const list = this.props[this.getSearchTypeData()['list']] || {}
    const { count } = list
    this.getListByCount(sort || count)
    const { search } = url
    if (search) {
      this.setSearch(search)
    }
  }

  getSearchTypeData = () => {
    return SEARCH_TYPE_DATA[this.searchType] || {}
  }

  getParams = (url) => {
    const { pathname } = url
    this.searchType = pathname.split("/")[1] || ''
    this.pageId = pathname.split("/")[2] || 1
  }

  getListByCount = (count) => {
    switch (this.searchType) {
      case SEARCH_TYPE.CONTRACTS:
        this.getList({ page: this.pageId, count })
        break
      case SEARCH_TYPE.TOKENS:
        this.getList({})
        break

      default:
    }
  }

  getListByPage = (page) => {
    this.props.history.push(`/${this.searchType}/${page}`);
  }

  setSearch = (_search) => {
    const parsed = queryString.parse(_search)
    const { search } = parsed
    this.setState({ searchKeyword: search || '' }, () => {
      if (search) {
        this.getListSearch({ keyword: search, page: 1, count: 100 })
      }
    })
  }

  changeSearch = (nextSearch) => {
    const { search } = this.state
    if (search === '' && nextSearch === '') return
    if (nextSearch) {
      this.props.history.push(`/${this.searchType}?search=${nextSearch}`);
    }
    else {
      this.props.history.push(`/${this.searchType}`);
    }
  }

  render() {
    const { searchKeyword } = this.state
    const list = this.props[this.getSearchTypeData()['list']] || {}
    const listSearch = this.props[`${this.getSearchTypeData()['list']}Search`]
    const tableClassName = this.getSearchTypeData()['tableClassName'] || ''
    const contentsClassName = this.getSearchTypeData()['contentsClassName'] || ''
    const noBoxText = this.getSearchTypeData()['noBoxText'] || ''
    const placeholder = this.getSearchTypeData()['placeholder'] || ''
    const title = this.getSearchTypeData()['title'] || ''

    const ListData = !searchKeyword ? list : listSearch //
    const { loading, data, page, listSize, count } = ListData;
    const noData = data.length === 0

    const needOption = !searchKeyword && this.searchType === SEARCH_TYPE.CONTRACTS

    const TableContent = () => {
      if (noData) {
        return <NoBox text={searchKeyword ? 'No Data' : noBoxText} /> //
      }
      else {
        return ([
          <table
            key='table'
            className={tableClassName} //
          >
            <thead>
              <SearchTableHead searchType={this.searchType} />
            </thead>
            <tbody>
              {
                data.map((item, index) => (
                  <SearchTableBody key={index} data={item} searchType={this.searchType} index={index} />
                ))
              }
            </tbody>
          </table>,
          (needOption &&
            <SortHolder //
              key='SortHolder'
              count={count}
              getData={this.getListByCount}
            />),
          (needOption &&
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
      if (loading) {
        return <LoadingComponent height='calc(100vh - 120px - 144px)' />
      }
      else {
        return (
          <div className="screen0">
            <div className="wrap-holder">
              <p className="title">{title}</p> {/**/}
              <SearchInput
                id="sub-search-input"
                placeholder={placeholder}
                searchKeyword={searchKeyword}
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

export default ContractsPage;
