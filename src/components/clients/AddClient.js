import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
// import { connect } from "react-redux";
// import { compose } from "redux";

class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  };

  onSubmit = e => {
    e.preventDefault();

    const newClient = this.state;
    const { firestore } = this.props;
    if (newClient.balance === "") {
      newClient.balance = 0;
    }
    firestore
      .add(
        {
          collection: "clients"
        },
        newClient
      )
      .then(() => {
        this.props.history.push("/");
      });
  };

  handleChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  render() {
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
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="">First Name</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.firstName}
                  className="form-control"
                  required
                  minLength="2"
                  type="text"
                  name="firstName"
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Last Name</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.lastName}
                  className="form-control"
                  required
                  minLength="2"
                  type="text"
                  name="lastName"
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Email</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.email}
                  className="form-control"
                  type="email"
                  name="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Phone</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.phone}
                  className="form-control"
                  required
                  type="text"
                  name="phone"
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Balance</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.balance}
                  className="form-control"
                  type="text"
                  name="balance"
                />
              </div>
              <input
                type="submit"
                value="Add Client"
                className="btn btn-block btn-primary"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default firestoreConnect()(AddClient);
