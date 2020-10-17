import React, { Component } from "react";
import UserService from "../services/user.service";
import {setCookie} from '../Utils';

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

    UserService.login(user)
      .then((res) => {
        
        setCookie("token", res.data.data);
        
        UserService.getCurrentUser()
          .then((res2) => {
            localStorage.setItem("currentUser", JSON.stringify(res2.data.data));
            window.location.href='/';
          })
          .then((err2) => {
              console.log(err2);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
