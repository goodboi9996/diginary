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
  }
  app = this.props.appPtr;
  feed = this.app.compileFeed();

  render() {
    this.feed = this.app.compileFeed();
    let rows = [];
    if (Array.isArray(this.feed) && this.feed.length) {
      const cards = this.feed.map(r => {
        let thumbnail;
        if (r.pagemap && r.pagemap.cse_thumbnail) {
          thumbnail = <CardImg
            top
            src={r.pagemap.cse_thumbnail[0].src}
            width={r.pagemap.cse_thumbnail[0].width}
            height={r.pagemap.cse_thumbnail[0].height * 1.5}
            alt='' />
        }
        return <Card key={r.link}>
          <CardHeader>{r.displayLink}</CardHeader>
          {thumbnail}
          <CardBody>
            <CardTitle>{r.title}</CardTitle>
            <p>{r.snippet}</p>
            <Button
              // href={r.link}
              target="_blank"
              onClick={() => {
                this.app.handleLinkClick(r.link, r)
              }}
            >Learn More &rarr;</Button>
          </CardBody>
        </Card>
      });

      let row = [];
      for (let i = 0; i < cards.length; i++) {
        row.push(<Col>{cards[i]}</Col>);
        if (row.length == this.props.rowSize) {
          rows.push(<Row>{row}</Row>, <br />);
          row = [];
        }
      }
      if (row.length > 0) {
        rows.push(<Row>{row}</Row>);
      }
    } else { rows = [] }
    // console.log(["rows:", rows]);

    return <Container>{
      [rows.length ? (<button style={{ "width": "100%", "marginBottom": "25px" }} class="btn btn-info">Feed</button>) : null,
        rows]
      // rows
    }</Container>
  }
}
export default Feed;
