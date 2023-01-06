import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: 0,
      name: 0,
      quantityLabel: "",
      retailPrice: 0,
    };
  }

  render() {
    return (
      <div className="text-center">
        <section>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
          <Link to="/products">
            <Button>Products</Button>
          </Link>
          <Link to="/stocks">
            <Button>Stocks</Button>
          </Link>
          <Link to="/transactions">
            <Button>Transactions</Button>
          </Link>
          <Link to="/admin">
            <Button>Admin</Button>
          </Link>
          <Link to="/profile">
            <Button>Profile</Button>
          </Link>
        </section>
      </div>
    );
  }
}

export default HomePage;
