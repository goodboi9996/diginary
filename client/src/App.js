import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Test from './components/Test';
import Search from './components/Search';


class App extends Component {
  render() {
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
