import React, { Component } from "react";
import UserService from "../../services/user.service";

export default class UserRegistration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: "",
        password: "",
        password_retype: "",
      },
      is_submitted: false,
    };

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordRetype = this.onChangePasswordRetype.bind(this);
  }

  render() {
    return this.state.is_submitted ? (
      <span>Регистрация прошла успешно</span>
    ) : (
      <div className="col-md-3">
        <h3>Регистрация</h3>
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
        <div className="form-group">
          <label htmlFor="password_retype">Повтор пароля</label>
          <input
            type="password"
            className="form-control"
            id="password_retype"
            required
            name="password_retype"
            value={this.state.password_retype}
            onChange={this.onChangePasswordRetype}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => this.register()}
        >
          Зарегистрировать
        </button>
      </div>
    );
  }

  onChangeEmail(e) {
    const old = this.state;
    old.user.email = e.target.value;
    this.setState(old);
  }

  onChangePassword(e) {
    const old = this.state;
    old.user.password = e.target.value;
    this.setState(old);
  }

  onChangePasswordRetype(e) {
    const old = this.state;
    old.user.password_retype = e.target.value;
    this.setState(old);
  }

  register() {
    const user = this.state.user;

    if (user.password !== user.password_retype) {
      console.log("password and password retype are not the same");
      return;
    }

    UserService.register(user)
      .then((res) => {
        console.log(res.data);
        this.setState({ is_submitted: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
