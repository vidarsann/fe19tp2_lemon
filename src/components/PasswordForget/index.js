import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const PasswordForgetPage = () => (
  <div>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: "",
  error: null
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;
    const isInvalid = email === "";

    return (
      <div className="main">
        <h2 className="bevTitle">B.E.V</h2>
        <h1 className="sign">Password Forget</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="inputText"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="Type your email address"
          />
          <button className="resetPassBtn" disabled={isInvalid} type="submit">
            Reset my password
          </button>

          {error && <p className="errorMsg">{error.message}</p>}
        </form>
      </div>
    );
  }
}

const PasswordForgetLink = () => (
  <p className="forgotPass">
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
