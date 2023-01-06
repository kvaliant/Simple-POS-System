import React from "react";
import { useParams } from "react-router-dom";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} searchParams={new URL(document.location).searchParams} />;
}

export default withParams;
