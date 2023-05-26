import React, { Component } from 'react'
import Spinner from './Spinner';
import NewsItem from './NewsItem';

export class Search extends Component {
    render() {
        return (
            <div className="container mb-5">
                <div className="h1 mt-4 text-center">NewsMonkey - Top Headlines</div>
                {this.props.loading && <Spinner />}
                {!this.props.loading && <div className="row">
                    {this.props.articles.map((article) => {
                        // console.log(article.title);
                        // return <NewsItem key={article.url} title={article.title == null ? "No Title" : article.title.slice(0, 65)} desc={article.description == null ? "No Description" : article.description.slice(0, 100)} imageUrl={article.urlToImage ? article.urlToImage : "https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg"} url={article.url} />;

                        return <NewsItem key={article.url} title={article.title == null ? "No Title" : article.title} desc={article.description == null ? "Today's top headlines about" + article.title : article.description} imageUrl={article.urlToImage ? article.urlToImage : "https://static.vecteezy.com/system/resources/thumbnails/004/216/831/original/3d-world-news-background-loop-free-video.jpg"} url={article.url} author={article.author ? article.author : "Unknown"} date={article.publishedAt} source={article.source.name} />;
                    })}
                </div>}
                {/* <div className="row">
            <NewsItem title="myTitle" desc="myDesc" imageUrl="https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?cs=srgb&dl=pexels-pixabay-36717.jpg&fm=jpg" />
        </div> */}
                <div className="d-flex justify-content-between mb-10">
                    <button disabled={this.props.page <= 1} className="btn btn-dark" onClick={this.props.handlePreviousClick}>&larr; Previous</button>
                    <button disabled={this.props.page + 1 > Math.ceil(this.props.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.props.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default Search