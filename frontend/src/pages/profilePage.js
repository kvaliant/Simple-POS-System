import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Row, Col, Button } from "react-bootstrap";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
      password: "",
      role: "",
    };
  }

  // getProfile = async (event) => {
  //   let url = "http://localhost:5000/profile";
  //   let headers = {};
  //   axios
  //     .get(url, {
  //       headers: headers,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       this.setState({
  //         username: res.data.username,
  //         name: res.data.name,
  //         role: res.data.role,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log({ error });
  //     });
  // };

  updateProfile = async (event) => {
    event.preventDefault();
    console.log(event);
    let url = "http://localhost:5000/profile";
    let headers = {};
    let body = {
      name: this.state.name,
      role: this.state.role,
    };
    if (this.state.password !== "") {
      body.password = this.state.password;
    }
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
          <h1>Profile</h1>
          <Form.Group as={Row} className="mb-3" controlId="sku">
            <Form.Label column sm="5">
              <strong>Username</strong>
            </Form.Label>
            <Col sm="7">
              <Form.Control disabled type="text" value={this.state.username} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="sku">
            <Form.Label column sm="5">
              <strong>Role</strong>
            </Form.Label>
            <Col sm="7">
              <Form.Control disabled type="text" value={this.state.role === 0 ? "Admin" : "Staff"} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="sku">
            <Form.Label column sm="5">
              <strong>Name</strong>
            </Form.Label>
            <Col sm="7">
              <Form.Control type="text" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="sku">
            <Form.Label column sm="5">
              <strong>Password</strong>
            </Form.Label>
            <Col sm="7">
              <Form.Control type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="sku">
            <Form.Label column sm="5">
              <strong>Confirm Password</strong>
            </Form.Label>
            <Col sm="7">
              <Form.Control type="password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
            </Col>
          </Form.Group>
          <div className="text-center">
            <Button variant="primary">Submit</Button>
          </div>
        </section>
      </div>
    );
  }
}

export default ProfilePage;
