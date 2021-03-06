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

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // query: '',
      // searchResults: [],
    };
    this.props.appPtr.updateWeights();
  }
  app = this.props.appPtr;

  // handleQueryChange = event => {
  //   this.setState({ query: event.target.value });
  // }

  // orderedSearchResultsList = [];

  makeSearch = e => {
    // handleSearch = async event => {
    // e.preventDefault();
    this.app.handleSearch(e);
    // if (data) {
    //   this.orderedSearchResultsList = [];
    //   this.setState({ searchResults: data });
    //   data.forEach(x => { this.app.handleLinkShow(x.link) });
    // }
  }

  render() {
    // if (Array.isArray(this.app.state.searchResults) && this.app.state.searchResults.length && !this.orderedSearchResultsList.length) {
    //   let orderedSearchResults = {};
    //   this.app.state.searchResults.forEach(x => {
    //     orderedSearchResults[-this.app.getRating(this.app.state.currentUser, x.link)] = x;
    //   })
    //   let keys = Object.keys(orderedSearchResults), i, len = keys.length;
    //   keys.sort(function (a, b) { return a - b });
    //   for (i = 0; i < len; i++) {
    //     console.log(keys[i] + orderedSearchResults[keys[i]].link);
    //     this.orderedSearchResultsList.push(orderedSearchResults[keys[i]]);
    //   }
    // }
    // const results = this.orderedSearchResultsList.map(r => {
    //   // const results = this.app.state.searchResults.map(r => {
    //   let thumbnail;
    //   if (r.pagemap && r.pagemap.cse_thumbnail) {
    //     thumbnail = <img
    //       src={r.pagemap.cse_thumbnail[0].src}
    //       width={r.pagemap.cse_thumbnail[0].width}
    //       height={r.pagemap.cse_thumbnail[0].height}
    //       alt='' />
    //   }
    //   return <li key={r.link}>
    //     <a
    //       // href={r.link} target="_blank" 
    //       onClick={() => {
    //         this.app.handleLinkClick(r.link)
    //       }}
    //       style={{ fontWeight: (r.link in this.app.state.resourceData) ? "bold" : "normal" }}
    //     >{r.title}</a>
    //     <p>{r.snippet}</p>
    //     {thumbnail}
    //     <br /><br />
    //   </li>
    // });
    let rows = [];
    if (this.props.orderedSearchResultsList.length) {
      const cards = this.props.orderedSearchResultsList.map(r => {
        let thumbnail;
        if (r.pagemap && r.pagemap.cse_thumbnail) {
          thumbnail = <CardImg
            top
            src={r.pagemap.cse_thumbnail[0].src}
            width={r.pagemap.cse_thumbnail[0].width}
            height={r.pagemap.cse_thumbnail[0].height}
            alt='' />
        }
        return <Card key={r.link}>
          <CardHeader style={{
            "fontWeight": (r.link in this.app.state.resourceData) ? "500" : "normal"
          }}>{r.displayLink}</CardHeader>
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
            <Button style={{ "marginLeft": "10px" }}>Rate &rarr;</Button>
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
      // if (row.length > 0) {
      //   rows.push(<Row>{row}</Row>);
      // }
      // console.log(rows);
    } else { rows = [] }

    return (
      <div className="Search_all" style={{ "marginBottom": "50px" }} >
        {
          (window.location.pathname == "/search") ? (
            <div className="Search" >
              <h1>Search</h1>
              <form onSubmit={this.makeSearch}>
                <label>
                  Query:
            <input
                    type='text'
                    maxLength='50'
                    value={this.state.query}
                  // onChange={this.handleQueryChange} 
                  />
                </label>
                <input type='submit' value='Search' />
              </form>
            </div>
          ) : null
        }
        <Container>{rows}</Container>
      </div>
    );
  }
}
export default Search;
