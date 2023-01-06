import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Table, Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "../components/pagination";
import withParams from "../components/withParams.js";

class ProductsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      products: [],
      currentPage: 1,
      last: 1,
    };
  }
  componentDidMount() {
    let page = this.props.params.page;
    if (!page) {
      page = 1;
      window.history.pushState(null, "", "http://localhost:3000/products/1");
    }
    this.setState({ currentPage: page });
    this.getProducts(page);
  }

  onPageChange = (event) => {
    window.history.pushState(null, "", "http://localhost:3000/products/" + event);
    this.setState({ currentPage: event });
    this.getProducts(event);
  };

  getProducts = async (event) => {
    this.setState({ last: 0, products: [] });
    let url = "http://localhost:5000/products/" + event;
    let headers = {};
    if (this.state.search !== "") {
      headers.search = this.state.search;
    }
    axios
      .get(url, {
        headers: headers,
      })
      .then((res) => {
        this.setState({ last: res.data.last, products: res.data.products });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  deleteProduct = async (event) => {
    let url = "http://localhost:5000/product/" + event;
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
    const deleteProduct = this.deleteProduct;
    return (
      <div>
        <section>
          <h1>List Products</h1>
        </section>
        <section>
          <Link to="./add">
            <Button>Add New Product</Button>
          </Link>
        </section>
        <section>
          <Form.Group as={Row} className="mb-3" controlId="sku">
            <Form.Label column sm="5">
              <strong>Search (SKU / Name)</strong>
            </Form.Label>
            <Col sm="7">
              <Form.Control type="text" onChange={(e) => this.setState({ search: e.target.value })} />
            </Col>
          </Form.Group>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Retail Price</th>
                <th>Menu</th>
              </tr>
            </thead>
            <tbody>
              {this.state.products.map(function (props, index) {
                return (
                  <tr key={index}>
                    <td>{props.sku}</td>
                    <td>{props.name}</td>
                    <td>{props.quantity_label}</td>
                    <td>{props.retail_price}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Menu
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href={"http://localhost:3000/product/" + props._id}>Edit</Dropdown.Item>
                          <Dropdown.Item href={"http://localhost:3000/stocks?sku=" + props.sku}>View Stocks</Dropdown.Item>
                          <Dropdown.Item
                            onClick={(e) => {
                              deleteProduct(props._id);
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

export default withParams(ProductsPage);
