import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Button } from "react-bootstrap";

class AddUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
      password: "",
      role: 1,
    };
  }
  addUser = async (event) => {
    event.preventDefault();
    let url = "http://localhost:5000/user";
    let headers = {};
    let body = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password,
      role: this.state.role,
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
          <form onSubmit={this.addUser}>
            <h1>Add New User</h1>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="5">
                <strong>Username</strong>
              </Form.Label>
              <Col sm="7">
                <Form.Control type="text" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="5">
                <strong>Name</strong>
              </Form.Label>
              <Col sm="7">
                <Form.Control type="text" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="5">
                <strong>Password</strong>
              </Form.Label>
              <Col sm="7">
                <Form.Control type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="5">
                <strong>Role</strong>
              </Form.Label>
              <Col sm="7">
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    this.setState({ role: e.target.value });
                  }}
                  value={this.state.role}
                >
                  <option value={0}>Admin</option>
                  <option value={1}>Staff</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </section>
      </div>
    );
  }
}

export default AddUserPage;
