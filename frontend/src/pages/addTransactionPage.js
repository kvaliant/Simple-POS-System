import React from "react";
import axios from "axios";
import ViewProduct from "../components/viewProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Collapse, Form, Row, Col } from "react-bootstrap";

class AddTransactionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: 0,
      viewProductOpen: "",
      quantity: 0,
      price: "",
      stocks: [],
      stock: "",
      staff: "someone",
    };
  }
  getStocks = async (event) => {
    this.setState({ stocks: [] });
    let url = "http://localhost:5000/stocks/" + event + "/all";
    let headers = {};
    axios
      .get(url, {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ stocks: res.data.stocks });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  addTransaction = async (event) => {
    event.preventDefault();
    let url = "http://localhost:5000/transaction";
    let headers = { stock_id: this.state.stock._id };
    let body = {
      quantity: this.state.quantity,
      price: this.state.price,
    };
    axios
      .post(url, body, {
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
    return (
      <div>
        <section>
          <h1>Add Transactions</h1>
          <Form.Group as={Row} className="mb-3" controlId="sku">
            <Form.Label column sm="5">
              <strong>SKU</strong>
            </Form.Label>
            <Col sm="7">
              <Form.Control
                type="number"
                min="0"
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
                <ViewProduct />
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
          <Form onSubmit={this.addTransaction}>
            <Form.Group as={Row} className="mb-3" controlId="sku">
              <Form.Label column sm="5">
                <strong>From Stocks</strong>
              </Form.Label>
              <Col sm="7">
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    if (e.target.value === null) {
                      this.setState({ stock: "" });
                    } else {
                      let stock = this.state.stocks.find((i) => i._id === e.target.value);
                      this.setState({ stock: stock });
                    }
                  }}
                >
                  <option value={null}>All</option>
                  {this.state.stocks.map(function (props, index) {
                    return (
                      <option key={props._id} value={props._id}>
                        {props.date + "|" + props.initial_quantity + "|" + (props.initial_quantity - props.sold_quantity)}
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
            <Form.Group as={Row} className="mb-3" controlId="quantity">
              <Form.Label column sm="5">
                <strong>Quanitity</strong>
              </Form.Label>
              <Col sm="7">
                <Form.Control type="number" min="0" onChange={(e) => this.setState({ quantity: e.target.value })} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="price">
              <Form.Label column sm="5">
                <strong>Price</strong>
              </Form.Label>
              <Col sm="7">
                <Form.Control type="number" min="0" onChange={(e) => this.setState({ price: e.target.value })} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="SKU">
              <Form.Label column sm="5">
                <strong>Staff</strong>
              </Form.Label>
              <Col sm="7">
                <Form.Control value={this.state.staff} plaintext readOnly defaultValue="00000000" />
              </Col>
            </Form.Group>
            <div className="text-center">
              <Button className="text-center" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </section>
      </div>
    );
  }
}

export default AddTransactionsPage;
