import React, { Component } from "react";

class App extends Component {
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
    event.preventDefault()
    // Hardcoding for now
    const res = await fetch("http://localhost:9000/search?q=" + this.state.query);
    console.log(res);
    const data = await res.json();
    console.log(data);
    this.setState({ searchResults: data });
  }

  render() {
    console.log(this.state.searchResults);
    const results = this.state.searchResults.map(r => {
      return <li key={r.link}><a href={r.link}>{r.title}</a></li>
    });
    return (
      <div className="App" >
        <h1>Digial Inclusion Challenge</h1>
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

export default App;
