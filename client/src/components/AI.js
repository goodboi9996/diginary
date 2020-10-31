import React, { Component } from "react";
import { create, all } from 'mathjs';

const config = {};
const math = create(all, config);

const constParams = 1;
const params = 10;
//global for whole project
const learningRate = 1;

class AI extends Component {
    constructor(props) {
        super(props);
        let usr = math.random([constParams + params], -1, 1);
        let res = math.random([constParams + params], -1, 1);
        for (let i = 0; i < constParams; i++) {
            usr[i] = 0;
            res[i] = 0;
        }
        this.state = {
            user: usr,
            resource: res,
            regularization: true
        };
    }

    getDot() {
        return math.dot(this.state.user, this.state.resource);
    }

    getEucDist() {
        return math.distance(this.state.user, this.state.resource);
    }

    getCosDist() {
        return this.getDot() / math.distance(this.state.user, math.zeros(params + constParams)) / math.distance(this.state.resource, math.zeros(params + constParams));
    }

    // sigmoid(x){
    //     return 
    // }

    trainUser = (customlr, lambda, dotTarget) => {
        let output = this.getDot();
        let gradient = math.multiply(output - dotTarget, this.state.resource)
        // let gradient = math.subtract(this.state.user, this.state.resource);
        if (this.state.regularization) {
            gradient = math.add(gradient, math.multiply(lambda, this.state.user));
        }
        // console.log(gradient); console.log(math.multiply(3, gradient));
        for (let i = 0; i < constParams; i++) {
            gradient[i] = 0;
        }
        this.setState({ user: math.add(this.state.user, math.multiply(-1 * customlr * learningRate, gradient)) });
    }

    trainResource = (customlr, lambda, dotTarget) => {
        let output = this.getDot();
        let gradient = math.multiply(output - dotTarget, this.state.user)
        if (this.state.regularization) {
            gradient = math.add(gradient, math.multiply(lambda, this.state.resource));
        }
        for (let i = 0; i < constParams; i++) {
            gradient[i] = 0;
        }
        this.setState({ resource: math.add(this.state.resource, math.multiply(-1 * customlr * learningRate, gradient)) });
    }

    toggleRegularization = () => {
        this.setState({ regularization: !this.state.regularization });
    }


    render() {
        let tableData = [["User", "Resource"]];
        for (let i = 0; i < constParams + params; i++) {
            tableData.push([this.state.user[i], this.state.resource[i]]);
        }
        return (
            <div id="AI">
                <table style={{ width: "50%" }}>
                    <tbody>
                        {tableData.map((x, i) => {
                            return <tr key={i}>{x.map((X, j) => {
                                return (<th key={j} style={{ border: "1px solid #dddddd" }}>{X}</th>);
                            })}</tr>
                        })}
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr><th>{"Dot Product: " + this.getDot()}</th></tr>
                        <tr><th>{"Euclidean Distance: " + this.getEucDist()}</th></tr>
                        <tr><th>{"Cosine Distance: " + this.getCosDist()}</th></tr>
                        <tr><th>{"Learning Rate: " + learningRate}</th></tr>
                        <tr><th><button onClick={() => { this.trainUser(0.1, 1, 1) }}>Train User (Target=1)</button></th></tr>
                        <tr><th><button onClick={() => { this.trainResource(0.1, 1, 1) }}>Train Resource (Target=1)</button></th></tr>
                        <tr><th><button onClick={() => { this.trainUser(0.1, 1, -1) }}>Train User (Target=-1)</button></th></tr>
                        <tr><th><button onClick={() => { this.trainResource(0.1, 1, -1) }}>Train Resource (Target=-1)</button></th></tr>
                        <tr><th><button onClick={this.toggleRegularization}>Regularization: {this.state.regularization ? "True" : "False"}</button></th></tr>
                    </tbody>
                </table>

            </div>
        );
    }
}
export default AI;