import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Test from './components/Test';
import Search from './components/Search';
import AIpage from './components/AIpage';
import { create, all } from 'mathjs';
const config = {};
const math = create(all, config);

//our "database"
const resourceList = ["https://www.mathsisfun.com/", "https://www.khanacademy.org/math", "http://www.math.com/", "https://www.mathplayground.com/", "https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math", "https://en.wikipedia.org/wiki/English_language", "https://www.ets.org/toefl", "https://en.wikipedia.org/wiki/English", "https://www.cambridgeenglish.org/", "https://www.elections.ny.gov/NYSBOE/download/voting/AbsenteeBallot-English.pdf"]
const userList = ["goodboi9996", "6176UD"];

//hyperparameters
const params = 10;
const activation = "sigmoid";
const costfunction = "mse";
const globalLearningRate = 1;
const globalLambda = 0;

class App extends Component {
  constructor(props) {
    super(props);
    //first is credibility (manually changed)
    let resourceData = {};
    resourceList.forEach((x) => { resourceData[x] = { vec: math.random([params], -1, 1), cred: math.random(-1, 1) } })
    let userData = {};
    userList.forEach((x) => { userData[x] = { vec: math.random([params], -1, 1) } })
    this.state = {
      resourceData, userData
    };
    console.log(this.state);
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
    let ud = this.state.userData;
    ud[userKey].vec = math.subtract(ud[userKey].vec, math.multiply(lr * globalLearningRate, grad));
    this.setState({ userData: ud });
  }

  trainResource = (lr, userKey, resourceKey, target) => {
    let grad = this.getGrad(this.state.userData[userKey].vec, this.state.resourceData[resourceKey].vec, target, activation, costfunction, globalLambda);
    let rd = this.state.resourceData;
    rd[resourceKey].vec = math.subtract(rd[resourceKey].vec, math.multiply(lr * globalLearningRate, grad));
    this.setState({ resourceData: rd });
  }

  getRating = (userKey, resourceKey) => {
    return this.actF[activation][0](this.state.resourceData[resourceKey].cred + math.dot(this.state.userData[userKey].vec, this.state.resourceData[resourceKey].vec));
  }


  render() {
    return (
      <BrowserRouter>
        <div className="App" >
          <Navbar />
          <Route path='/search' component={Search} />
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
