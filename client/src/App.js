import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navibar from './components/Navibar';
import Test from './components/Test';
import Search from './components/Search';
import AIpage from './components/AIpage';
import Feed from './components/Feed';
import { create, all } from 'mathjs';
const config = {};
const math = create(all, config);

//our "database"
const resourceList = ["https://www.mathsisfun.com/", "https://www.khanacademy.org/math", "http://www.math.com/", "https://www.mathplayground.com/", "https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math", "https://en.wikipedia.org/wiki/English_language", "https://www.ets.org/toefl", "https://en.wikipedia.org/wiki/English", "https://www.cambridgeenglish.org/", "https://www.elections.ny.gov/NYSBOE/download/voting/AbsenteeBallot-English.pdf"]
const userList = ["goodboi9996", "6176UD", "3"];

//hyperparameters
const params = 10;
const activation = "sigmoid";
const costfunction = "mse";
const globalLearningRate = 0.5;
const globalLambda = 0;

//settings
const linkClickCred = 0;
const linkShowCred = 0;
const linkClickResTarget = 1;
const linkClickResLR = 1;
const linkShowResTarget = 0;
const linkShowResLR = 0.1;
const linkClickUsrTarget = 1;
const linkClickUsrLR = 1;
const linkShowUsrTarget = 1;
const linkShowUsrLR = 0.1;
//make user cred later?

class App extends Component {
  constructor(props) {
    super(props);
    //first is credibility (manually changed)
    let resourceData = {};
    resourceList.forEach((x) => { resourceData[x] = { vec: math.random([params], -1, 1), cred: 0 } })
    let userData = {};
    userList.forEach((x) => { userData[x] = { vec: math.random([params], -1, 1), searchHistory: [], viewHistory: [] } })
    this.state = {
      resourceData, userData, currentUser: userList[0],
      searchResults: []
    };
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleLinkShow = this.handleLinkShow.bind(this);

    // console.log(this.state);
  }

  actF = {
    "none": [x => { return x; }, () => { return 1; }],
    "sigmoid": [x => { return 1 / (1 + math.exp(-x)); }, (x => {
      let s = 1 / (1 + math.exp(-x));
      return s * (1 - s);
    })]
  };

  cost = {
    "mse": [(x, target) => { return (x - target) * (x - target); }, (x, target) => { return 2 * (x - target); }],
    "ce": [
      (x, target) => {
        return -target * math.log(x) + (1 - target) * math.log(1 - x);
      },
      (x, target) => {
        return -target / x - (1 - target) / (1 - x);
      }
    ]
  };

  resUpdates = {};
  resCredUpdates = {};
  usrUpdates = {};

  updateWeights = () => {
    let ud = this.state.userData;
    for (let userKey in this.usrUpdates) {
      ud[userKey].vec = math.subtract(ud[userKey].vec, this.usrUpdates[userKey]);
    }
    let rd = this.state.resourceData;
    for (let resourceKey in this.resUpdates) {
      if (!resourceKey in this.state.resourceData) {
        console.log(resourceKey);
      } else {
        rd[resourceKey].vec = math.subtract(rd[resourceKey].vec, this.resUpdates[resourceKey]);
      }
    }
    for (let resourceKey in this.resCredUpdates) {
      rd[resourceKey].cred += this.resCredUpdates[resourceKey];
    }
    this.setState({ userData: ud, resourceData: rd })
    this.resUpdates = {};
    this.resCredUpdates = {};
    this.usrUpdates = {};
  }

  getGrad = (x, theta, target, actf, costf, lambda) => {
    let dotOutput = math.dot(x, theta);
    let output = this.actF[actf][0](dotOutput);
    // let costV = cost[costf][0](output, target);
    let costG = this.cost[costf][1](output, target);
    let outputG = costG * this.actF[actf][1](dotOutput);
    let grad = math.multiply(outputG, x);
    grad = math.add(grad, math.multiply(lambda, theta));
    return grad;
  }

  trainUser = (lr, userKey, resourceKey, target) => {
    let grad = this.getGrad(this.state.resourceData[resourceKey].vec, this.state.userData[userKey].vec, target, activation, costfunction, globalLambda);
    if (userKey in this.usrUpdates) {
      this.usrUpdates[userKey] = math.add(this.usrUpdates[userKey], math.multiply(lr * globalLearningRate, grad));
    } else {
      this.usrUpdates[userKey] = math.multiply(lr * globalLearningRate, grad);
    }
  }

  trainResource = (lr, userKey, resourceKey, target) => {
    if (resourceKey in this.state.resourceData) {
      let grad = this.getGrad(this.state.userData[userKey].vec, this.state.resourceData[resourceKey].vec, target, activation, costfunction, globalLambda);
      if (resourceKey in this.resUpdates) {
        this.resUpdates[resourceKey] = math.add(this.resUpdates[resourceKey], math.multiply(lr * globalLearningRate, grad));
      } else {
        this.resUpdates[resourceKey] = math.multiply(lr * globalLearningRate, grad);
      }
    }
  }

  getRating = (userKey, resourceKey) => {
    if ((resourceKey in this.state.resourceData) && (userKey in this.state.userData)) {
      return this.actF[activation][0](this.state.resourceData[resourceKey].cred + math.dot(this.state.userData[userKey].vec, this.state.resourceData[resourceKey].vec));
    }
    console.log(userKey);
    return math.random(0, 1) - 100;
  }

  handleLinkClick = (resourceKey) => {
    if (resourceKey in this.state.resourceData) {
      if (resourceKey in this.resCredUpdates) {
        this.resCredUpdates[resourceKey] += linkClickCred;
      } else {
        this.resCredUpdates[resourceKey] = linkClickCred;
      }
      this.trainUser(linkClickUsrLR, this.state.currentUser, resourceKey, linkClickUsrTarget);
      this.trainResource(linkClickResLR, this.state.currentUser, resourceKey, linkClickResTarget);
    }
    this.updateWeights();
    console.log(this.getRating(this.state.currentUser, resourceKey));
  }
  handleLinkShow = (resourceKey) => {
    if (resourceKey in this.state.resourceData) {
      if (resourceKey in this.resCredUpdates) {
        this.resCredUpdates[resourceKey] += linkShowCred;
      } else {
        this.resCredUpdates[resourceKey] = linkShowCred;
      }
      this.trainUser(linkShowUsrLR, this.state.currentUser, resourceKey, linkShowUsrTarget);
      this.trainResource(linkShowResLR, this.state.currentUser, resourceKey, linkShowResTarget);
    }
  }
  switchUser = (userKey) => {
    if (userKey in this.state.userData) {
      this.setState({ currentUser: userKey });
    }
  }
  orderedSearchResultsList = [];
  handleSearch = async (e, handleShow) => {
    e.preventDefault();
    let data = [];
    if (e.target["0"].value.trim()) {
      const res = await fetch("http://localhost:9000/search?q=" + e.target[0].value);
      data = await res.json();
    }
    if (data) {
      this.orderedSearchResultsList = [];
      this.setState({ searchResults: data });
      data.forEach(x => { this.handleLinkShow(x.link) });
    }
  }
  render() {
    if (Array.isArray(this.state.searchResults) && this.state.searchResults.length && !this.orderedSearchResultsList.length) {
      let orderedSearchResults = {};
      this.state.searchResults.forEach(x => {
        orderedSearchResults[-this.getRating(this.state.currentUser, x.link)] = x;
      })
      let keys = Object.keys(orderedSearchResults), i, len = keys.length;
      keys.sort(function (a, b) { return a - b });
      for (i = 0; i < len; i++) {
        console.log(keys[i] + orderedSearchResults[keys[i]].link);
        this.orderedSearchResultsList.push(orderedSearchResults[keys[i]]);
      }
    }

    return (
      <BrowserRouter>
        <div className="App" >
          <Navibar userList={userList} appPtr={this}
          // searchPtr={search} 
          />
          <Search appPtr={this} rowSize={4} orderedSearchResultsList={this.orderedSearchResultsList} />
          <Route
            path='/feed'
            render={(props) => (
              <Feed {...props} appPtr={this} rowSize={4} orderedSearchResultsList={this.orderedSearchResultsList} />
            )}
          />
          <Route
            path='/aipage'
            render={(props) => (
              <AIpage {...props} appPtr={this} />
            )}
          />
          <Route path='/test' component={Test} />
        </div>
      </BrowserRouter >
    );
  }
}

export default App;
