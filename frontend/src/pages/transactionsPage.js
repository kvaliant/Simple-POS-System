import React from "react";
import axios from "axios";
import ViewProduct from "../components/viewProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Collapse, Form, Row, Col, Table, Dropdown } from "react-bootstrap";
import withParams from "../components/withParams";
import Pagination from "../components/pagination";

class TransactionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: 0,
      viewProductOpen: false,
      quantity: 0,
      price: "",
      stock: "",
      stocks: [],
      transactions: [],
      paramsStock: "",
      currentPage: 1,
      last: 1,
    };
  }

  componentDidMount() {
    let sku = this.props.searchParams.get("sku");
    let stockId = this.props.searchParams.get("stock");
    if (sku !== null) {
      let page = this.props.searchParams.get("page");
      if (!page) {
        page = 1;
        if (stockId !== null) {
          window.history.pushState(null, "", "http://localhost:3000/transactions?sku=" + sku + "&stock=" + stockId + "&page=" + page);
        }
      }

      this.setState({ sku: sku, paramsStock: stockId, currentPage: page });
      this.getStocks(sku);
    }
  }

  onPageChange = (event) => {
    window.history.pushState(null, "", "http://localhost:3000/transactions?sku=" + this.state.sku + "&stock=" + this.state.stock._id + "&page=" + event);
    this.setState({ currentPage: event });
    this.getTransactions({ stock: this.state.stock._id, page: event });
  };

  getStocks = async (event) => {
    this.setState({ stocks: [], stock: "" });
    let url = "http://localhost:5000/stocks/" + event + "/all";
    let headers = {};
    axios
      .get(url, {
        headers: headers,
      })
      .then((res) => {
        this.setState({ stocks: res.data.stocks });
        if (this.state.paramsStock) {
          let stock = res.data.stocks.find((i) => i._id === this.state.paramsStock);
          if (stock != null) {
            this.setState({ stock: stock });
            this.getTransactions({ stock: this.state.paramsStock, page: this.state.currentPage });
          }
          //Only automatically choose the search params stock once
          this.setState({ paramsStock: "" });
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  getTransactions = async (event) => {
    this.setState({ transactions: [] });
    let url = "http://localhost:5000/transactions/" + event.stock + "/" + event.page;
    let headers = {};
    axios
      .get(url, {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          transactions: res.data.transactions,
        });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  deleteTransaction = async (event) => {
    let url = "http://localhost:5000/transaction/" + event;
    let headers = {};
    axios
      .delete(url, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  render() {
    const deleteTransaction = this.deleteTransaction;
    return (
      <div>
        <section>
          <h1>View Transactions</h1>
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
                  this.getStocks(e.target.value);
                }}
              />
            </Col>
          </Form.Group>
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
          <Form.Group as={Row} className="mb-3" controlId="sku">
            <Form.Label column sm="5">
              <strong>From Stocks</strong>
            </Form.Label>
            <Col sm="7">
              <Form.Select
                aria-label="Default select example"
                value={this.state.stock._id}
                onChange={(e) => {
                  this.setState({ stock: "", currentPage: 1 });
                  if (e.target.value !== "") {
                    let stock;
                    if (e.target.value === this.state.sku) {
                      stock = this.state.sku;
                    } else {
                      stock = this.state.stocks.find((i) => i._id === e.target.value);
                      this.setState({ stock: stock });
                    }
                    this.getTransactions({ stock: e.target.value, page: 1 });
                  }
                }}
              >
                <option value="">Choose stock</option>
                <option value={this.state.sku}>All</option>
                {this.state.stocks.map(function (props, index) {
                  return (
                    <option key={props._id} value={props._id}>
                      {props.date + " | " + props.initial_quantity + " | " + (props.initial_quantity - props.sold_quantity + " remaining ")}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
          </Form.Group>
          {this.state.stock ? (
            <div className="container">
              <div className="row">
                <div className="col-5">
                  <p>
                    <strong>Stock Date</strong>
                  </p>
                </div>
                <div className="col-7">
                  <p>{this.state.stock.date}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p>
                    <strong>Buy Price</strong>
                  </p>
                </div>
                <div className="col-7">
                  <p>{this.state.stock.buy_price}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p>
                    <strong>Initial Quantity</strong>
                  </p>
                </div>
                <div className="col-7">
                  <p>{this.state.stock.initial_quantity}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-5">
                  <p>
                    <strong>Remaining</strong>
                  </p>
                </div>
                <div className="col-7">
                  <p>{this.state.stock.initial_quantity - this.state.stock.sold_quantity}</p>
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </section>
        <section>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Staff</th>
                <th>Menu</th>
              </tr>
            </thead>
            <tbody>
              {this.state.transactions.map(function (props, index) {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{props.date}</td>
                    <td>{props.price}</td>
                    <td>{props.quantity}</td>
                    <td>{props.staff}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Menu
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={(e) => {
                              deleteTransaction(props._id);
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

export default withParams(TransactionsPage);
