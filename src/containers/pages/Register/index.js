import React, { Component } from "react";
import "./Register.scss";
import { connect } from "react-redux";
import Button from "../../../components/atoms/Button";
import { registerUserAPI } from "../../../config/redux/action";

class Register extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeText = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleRegisterSubmit = async () => {
    const { email, password } = this.state;

    const result = await this.props
      .registerAPI({ email, password })
      .catch((error) => error);
    if (result) {
      this.setState({
        email: "",
        password: "",
      });
    }
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">Register Page</p>
          <input
            className="input"
            id="email"
            placeholder="Email"
            type="text"
            onChange={this.handleChangeText}
            value={this.state.email}
          />
          <input
            className="input"
            id="password"
            type="password"
            placeholder="Password"
            onChange={this.handleChangeText}
            value={this.state.password}
          />
          <Button
            title="Register"
            onClick={this.handleRegisterSubmit}
            loading={this.props.isLoading}
          />
        </div>
      </div>
    );
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
  registerAPI: (data) => dispatch(registerUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Register);
