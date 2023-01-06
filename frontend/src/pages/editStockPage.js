import React from "react";
import axios from "axios";
import ViewProduct from "../components/viewProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Collapse, Form, Row, Col } from "react-bootstrap";
import withParams from "../components/withParams.js";

class EditStockPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: 0,
      viewProductOpen: false,
      date: "2000-01-01",
      initial_quantity: 0,
      remaining_quantity: 0,
      buy_price: 0,
    };
  }
  componentDidMount() {
    this.getStock();
  }

  getStock = async (event) => {
    let url = "http://localhost:5000/stock/" + this.props.params.id;
    let headers = {};
    axios
      .get(url, {
        headers: headers,
      })
      .then((res) => {
        this.setState({
          sku: res.data.sku,
          date: res.data.date.slice(0, 10),
          initial_quantity: res.data.initial_quantity,
          sold_quantity: res.data.sold_quantity,
          buy_price: res.data.buy_price,
        });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  editStock = async (event) => {
    event.preventDefault();

    let url = "http://localhost:5000/stock/" + this.props.params.id;
    let headers = {};
    let body = {
      date: this.state.date,
      initial_quantity: this.state.initial_quantity,
      buy_price: this.state.buy_price,
    };
    axios
      .patch(url, body, {
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
          <h1>Edit Stock</h1>
          <Form onSubmit={this.editStock}>
            <Form.Group as={Row} className="mb-3" controlId="SKU">
              <Form.Label column sm="5">
                <strong>SKU</strong>
              </Form.Label>
              <Col sm="7">
                <Form.Control plaintext readOnly value={this.state.sku} />
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
                className="mb-3"
              >
                {this.state.viewProductOpen ? "Hide Product Details" : "Show Product Details"}
              </Button>
            </div>
            <Form.Group as={Row} className="mb-3" controlId="quantity">
              <Form.Label column sm="5">
                <strong>Date</strong>
              </Form.Label>
              <Col sm="7">
                <Form.Control type="date" value={this.state.date} min="0" onChange={(e) => this.setState({ date: e.target.value })} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="initial_quantity">
              <Form.Label column sm="5">
                <strong>Initial Quantity</strong>
              </Form.Label>
              <Col sm="7">
                <Form.Control type="number" value={this.state.initial_quantity} min="0" onChange={(e) => this.setState({ initial_quantity: e.target.value })} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="quantity">
              <Form.Label column sm="5">
                <strong>Sold Quantity</strong>
              </Form.Label>
              <Col sm="7">
                <Form.Control plaintext readOnly value={this.state.sold_quantity} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="quantity">
              <Form.Label column sm="5">
                <strong>Remaining Quantity</strong>
              </Form.Label>
              <Col sm="7">
                <Form.Control plaintext readOnly value={this.state.initial_quantity - this.state.sold_quantity} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="price">
              <Form.Label column sm="5">
                <strong>Buy Price</strong>
              </Form.Label>
              <Col sm="7">
                <Form.Control type="number" value={this.state.buy_price} min="0" onChange={(e) => this.setState({ buy_price: e.target.value })} />
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

export default withParams(EditStockPage);
