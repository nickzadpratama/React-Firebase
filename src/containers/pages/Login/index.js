import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUserAPI } from "../../../config/redux/action";
import Button from "../../../components/atoms/Button";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChangeText = (e, type) => {
    this.setState({
      [type]: e.target.value,
    });
  };

  handleLoginSubmit = async () => {
    const { email, password } = this.state;
    const { history } = this.props;

    const result = await this.props
      .loginAPI({ email, password })
      .catch((error) => error);
    if (result) {
      console.log("login success", result);
      localStorage.setItem("userData", JSON.stringify(result));
      this.setState({
        email: "",
        password: "",
      });
      history.push("/");
    } else {
      console.log("login failed");
    }
  };

  render() {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <p className="auth-title">Login Page</p>
          <input
            className="input"
            id="email"
            placeholder="Email"
            type="text"
            onChange={(e) => this.handleChangeText(e, "email")}
            value={this.state.email}
          />
          <input
            className="input"
            id="password"
            placeholder="Password"
            type="password"
            onChange={(e) => this.handleChangeText(e, "password")}
            value={this.state.password}
          />
          <Button
            title="Login"
            onClick={this.handleLoginSubmit}
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
  loginAPI: (data) => dispatch(loginUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Login);
