import React, { Component } from "react";
import UserService from "../services/user.service";

export default class UserLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
  }

  render() {
    return (
      <div className="col-md-3">
        <h3>Вход</h3>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            name="email"
            value={this.state.email}
            onChange={this.onChangeEmail}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            name="password"
            value={this.state.password}
            onChange={this.onChangePassword}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => this.login()}
        >
          Войти
        </button>
      </div>
    );
  }

  onChangeEmail(e) {
    const oldUser = this.state;
    oldUser.email = e.target.value;
    this.setState(oldUser);
  }

  onChangePassword(e) {
    const oldUser = this.state;
    oldUser.password = e.target.value;
    this.setState(oldUser);
  }

  login() {
    const user = this.state;
    console.log(user);
    UserService.login(user)
      .then((res) => {
        console.log(res.data.data);
        this.eraseCookie("token");
        this.setCookie("token", res.data.data);
        UserService.getCurrentUser()
          .then((res2) => {
            console.log(res2.data);
            localStorage.setItem("currentUser", res2.data.data);
          })
          .then((err2) => {});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  eraseCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
  }
}
