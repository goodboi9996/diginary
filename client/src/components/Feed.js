import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button
} from "shards-react";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.props.appPtr.updateWeights();
    this.props.appPtr.handleSearch({
      preventDefault: () => { },
      target: { "0": { value: "8===D" } }
    });
  }
  app = this.props.appPtr;

  render() {
    return null;
  }
}
export default Feed;
