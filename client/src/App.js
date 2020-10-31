import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Test from './components/Test';
import Search from './components/Search';
import AI from './components/AI';
import { create, all } from 'mathjs';
const config = {};
const math = create(all, config);

// our "database"
const resourceList = ["https://www.mathsisfun.com/", "https://www.khanacademy.org/math", "http://www.math.com/", "https://www.mathplayground.com/", "https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math", "https://en.wikipedia.org/wiki/English_language", "https://www.ets.org/toefl", "https://en.wikipedia.org/wiki/English", "https://www.cambridgeenglish.org/", "https://www.elections.ny.gov/NYSBOE/download/voting/AbsenteeBallot-English.pdf"]
const userList = ["goodboi9996", "6176UD"];
const params = 10;

class App extends Component {
  constructor(props) {
    super(props);
    //first is credibility (manually changed)
    let resourceData = {};
    resourceList.forEach((x) => { resourceData[x] = { vec: math.random([params], -1, 1), cred: math.random(-1, 1) } })
    let userData = {};
    userList.forEach((x) => { userData[x] = { vec: math.random([params], -1, 1) } })
    this.state = {
      resourceData,
      userData
    };
    console.log(this.state);
  }




  render() {
    return (
      <BrowserRouter>
        <div className="App" >
          <Navbar />
          <Route path='/search' component={Search} />
          <Route
            path='/ai'
            render={(props) => (
              <AI {...props} appPtr={this} />
            )}
          />
          <Route path='/test' component={Test} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
