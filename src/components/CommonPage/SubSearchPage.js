import React, { Component } from 'react';
import queryString from 'query-string'
import {
  startsWith,
  calcMaxPageNum,
} from '../../utils/utils';
import {
  SUB_SEARCH_TYPE,
  SUB_SEARCH_TYPE_DATA,
} from '../../utils/const'
import {
  LoadingComponent,
  Pagination,
  SortHolder,
  NoBox,
  SearchInput,
  SubSearchTableHead,
  SubSearchTableBody,
  SubSearchTableDesc
} from '../../components/';

class ContractsPage extends Component {

  constructor(props) {
    super(props)
    this.subSearchType = ''
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
    if (currentPath !== nextPath && startsWith(nextPath, `/${this.subSearchType}`)) {
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
    this.getList = this.props[this.getSubSearchTypeData()['getList']] || (() => { })
    this.getListSearch = this.props[`${this.getSubSearchTypeData()['getList']}Search`] || (() => { })
    const list = this.props[this.getSubSearchTypeData()['list']] || {}
    const { count } = list
    this.getListByCount(sort || count)
    const { search } = url
    if (search) {
      this.setSearch(search)
    }
  }

  getSubSearchTypeData = () => {
    return SUB_SEARCH_TYPE_DATA[this.subSearchType] || {}
  }

  getParams = (url) => {
    const { pathname } = url
    this.subSearchType = pathname.split("/")[1] || ''
    this.pageId = pathname.split("/")[2] || 1
  }

  getListByCount = (count) => {
    switch (this.subSearchType) {
      case SUB_SEARCH_TYPE.CONTRACTS:
        this.getList({ page: this.pageId, count })
        break
      case SUB_SEARCH_TYPE.TOKENS:
        this.getList({})
        break

      default:
    }
  }

  getListByPage = (page) => {
    this.props.history.push(`/${this.subSearchType}/${page}`);
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
      this.props.history.push(`/${this.subSearchType}?search=${nextSearch}`);
    }
    else {
      this.props.history.push(`/${this.subSearchType}`);
    }
  }

  render() {
    const { searchKeyword } = this.state
    const list = this.props[this.getSubSearchTypeData()['list']] || {}
    const listSearch = this.props[`${this.getSubSearchTypeData()['list']}Search`]
    const tableClassName = this.getSubSearchTypeData()['tableClassName'] || ''
    const contentsClassName = this.getSubSearchTypeData()['contentsClassName'] || ''
    const noBoxText = this.getSubSearchTypeData()['noBoxText'] || ''
    const placeholder = this.getSubSearchTypeData()['placeholder'] || ''
    const title = this.getSubSearchTypeData()['title'] || ''

    const ListData = !searchKeyword ? list : listSearch //
    const { loading, data, page, listSize, count } = ListData;
    const noData = data.length === 0

    const needOption = !searchKeyword && this.subSearchType === SUB_SEARCH_TYPE.CONTRACTS

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
              <SubSearchTableHead subSearchType={this.subSearchType} />
            </thead>
            <tbody>
              {
                data.map((item, index) => (
                  <SubSearchTableBody key={index} data={item} subSearchType={this.subSearchType} index={index} />
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
                <SubSearchTableDesc subSearchType={this.subSearchType} listSize={listSize} />
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
