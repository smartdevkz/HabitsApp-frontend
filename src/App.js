import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { eraseCookie } from "./Utils";
import http from "./http-common";

function App() {
  let user =
    localStorage.getItem("currentUser") != null
      ? JSON.parse(localStorage.getItem("currentUser"))
      : null;
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-nav mr-auto">
        <nav className="navbar navbar-light">
          <a className="navbar-brand" href="/">
            HabitsApp
          </a>
        </nav>
        <li className="nav-item">
          <Link to={"/habits"} className="nav-link">
            Привычки
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/journal"} className="nav-link">
            Журнал
          </Link>
        </li>
        <li className="nav-item">
          <Link onClick={() => btnClick()} className="nav-link">
            Кнопка
          </Link>
        </li>
      </div>
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        {!user && (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/user/login"} className="nav-link">
                Логин
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/user/register"} className="nav-link">
                Регистрация
              </Link>
            </li>
          </ul>
        )}
        {user && (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"#"} className="nav-link">
                {user.email}
              </Link>
            </li>
            <li className="nav-item">
              <Link onClick={() => logout()} to={"/"} className="nav-link">
                Выйти
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

function logout() {
  eraseCookie("token");
  localStorage.removeItem("currentUser");
  window.location.href = "/";
}

function btnClick() {
  console.log("btnClick()");
  http.post("http://habits.freecluster.eu/generateToken",).then(res=>{
    console.log(res);
  }).catch(err=>{
    console.log(err);
  });
}

export default App;
