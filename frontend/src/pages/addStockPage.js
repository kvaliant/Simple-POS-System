import React from "react";
import axios from "axios";
import ViewProduct from "../components/viewProduct";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Collapse, Form, Row, Col } from "react-bootstrap";

class AddStockPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: 0,
      viewProductOpen: false,
      quantity: 0,
      price: 0,
    };
  }

  addStock = async (event) => {
    event.preventDefault();
    let url = "http://localhost:5000/stock";
    let headers = {
      sku: this.state.sku,
    };
    let body = {
      initial_quantity: this.state.quantity,
      buy_price: this.state.price,
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
          <h1>Add Stock</h1>
          <Form onSubmit={this.addStock}>
            <Form.Group as={Row} className="mb-3" controlId="sku">
              <Form.Label column sm="5">
                <strong>SKU</strong>
              </Form.Label>
              <Col sm="7">
                <Form.Control type="number" min="0" onChange={(e) => this.setState({ sku: e.target.value })} />
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
            </div>
            <Form.Group as={Row} className="mb-3" controlId="SKU">
              <Form.Label column sm="5">
                <strong>SKU</strong>
              </Form.Label>
              <Col sm="7">
                <Form.Control value={this.state.sku} plaintext readOnly defaultValue="00000000" />
              </Col>
            </Form.Group>
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
                <strong>Buy Price</strong>
              </Form.Label>
              <Col sm="7">
                <Form.Control type="number" min="0" onChange={(e) => this.setState({ price: e.target.value })} />
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

export default AddStockPage;
