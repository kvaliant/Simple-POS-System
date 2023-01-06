import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Pagination as Page } from "react-bootstrap";

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [1, 2, 3, 4, 5],
      value: 0,
      last: 0,
    };
  }

  componentDidUpdate() {
    if (this.state.last !== this.props.last || this.state.value !== this.props.value) {
      this.setState({
        value: this.props.value,
        last: this.props.last,
      });
      this.constructPages({ value: this.props.value, last: this.props.last });
    }
  }

  constructPages = (e) => {
    let pages = [];
    let itemToDisplay = 7;
    while (itemToDisplay > pages.length) {
      let i = e.value - Math.round(itemToDisplay / 2) + 1;
      while (pages.length === 0) {
        if (i >= 1) {
          pages.push(i);
        }
        i = i + 1;
      }
      if (pages[pages.length - 1] + 1 <= e.last) {
        pages.push(pages[pages.length - 1] + 1);
      } else {
        if (pages[0] - 1 >= 1) {
          pages = [pages[0] - 1].concat(pages);
        } else {
          break;
        }
      }
    }
    this.setState({ pages: pages });
  };

  changePage = (e) => {
    if (!isNaN(e)) {
      if (this.props.onChange) {
        this.props.onChange(e);
      }
    }
  };

  render() {
    const changePage = this.changePage;
    return (
      <section>
        <div className="d-flex justify-content-center">
          <Page
            onClick={(e) => {
              changePage(e.target.attributes[1].value);
            }}
          >
            <Page.Item value={this.state.pages[0]}>«</Page.Item>
            <Page.Item value={Math.max(this.state.value - 1, 1)}>‹</Page.Item>
            {this.state.pages.map((props, index) => {
              return props === this.state.value ? (
                <Page.Item key={index} value={props} active>
                  {props}
                </Page.Item>
              ) : (
                <Page.Item key={index} value={props}>
                  {props}
                </Page.Item>
              );
            })}
            <Page.Item value={true}>…</Page.Item>
            <Page.Item value={this.state.pages[this.state.pages.length - 1]}>{this.state.pages[this.state.pages.length - 1]}</Page.Item>
            <Page.Item value={parseInt(this.state.value) + 1}>›</Page.Item>
            <Page.Item value={this.state.pages[this.state.pages.length - 1]}>»</Page.Item>
          </Page>
        </div>
      </section>
    );
  }
}

export default Pagination;
