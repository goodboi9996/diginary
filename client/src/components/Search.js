import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      searchResults: []
    };
  }

  handleQueryChange = event => {
    this.setState({ query: event.target.value });
  }

  handleSearch = async event => {
    event.preventDefault();

    let data = [];
    if (this.state.query.trim()) {
      // Hardcoding localhost:9000 for now
      const res = await fetch("http://localhost:9000/search?q=" + this.state.query);
      data = await res.json();
    }
    this.setState({ searchResults: data });
  }

  render() {
    const results = this.state.searchResults.map(r => {
      let thumbnail;
      if (r.pagemap && r.pagemap.cse_thumbnail) {
        thumbnail = <img
          src={r.pagemap.cse_thumbnail[0].src}
          width={r.pagemap.cse_thumbnail[0].width}
          height={r.pagemap.cse_thumbnail[0].height}
          alt='' />
      }
      return <li key={r.link}>
        <a href={r.link}>{r.title}</a>
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
