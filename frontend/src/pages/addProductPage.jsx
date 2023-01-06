import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Row, Col } from "react-bootstrap";

class AddProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: 0,
      name: 0,
      quantityLabel: "",
      retailPrice: 0,
    };
  }

  addProduct = async (event) => {
    event.preventDefault();

    let url = "http://localhost:5000/product";
    let body = {
      sku: this.state.sku,
      name: this.state.name,
      quantity_label: this.state.quantityLabel,
      retail_price: this.state.retailPrice,
    };
    let headers = {};
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
          <Form onSubmit={this.addProduct}>
            <Form.Group as={Row} className="mb-3" controlId="price">
              <Form.Label column sm="5">
                <strong>SKU</strong>
              </Form.Label>
              <Col sm="7">
                <Form.Control type="number" min="0" onChange={(e) => this.setState({ sku: e.target.value })} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="price">
              <Form.Label column sm="5">
                <strong>Name</strong>
              </Form.Label>
              <Col sm="7">
                <Form.Control type="text" min="0" onChange={(e) => this.setState({ name: e.target.value })} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="quantity">
              <Form.Label column sm="5">
                <strong>Quantity Label</strong>
              </Form.Label>
              <Col sm="7">
                <Form.Control type="text" min="0" onChange={(e) => this.setState({ quantityLabel: e.target.value })} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="price">
              <Form.Label column sm="5">
                <strong>Retail Price</strong>
              </Form.Label>
              <Col sm="7">
                <Form.Control type="number" min="0" onChange={(e) => this.setState({ retailPrice: e.target.value })} />
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

export default AddProductPage;
