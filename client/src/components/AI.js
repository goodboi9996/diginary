import React, { Component } from "react";
import { create, all } from 'mathjs';

const config = {};
const math = create(all, config);

const constParams = 1;
const params = 10;

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
            resource: res
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
                    <tr>{"Dot Product: " + this.getDot()}</tr>
                    <tr>{"Euclidean Distance: " + this.getEucDist()}</tr>
                    <tr>{"Cosine Distance: " + this.getCosDist()}</tr>

                </table>

            </div>
        );
    }
}
export default AI;