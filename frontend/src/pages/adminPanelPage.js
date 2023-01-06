import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Table, Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class AdminPanelPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      users: [],
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async (event) => {
    console.log(event);
    let url = "http://localhost:5000/users";
    let headers = {};
    axios
      .get(url, {
        headers: headers,
      })
      .then((res) => {
        console.log(res);
        this.setState({ users: res.data });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  switchRoleUser = async (event) => {
    let url = "http://localhost:5000/user/" + event;
    let headers = {};
    let body = this.state.users.find((i) => i._id === event);
    body.role = body.role === 1 ? 0 : 1;
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

  deleteUser = async (event) => {
    let url = "http://localhost:5000/user/" + event;
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
    const switchRoleUser = this.switchRoleUser;
    const deleteUser = this.deleteUser;
    return (
      <div>
        <section>
          <h1>Admin Panel</h1>
        </section>
        <section>
          <Link to="./add">
            <Button>Add New User</Button>
          </Link>
        </section>
        <section>
          <Form.Group as={Row} className="mb-3" controlId="sku">
            <Form.Label column sm="5">
              <strong>Search (Username)</strong>
            </Form.Label>
            <Col sm="7">
              <Form.Control type="text" onChange={(e) => this.setState({ search: e.target.value })} />
            </Col>
          </Form.Group>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Name</th>
                <th>Role</th>
                <th>Menu</th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map(function (props, index) {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{props.username}</td>
                    <td>{props.name}</td>
                    <td>{props.role === 0 ? "Admin" : "Staff"}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Menu
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href={"/user/" + props._id}>Edit</Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              switchRoleUser(props._id);
                            }}
                          >
                            {props.role === 0 ? "Make Staff" : "Make Admin"}
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => {
                              deleteUser(props._id);
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
      </div>
    );
  }
}

export default AdminPanelPage;
