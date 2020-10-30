import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Test from './components/Test';
import Search from './components/Search';


class App extends Component {
  render() {
    const results = this.state.searchResults.map(r => {
      return <li key={r.link}><a href={r.link}>{r.title}</a></li>
    });
    return (
      <BrowserRouter>
        <div className="App" >
          <Navbar />
          <Route path='/search' component={Search} />
          <Route path='/test' component={Test} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
