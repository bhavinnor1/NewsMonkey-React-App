import './App.css'
import NavBar from './components/NavBar'
import React, { Component } from 'react'
import News from './components/News'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Search from './components/Search'
import LoadingBar from 'react-top-loading-bar'
// const api_key = "dd37fb8453a14259b1ba963cb1f6adc7";


export default class App extends Component {
  apiKey = import.meta.env.VITE_NEWS_API_KEY;
  // apiKey = "dd37fb8453a14259b1ba963cb1f6adc7";
  // constructor() {
  //   super();
  //   this.state = {

  //   }
  // }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      fload: 0,
      pageSize: 10,
      search: "",
      country: "in",
      category: "business",
      submitted: false,
      progress: 10
    }
  }
  handleChange = (e) => {
    this.setState({
      search: e.target.value
    })
  }
  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?q=${this.state.search}&apiKey=${this.apiKey}&page=${this.state.page}&pageSize=${this.state.pageSize}`;
    this.setState({
      loading: true
    })
    let api = await fetch(url);
    let data = await api.json();
    console.log("updatenews", data);
    this.setState({
      articles: data.articles,
      loading: false,
      totalResults: data.totalResults
    })
  }
  handleSearch = async () => {
    const url = `https://newsapi.org/v2/top-headlines?q=${this.state.search}&apiKey=${this.apiKey}&pageSize=${this.state.pageSize}`;
    this.setState({
      loading: true,
      submitted: true
    })
    let api = await fetch(url);
    let data = await api.json();
    console.log("updatenews", data);
    console.log(data.articles);
    this.setState({
      articles: data.articles,
      loading: false,
      totalResults: data.totalResults,
      submitted: false
    })
  }
  handlePreviousClick = async () => {
    this.setState({
      page: this.state.page - 1
    }, () => {
      console.log("Previous", this.state.page)
      this.updateNews()
    })

  }
  handleNextClick = async () => {
    console.log("Next before edit", this.state.page)
    this.setState({
      page: this.state.page + 1
    }, () => {
      console.log("Next", this.state.page)
      this.updateNews()
    })
  }
  setProgress = (percent) => {
    this.setState({
      progress: percent
    })
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <NavBar submitted={this.state.submitted} search={this.state.search} handleChange={this.handleChange} handleSearch={this.handleSearch} />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path='/' element={<News setProgress={this.setProgress} key="home" category="general" handleNextClick={this.handleNextClick} handlePreviousClick={this.handlePreviousClick} totalResults={this.state.totalResults} page={this.state.page} loading={this.state.loading} articles={this.state.articles} search={this.state.search} pageSize={this.state.pageSize} country="in" apiKey={this.apiKey} />} />
            <Route exact path='/science' element={<News setProgress={this.setProgress} key="science" category="science" handleNextClick={this.handleNextClick} handlePreviousClick={this.handlePreviousClick} totalResults={this.state.totalResults} page={this.state.page} loading={this.state.loading} articles={this.state.articles} search={this.state.search} pageSize={this.state.pageSize} country="in" apiKey={this.apiKey} />} />
            <Route exact path='/sports' element={<News setProgress={this.setProgress} key="sports" category="sports" handleNextClick={this.handleNextClick} handlePreviousClick={this.handlePreviousClick} totalResults={this.state.totalResults} page={this.state.page} loading={this.state.loading} articles={this.state.articles} search={this.state.search} pageSize={this.state.pageSize} country="in" apiKey={this.apiKey} />} />
            <Route exact path='/business' element={<News setProgress={this.setProgress} key="business" category="business" handleNextClick={this.handleNextClick} handlePreviousClick={this.handlePreviousClick} totalResults={this.state.totalResults} page={this.state.page} loading={this.state.loading} articles={this.state.articles} search={this.state.search} pageSize={this.state.pageSize} country="in" apiKey={this.apiKey} />} />
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress} key="entertainment" category="entertainment" handleNextClick={this.handleNextClick} handlePreviousClick={this.handlePreviousClick} totalResults={this.state.totalResults} page={this.state.page} loading={this.state.loading} articles={this.state.articles} search={this.state.search} pageSize={this.state.pageSize} country="in" apiKey={this.apiKey} />} />
            <Route exact path='/general' element={<News setProgress={this.setProgress} key="general" category="general" handleNextClick={this.handleNextClick} handlePreviousClick={this.handlePreviousClick} totalResults={this.state.totalResults} page={this.state.page} loading={this.state.loading} articles={this.state.articles} search={this.state.search} pageSize={this.state.pageSize} country="in" apiKey={this.apiKey} />} />
            <Route exact path='/health' element={<News setProgress={this.setProgress} key="health" category="health" handleNextClick={this.handleNextClick} handlePreviousClick={this.handlePreviousClick} totalResults={this.state.totalResults} page={this.state.page} loading={this.state.loading} articles={this.state.articles} search={this.state.search} pageSize={this.state.pageSize} country="in" apiKey={this.apiKey} />} />
            <Route exact path='/technology' element={<News setProgress={this.setProgress} key="technology" category="technology" handleNextClick={this.handleNextClick} handlePreviousClick={this.handlePreviousClick} totalResults={this.state.totalResults} page={this.state.page} loading={this.state.loading} articles={this.state.articles} search={this.state.search} pageSize={this.state.pageSize} country="in" apiKey={this.apiKey} />} />
            <Route exact path='/search' element={<Search key="technology" category="technology" handleNextClick={this.handleNextClick} handlePreviousClick={this.handlePreviousClick} totalResults={this.state.totalResults} page={this.state.page} loading={this.state.loading} articles={this.state.articles} search={this.state.search} pageSize={this.state.pageSize} country="in" apiKey={this.apiKey} />} />
          </Routes>

        </BrowserRouter>
      </>
    )
  }
}
