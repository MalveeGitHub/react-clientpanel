// import React, { Component } from "react";
// import { firebaseConnect } from "react-redux-firebase";
// // import { connect } from "react-redux";
// // import { compose } from "redux";

// class Login extends Component {
//   state = {
//     email: "",
//     password: ""
//   };
//   handleChange = e => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   onSubmit = e => {
//     e.preventDefault();
//     const { firebase } = this.props;
//     const { email, password } = this.state;
//     firebase
//       .login({
//         email,
//         password
//       })
//       .catch(err => alert("Invalid Login Info"));
//   };

//   render() {
//     return (
//       <div className="row">
//         <div className="col-md-6 mx-auto">
//           <div className="card">
//             <div className="card-body">
//               <h1 className="text-center pb-4 pt-3">
//                 <span>
//                   <i className="fas fa-lock" />
//                 </span>{" "}
//                 {"  "}
//                 Login
//               </h1>
//               <form onSubmit={this.onSubmit}>
//                 <div className="form-group">
//                   <label>Email</label>
//                   <input
//                     type="text"
//                     onChange={this.handleChange}
//                     name="email"
//                     required
//                     value={this.state.email}
//                     className="form-control"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label>Email</label>
//                   <input
//                     type="password"
//                     onChange={this.handleChange}
//                     name="password"
//                     required
//                     value={this.state.password}
//                     className="form-control"
//                   />
//                 </div>
//                 <input
//                   type="submit"
//                   value="Login"
//                   className="btn btn-primary btn-block"
//                 />
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default firebaseConnect()(Login);
