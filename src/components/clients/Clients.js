import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import Spiner from "./spinner.gif";

class Clients extends Component {
  state = {
    totalOwed: null
  };
  static getDerivedStateFromProps(props, state) {
    const { clients } = props;
    if (clients) {
      const total = clients.reduce((total, client) => {
        return total + parseFloat(client.balance.toString());
      }, 0);

      return {
        totalOwed: total
      };
    }
    return null;
  }
  render() {
    const clients = this.props.clients;
    const { totalOwed } = this.state;
    if (clients) {
      return (
        <div className="row">
          <div className="col-md-6">
            <h1>
              {" "}
              <i className="fas fa-users" /> Clients
            </h1>
          </div>
          <div className="col-md-6">
            <h5 className="text-right text-secondary">
              Total Owed{" "}
              <span className="text-primary">
                ${parseFloat(totalOwed).toFixed(2)}
              </span>
            </h5>
          </div>

          <table className="table table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <th>
                    {client.firstName} {client.lastName}
                  </th>
                  <th>{client.email}</th>
                  <th>{client.phone}</th>
                  <th>${parseFloat(client.balance.toString()).toFixed(2)}</th>
                  <th>
                    <Link
                      className="btn btn-sm btn-secondary"
                      to={`/client/${client.id}`}
                    >
                      {" "}
                      <i className="fas fa-arrow-circle-right" /> Details
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <img
          style={{
            margin: "auto",
            display: "block"
          }}
          src={Spiner}
          alt=""
        />
      );
    }
  }
}

export default compose(
  firestoreConnect([{ collection: "clients" }]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
