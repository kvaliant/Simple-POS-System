import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class ViewProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: 0,
      name: "",
      quantityLabel: "",
      retailPrice: 0,
    };
  }
  getProduct = async (event) => {
    this.setState({
      name: "",
      totalStock: 0,
      quantityLabel: "",
      retailPrice: 0,
    });

    let url = "http://localhost:5000/product/" + event;
    let headers = {};
    axios
      .get(url, {
        headers: headers,
      })
      .then((res) => {
        this.setState({
          name: res.data.name,
          totalStock: 0,
          quantityLabel: res.data.quantity_label,
          retailPrice: res.data.retail_price,
        });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  componentDidUpdate() {
    if (this.props.sku !== this.state.sku) {
      this.setState({ sku: this.props.sku });
      this.getProduct(this.props.sku);
    }
  }

  render() {
    return (
      <section>
        <div className="row">
          <div className="col-5">
            <p>
              <strong>Name</strong>
            </p>
          </div>
          <div className="col-7">
            <p>{this.state.name}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            <p>
              <strong>Stock</strong>
            </p>
          </div>
          <div className="col-7">
            <p>{this.state.totalStock + " " + this.state.quantityLabel}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-5">
            <p>
              <strong>Retail Price</strong>
            </p>
          </div>
          <div className="col-7">
            <p>{this.state.retailPrice}</p>
          </div>
        </div>
      </section>
    );
  }
}

export default ViewProduct;
