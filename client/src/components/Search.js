import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      searchResults: []
    };
    this.props.appPtr.updateWeights();
  }
  app = this.props.appPtr;

  handleQueryChange = event => {
    this.setState({ query: event.target.value });
  }

  orderedSearchResultsList = [];

  handleSearch = async event => {
    event.preventDefault();

    let data = [];
    if (this.state.query.trim()) {
      // Hardcoding localhost:9000 for now
      const res = await fetch("http://localhost:9000/search?q=" + this.state.query);
      data = await res.json();
    }
    this.orderedSearchResultsList = [];
    this.setState({ searchResults: data });
    data.forEach(x => { this.app.handleLinkShow(x.link) });
  }

  render() {
    if (Array.isArray(this.state.searchResults) && this.state.searchResults.length && !this.orderedSearchResultsList.length) {
      let orderedSearchResults = {};
      this.state.searchResults.forEach(x => {
        orderedSearchResults[-this.app.getRating(this.app.state.currentUser, x.link)] = x;
      })
      let keys = Object.keys(orderedSearchResults), i, len = keys.length;
      keys.sort(function (a, b) { return a - b });
      for (i = 0; i < len; i++) {
        console.log(keys[i] + orderedSearchResults[keys[i]].link);
        this.orderedSearchResultsList.push(orderedSearchResults[keys[i]]);
      }
    }
    const results = this.orderedSearchResultsList.map(r => {
      // const results = this.state.searchResults.map(r => {
      let thumbnail;
      if (r.pagemap && r.pagemap.cse_thumbnail) {
        thumbnail = <img
          src={r.pagemap.cse_thumbnail[0].src}
          width={r.pagemap.cse_thumbnail[0].width}
          height={r.pagemap.cse_thumbnail[0].height}
          alt='' />
      }
      return <li key={r.link}>
        <a
          // href={r.link} target="_blank" 
          onClick={() => {
            this.app.handleLinkClick(r.link)
          }}
          style={{ fontWeight: (r.link in this.app.state.resourceData) ? "bold" : "normal" }}
        >{r.title}</a>
        <p>{r.snippet}</p>
        {thumbnail}
        <br /><br />
      </li>
    });
    return (
      <div className="Search" >
        <h1>Search</h1>
        <form onSubmit={this.handleSearch}>
          <label>
            Query:
            <input
              type='text'
              maxLength='50'
              value={this.state.query}
              onChange={this.handleQueryChange} />
          </label>
          <input type='submit' value='Search' />
        </form>
        <ul>{results}</ul>
      </div>
    );
  }
}
export default Search;
