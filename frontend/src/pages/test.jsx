import React from "react";
import axios from "axios";

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      res: "",
    };
  }

  getTest = (e) => {
    let url = "http://localhost:5000/products";
    axios
      .get(url, {
        headers: {
          //headers
        },
      })
      .then((res) => {
        console.log({ res });
        this.setState({ res: res.data });
      })
      .catch((error) => {
        console.log({ error });
      });
  };
  postTest = (e) => {
    let url = "http://localhost:5000/stock";
    axios
      .post(
        url,
        {
          price: "1",
          initial_quanitity: "1",
        },
        {
          headers: {
            sku: "1",
          },
        }
      )
      .then((res) => {
        console.log(res);
        this.setState({ res: res });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  render() {
    return (
      <div>
        <button onClick={this.getTest}>Get</button>
        <button onClick={this.postTest}>Post</button>
      </div>
    );
  }
}

export default TestPage;
