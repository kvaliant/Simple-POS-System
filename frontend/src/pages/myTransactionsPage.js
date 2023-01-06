import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Dropdown, Pagination } from "react-bootstrap";

class MyTransactionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      price: "",
      transactions: [],
    };
  }
  componentDidMount() {
    this.getTransactions();
  }

  getTransactions = async (event) => {
    event.preventDefault();
    console.log(event);
    let url = "http://localhost:5000/transactions";
    let headers = {};
    axios
      .get(url, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        this.setState({ transactions: res.data.transactions });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  render() {
    return (
      <div>
        <section>
          <h1>My Transactions</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Menu</th>
              </tr>
            </thead>
            <tbody>
              {this.state.transactions.map(function (props, index) {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{props.date}</td>
                    <td>{props.name}</td>
                    <td>{props.price}</td>
                    <td>{props.quantity}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Menu
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item href="#/action-1">Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </section>
        <section>
          <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item>{1}</Pagination.Item>
            <Pagination.Ellipsis />

            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Item>{11}</Pagination.Item>
            <Pagination.Item active>{12}</Pagination.Item>
            <Pagination.Item>{13}</Pagination.Item>
            <Pagination.Item disabled>{14}</Pagination.Item>

            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </section>
      </div>
    );
  }
}

export default MyTransactionsPage;
