import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import Spiner from "./spinner.gif";
import classnames from "classnames";

class ClientsDetails extends Component {
  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ""
  };
  //Update balance
  balanceSubmit = e => {
    e.preventDefault();

    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    };

    // Update in firestore
    firestore.update({ collection: "clients", doc: client.id }, clientUpdate);
  };
  //Delete Client
  handelDelete = () => {
    const { client, firestore } = this.props;
    firestore.delete({ collection: "clients", doc: client.id }).then(() => {
      this.props.history.push("/");
    });
  };

  render() {
    const { client } = this.props;
    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn btn-link">
                {" "}
                <i className="fas fa-arrow-circle-left" /> Back to Dashboard{" "}
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link to={`/client/edit/${client.id}`} className="btn btn-dark">
                  {" "}
                  <i className="fas fa-edit" /> Edit
                </Link>
                <button onClick={this.handelDelete} className="btn btn-danger ">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <hr />
          <div className="card">
            <div className="card-header">
              <h3>
                {client.firstName} {client.lastName}
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8 col-sm-6">
                  <h4>
                    Client ID:{" "}
                    <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
                <div className="col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    Balance:{" "}
                    <span
                      className={classnames({
                        "text-danger": client.balance > 0,
                        "text-success": client.balance === 0
                      })}
                    >
                      ${parseFloat(client.balance).toFixed(2)}
                    </span>{" "}
                    <small>
                      <a
                        href="#!"
                        onClick={() =>
                          this.setState({
                            showBalanceUpdate: !this.state.showBalanceUpdate
                          })
                        }
                      >
                        {" "}
                        <i className="fas fa-edit" />{" "}
                      </a>
                    </small>
                  </h3>
                  {this.state.showBalanceUpdate === true ? (
                    <form action="" onSubmit={this.balanceSubmit}>
                      <input
                        className="form-control from-control-sm"
                        type="text"
                        placeholder="Update Balance"
                        value={this.state.balanceUpdateAmount}
                        onChange={e =>
                          this.setState({ balanceUpdateAmount: e.target.value })
                        }
                      />
                    </form>
                  ) : null}
                </div>
              </div>
              <hr />
              <ul className="list-group">
                <li className="list-group-item">
                  Contact Email: {client.email}
                </li>
                <li className="list-group-item">
                  Contact Phone: {client.phone}
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <img src={Spiner} alt="" />;
        </div>
      );
    }
  }
}

export default compose(
  firestoreConnect(props => [
    {
      collection: "clients",
      storeAs: "client",
      doc: props.match.params.id
    }
  ]),
  connect(state => ({
    client: state.firestore.ordered.client && state.firestore.ordered.client[0]
  }))
)(ClientsDetails);
