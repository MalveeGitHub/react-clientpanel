import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

class EditClient extends Component {
  constructor(props) {
    super(props);
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();
    const { client, firestore } = this.props;

    //Update
    const updClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      phone: this.phoneInput.current.value,
      email: this.emailInput.current.value,
      balance:
        this.balanceInput.current.value === ""
          ? 0
          : this.balanceInput.current.value
    };

    firestore
      .update({ collection: "clients", doc: client.id }, updClient)
      .then(() => {
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
                <i className="fas fa-arrow-circle-left" /> Back to Dashboard
              </Link>
            </div>

            <div className="col-md-6" />
          </div>
          <div className="card">
            <div className="card-header">Edit Client</div>
            <div className="card-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="">First Name</label>
                  <input
                    defaultValue={client.firstName}
                    className="form-control"
                    required
                    minLength="2"
                    type="text"
                    name="firstName"
                    ref={this.firstNameInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Last Name</label>
                  <input
                    defaultValue={client.lastName}
                    className="form-control"
                    required
                    minLength="2"
                    type="text"
                    name="lastName"
                    ref={this.lastNameInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Email</label>
                  <input
                    defaultValue={client.email}
                    className="form-control"
                    type="email"
                    name="email"
                    ref={this.emailInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Phone</label>
                  <input
                    defaultValue={client.phone}
                    className="form-control"
                    required
                    type="text"
                    name="phone"
                    ref={this.phoneInput}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Balance</label>
                  <input
                    defaultValue={client.balance}
                    className="form-control"
                    type="text"
                    name="balance"
                    ref={this.balanceInput}
                  />
                </div>
                <input
                  type="submit"
                  value="Update Client"
                  className="btn btn-block btn-primary"
                />
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
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
)(EditClient);
