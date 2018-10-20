import React, { Component } from "react";
import Clients from "../clients/Clients.js";
import Sidebar from "./Sidebar";

export default class DashBoard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-10">
          <Clients />
        </div>
        <div className="col-md-2">
          <Sidebar />
        </div>
      </div>
    );
  }
}
