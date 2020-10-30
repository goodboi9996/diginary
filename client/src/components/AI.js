import React, { Component } from "react";
import { create, all } from 'mathjs';

const config = {};
const math = create(all, config);

const constParams = 1;
const params = 10;

class AI extends Component {
    constructor(props) {
        super(props);
        let usr = math.random([1, constParams + params], -1, 1);
        let res = math.random([constParams + params, 1], -1, 1);
        for (let i = 0; i < constParams; i++) {
            usr[0][i] = 0;
            res[i][0] = 0;
        }
        this.state = {
            user: usr,
            resource: res
        };
    }

    getMult() {
        return math.multiply(this.state.user, this.state.resource);
    }

    render() {
        let tableData = [["User", "Resource"]];
        for (let i = 0; i < constParams + params; i++) {
            tableData.push([this.state.user[0][i], this.state.resource[i][0]]);
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
                <p>{"Result: " + this.getMult()[0][0]}</p>
            </div>
        );
    }
}
export default AI;