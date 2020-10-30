import React, { useState } from "react";
import { useAuthDispatch, useAuthState } from "../context";
import UserService from "../services/user.service";

function UserLogin(props) {
  const [email, setEmail] = useState("demo");
  const [password, setPassword] = useState("demo");

  const { loading, errorMessage } = useAuthState();
  const dispatch = useAuthDispatch();

  return (
    <div className="col-md-3">
      <h3>Вход</h3>
      {errorMessage ? <p>Error !!!!</p> : null}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          required
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
        onClick={() => {
          dispatch({ type: "LOGIN_REQUEST" });
          UserService.login({ email: email, password: password })
            .then((res) => {
              localStorage.setItem("token", res.data.data);
              console.log(res.data.data);
              UserService.getCurrentUser()
                .then((res2) => {
                  localStorage.setItem('currentUser',JSON.stringify(res2.data.data));
                  console.log(res2.data.data);
                  dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: { token: res.data.data, user: res2.data.data },
                  });
                  props.history.push('/');
                })
                .catch((err2) => {
                  console.log(err2);
                  dispatch({ type: "LOGIN_ERROR" });
                });
            })
            .catch((err) => {
              console.log(err);
              dispatch({ type: "LOGIN_ERROR" });
            });
        }}
      >
        Войти
      </button>
    </div>
  );
}

function login() {}

export default UserLogin;
