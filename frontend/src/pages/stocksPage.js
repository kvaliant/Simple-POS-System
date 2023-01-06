import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ViewProduct from "../components/viewProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Collapse, Form, Row, Col, Table, Dropdown } from "react-bootstrap";
import Pagination from "../components/pagination";

import withParams from "../components/withParams";

class StocksPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: "",
      viewProductOpen: false,
      stocks: [],
      currentPage: 1,
      last: 1,
    };
  }

  componentDidMount() {
    let sku = this.props.searchParams.get("sku");
    if (sku !== null) {
      let page = this.props.searchParams.get("page");
      if (!page) {
        page = 1;
        window.history.pushState(null, "", "http://localhost:3000/stocks?sku=" + sku + "&page=" + page);
      }
      this.setState({ sku: sku, currentPage: page });
      this.getStocks({ sku: sku, page: page });
    }
  }

  onPageChange = (event) => {
    window.history.pushState(null, "", "http://localhost:3000/stocks?sku=" + this.state.sku + "&page=" + event);
    this.setState({ currentPage: event });
    this.getStocks({ sku: this.state.sku, page: event });
  };

  getStocks = async (event) => {
    this.setState({ stocks: [] });
    let url = "http://localhost:5000/stocks/" + event.sku + "/" + event.page;
    let headers = {};
    axios
      .get(url, {
        headers: headers,
      })
      .then((res) => {
        this.setState({ stocks: res.data.stocks, last: res.data.last });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  deleteStock = async (event) => {
    let url = "http://localhost:5000/stock/" + event;
    let headers = {};
    axios
      .delete(url, {
        headers: headers,
      })
      .then((res) => {})
      .catch((error) => {
        console.log({ error });
      });
  };

  render() {
    const state = this.state;
    const deleteStock = this.deleteStock;
    return (
      <div>
        <section>
          <h1>List Stocks</h1>
        </section>
        <section>
          <Form.Group as={Row} className="mb-3" controlId="sku">
            <Form.Label column sm="5">
              <strong>SKU</strong>
            </Form.Label>
            <Col sm="7">
              <Form.Control
                type="number"
                min="0"
                value={this.state.sku}
                onChange={(e) => {
                  this.setState({ sku: e.target.value });
                  this.getStocks({ sku: e.target.value, page: 1 });
                }}
              />
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Link to={"./add?sku=" + this.state.sku}>
              <Button>Add New Stock</Button>
            </Link>
          </div>
          <div>
            <Collapse in={this.state.viewProductOpen}>
              <div>
                <ViewProduct sku={this.state.sku} />
              </div>
            </Collapse>
          </div>
          <div className="text-center">
            <Button
              onClick={() =>
                this.setState({
                  viewProductOpen: !this.state.viewProductOpen,
                })
              }
              aria-controls="example-collapse-text"
              aria-expanded={this.state.viewProductOpen}
            >
              {this.state.viewProductOpen ? "Hide Product Details" : "Show Product Details"}
            </Button>
            <div className="row"></div>
          </div>
        </section>
        <section>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Received Date</th>
                <th>Buy Price</th>
                <th>Initial Quantity</th>
                <th>Remaining Quantity</th>
                <th>Menu</th>
              </tr>
            </thead>
            <tbody>
              {this.state.stocks.map(function (props, index) {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{props.date}</td>
                    <td>{props.buy_price}</td>
                    <td>{props.initial_quantity}</td>
                    <td>{props.initial_quantity - props.sold_quantity}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Menu
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href={"http://localhost:3000/transactions?sku=" + state.sku + "&stock=" + props._id}>View Transaction</Dropdown.Item>
                          <Dropdown.Item href={"http://localhost:3000/stock/" + props._id}>Edit</Dropdown.Item>
                          <Dropdown.Item
                            onClick={(e) => {
                              deleteStock(props._id);
                            }}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </section>
        <Pagination value={this.state.currentPage} last={this.state.last} onChange={this.onPageChange} />
      </div>
    );
  }
}

export default withParams(StocksPage);
