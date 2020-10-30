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
    console.log(this.state.searchResults);
    const results = this.state.searchResults.map(r => {
      return <li key={r.link}><a href={r.link}>{r.title}</a></li>
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
