import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container, Col } from "reactstrap";
import DefaultFooter from "./DefaultFooter";

const DefaultHeader = React.lazy(() => import("./DefaultHeader"));
class Defaultlayout extends Component {
  state = {};
  render() {
    return (
      <div>
        <DefaultHeader />
        <DefaultFooter/>
      </div>
    );
  }
}

export default Defaultlayout;
