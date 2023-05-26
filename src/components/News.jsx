import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            fload: 0,
            pageSize: 10,
            search: "",
            country: "in"
        }
        document.title = (`${this.props.category[0].toUpperCase() + this.props.category.slice(1)} - Newsmonkey`)
    }


    async updateNews() {
        // this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.state.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.state.pageSize}`;
        this.props.setProgress(30)
        let api = await fetch(url);
        this.props.setProgress(50)
        let data = await api.json();
        this.props.setProgress(70)
        console.log("updatenews", data);
        this.setState({
            articles: this.state.articles.concat(data.articles),
            totalResults: data.totalResults,
            loading: false
        })
        this.props.setProgress(100)
    }

    async componentDidMount() {
        console.log("hi", this.state.page)
        this.updateNews()
    }

    // handlePreviousClick = async () => {
    //     this.setState({
    //         page: this.state.page - 1
    //     }, () => {
    //         console.log("Previous", this.state.page)
    //         this.updateNews()
    //     })

    // }
    // handleNextClick = async () => {
    //     console.log("Next before edit", this.state.page)
    //     this.setState({
    //         page: this.state.page + 1
    //     }, () => {
    //         console.log("Next", this.state.page)
    //         this.updateNews()
    //     })
    // }
    fetchData = () => {
        console.log("Fetch Data", this.state.page)
        this.setState({
            page: this.state.page + 1
        }, () => {
            console.log("Fetch data", this.state.page)
            this.updateNews()
        })
    }

    render() {

        return (
            <>
                <div className="h1 mt-4 text-center">NewsMonkey - Top {this.props.category[0].toUpperCase() + this.props.category.slice(1)} Headlines</div>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length} //This is important field to render the next data
                    next={this.fetchData}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={<Spinner />}
                    // endMessage={
                    //     <p style={{ textAlign: 'center' }}>
                    //         <b>Yay! You have seen it all</b>
                    //     </p>
                    // }
                    // below props only if you need pull down functionality
                    refreshFunction={this.updateNews}
                    pullDownToRefresh
                    pullDownToRefreshThreshold={50}
                    pullDownToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
                    }
                    releaseToRefreshContent={
                        <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
                    }
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((article) => {
                                // console.log(article.title);
                                // return <NewsItem key={article.url} title={article.title == null ? "No Title" : article.title.slice(0, 65)} desc={article.description == null ? "No Description" : article.description.slice(0, 100)} imageUrl={article.urlToImage ? article.urlToImage : "https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg"} url={article.url} />;

                                return <NewsItem key={article.url} title={article.title == null ? "No Title" : article.title} desc={article.description == null ? "Today's top headlines about" + article.title : article.description} imageUrl={article.urlToImage ? article.urlToImage : "https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg"} url={article.url} author={article.author ? article.author : "Unknown"} date={article.publishedAt} source={article.source.name} />;
                            })}
                        </div>
                    </div>
                </InfiniteScroll>


                {/* <div className="row">
                    <NewsItem title="myTitle" desc="myDesc" imageUrl="https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?cs=srgb&dl=pexels-pixabay-36717.jpg&fm=jpg" />
                </div> */}

                {/* <div className="d-flex justify-content-between mb-10">
                    <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}
